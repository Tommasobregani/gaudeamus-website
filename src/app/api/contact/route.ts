import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createClient as createServerSupabase } from "@supabase/supabase-js";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(8000),
  recipient: z.enum(["artistic", "general"]).default("general"),
  // Honeypot — must be empty.
  botField: z.string().max(0).optional().default(""),
});

const fromAddress = "Gaudeamus <info@italiandramauk.org>";
const recipientEmails = {
  general: "info@italiandramauk.org",
  artistic: "gaudeamus@italiandramauk.org",
} as const;

function safeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return error;
}

function safeErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Email delivery failed";
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch (error) {
    console.warn("[contact] validation failed: invalid JSON", safeError(error));
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    console.warn("[contact] validation failed", parsed.error.flatten());
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = recipientEmails[data.recipient];
  const tag = data.recipient === "artistic" ? "[ARTIST]" : "[GENERAL]";

  if (!supabaseUrl || !serviceKey) {
    console.error("[contact] Supabase insert failed: env vars not configured");
    return NextResponse.json(
      { ok: false, error: "Message could not be saved" },
      { status: 500 },
    );
  }

  const supabase = createServerSupabase(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: savedMessage, error: insertError } = await supabase
    .from("contact_messages")
    .insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      recipient: data.recipient,
      recipient_email: recipientEmail,
      email_status: "pending",
      email_error: null,
    })
    .select("id")
    .single();

  if (insertError || !savedMessage) {
    console.error("[contact] Supabase insert failed", insertError);
    return NextResponse.json(
      { ok: false, error: "Message could not be saved" },
      { status: 500 },
    );
  }

  console.info("[contact] message saved successfully", {
    id: savedMessage.id,
    recipient: data.recipient,
  });

  const text = [
    `From: ${data.name} <${data.email}>`,
    `Recipient: ${tag}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  if (!apiKey) {
    const emailError = "RESEND_API_KEY not set";
    console.error("[contact] email failed", {
      messageId: savedMessage.id,
      error: emailError,
    });
    const { error: updateError } = await supabase
      .from("contact_messages")
      .update({
        email_status: "failed",
        recipient_email: recipientEmail,
        email_error: emailError,
      })
      .eq("id", savedMessage.id);
    if (updateError) {
      console.error("[contact] email status update failed", {
        messageId: savedMessage.id,
        error: updateError,
      });
    }
  } else {
    try {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        replyTo: data.email,
        subject: `${tag} ${data.subject}`.slice(0, 200),
        text,
      });
      console.info("[contact] Resend result", {
        messageId: savedMessage.id,
        result,
      });

      if (result.error) {
        console.error("[contact] email failed", {
          messageId: savedMessage.id,
          error: result.error,
        });
        const { error: updateError } = await supabase
          .from("contact_messages")
          .update({
            email_status: "failed",
            recipient_email: recipientEmail,
            email_error: safeErrorMessage(result.error),
          })
          .eq("id", savedMessage.id);
        if (updateError) {
          console.error("[contact] email status update failed", {
            messageId: savedMessage.id,
            error: updateError,
          });
        }
      } else {
        const { error: updateError } = await supabase
          .from("contact_messages")
          .update({
            email_status: "sent",
            recipient_email: recipientEmail,
            email_error: null,
            resend_id: result.data?.id ?? null,
          })
          .eq("id", savedMessage.id);
        if (updateError) {
          console.error("[contact] email status update failed", {
            messageId: savedMessage.id,
            error: updateError,
          });
        }
      }
    } catch (error) {
      console.error("[contact] email failed", {
        messageId: savedMessage.id,
        error: safeError(error),
      });
      const { error: updateError } = await supabase
        .from("contact_messages")
        .update({
          email_status: "failed",
          recipient_email: recipientEmail,
          email_error: safeErrorMessage(error),
        })
        .eq("id", savedMessage.id);
      if (updateError) {
        console.error("[contact] email status update failed", {
          messageId: savedMessage.id,
          error: updateError,
        });
      }
    }
  }

  return NextResponse.json({ ok: true, saved: true });
}
