import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient as createServerSupabase } from "@supabase/supabase-js";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["en", "it"]).optional(),
});

const fromAddress = "Gaudeamus <info@italiandramauk.org>";

function safeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  return error;
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const { email, locale = "en" } = parsed.data;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey) {
    // Graceful stub before env is configured — still return 200 so the UI feels alive in dev.
    console.warn("[newsletter] Supabase env not configured; accepting silently.");
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const supabase = createServerSupabase(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error } = await supabase.from("subscribers").upsert(
      {
        email,
        locale,
        status: "confirmed",
      },
      { onConflict: "email" },
    );
    if (error) throw error;

    if (!apiKey) {
      console.error("[newsletter] confirmation email failed", {
        email,
        error: "RESEND_API_KEY not set",
      });
    } else {
      try {
        const resend = new Resend(apiKey);
        const result = await resend.emails.send({
          from: fromAddress,
          to: email,
          subject:
            locale === "it"
              ? "Iscrizione alla newsletter Gaudeamus"
              : "Gaudeamus newsletter subscription",
          text:
            locale === "it"
              ? "Grazie per esserti iscritto alla newsletter Gaudeamus."
              : "Thank you for subscribing to the Gaudeamus newsletter.",
        });
        console.info("[newsletter] Resend result", { email, result });
        if (result.error) {
          console.error("[newsletter] confirmation email failed", {
            email,
            error: result.error,
          });
        }
      } catch (emailError) {
        console.error("[newsletter] confirmation email failed", {
          email,
          error: safeError(emailError),
        });
      }
    }

    return NextResponse.json({ ok: true, locale });
  } catch (err) {
    console.error("[newsletter] subscribe error", err);
    return NextResponse.json({ ok: false, error: "Subscription failed" }, { status: 500 });
  }
}
