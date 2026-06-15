import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { createClient as createServerSupabase } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

const schema = z.object({
  fullName: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(160),
  homeAddress: z.string().trim().min(1).max(1000),
  postcode: z.string().trim().min(1).max(20),
  donationAmount: z
    .union([z.number().nonnegative(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional()
    .transform((v) => (v === undefined || v === "" ? null : Number(v))),
  donationReference: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => v || null),
  ukTaxpayerDeclaration: z.literal(true),
  giftAidDeclaration: z.literal(true),
  taxResponsibilityDeclaration: z.literal(true),
});

const fromAddress = "Gaudeamus <finance@italiandrama.uk>";
const financeEmail = "finance@italiandrama.uk";
const infoEmail = "info@italiandrama.uk";

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
  return "Email notification failed";
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch (error) {
    console.warn("[gift-aid] validation failed: invalid JSON", safeError(error));
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    console.warn("[gift-aid] validation failed", parsed.error.flatten());
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = process.env.RESEND_API_KEY;
  if (!url || !serviceKey) {
    console.error("[gift-aid] Supabase insert failed: env vars not configured");
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 });
  }

  const supabase = createServerSupabase(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 500) || null;

  const data = parsed.data;
  const submittedAt = new Date().toISOString();
  const nameParts = data.fullName.split(/\s+/);
  const firstName = nameParts[0] || data.fullName;
  const lastName = nameParts.slice(1).join(" ") || "N/A";
  const { data: declaration, error } = await supabase
    .from("gift_aid_declarations")
    .insert({
      full_name: data.fullName,
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      home_address: data.homeAddress,
      address_line1: data.homeAddress,
      city: "Not provided",
      postcode: data.postcode,
      country: "United Kingdom",
      donation_amount: data.donationAmount,
      donation_reference: data.donationReference,
      submitted_at: submittedAt,
      consent_at: submittedAt,
      is_uk_taxpayer: data.ukTaxpayerDeclaration,
      uk_taxpayer_confirmed: data.ukTaxpayerDeclaration,
      gift_aid_confirmed: data.giftAidDeclaration,
      tax_responsibility_confirmed: data.taxResponsibilityDeclaration,
      ip_hash: ipHash,
      user_agent: userAgent,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[gift-aid] Supabase insert failed", error);
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 });
  }

  console.info("[gift-aid] declaration saved successfully", {
    declarationId: declaration.id,
    email: data.email,
  });

  if (!apiKey) {
    const emailError = "RESEND_API_KEY is not configured";
    console.error("[gift-aid] email notification failed", {
      declarationId: declaration.id,
      error: emailError,
    });
    await supabase
      .from("gift_aid_declarations")
      .update({ notification_error: emailError })
      .eq("id", declaration.id);
    return NextResponse.json({
      ok: true,
      emailNotification: "failed",
      message: "Declaration saved, but email notification failed",
    });
  }

  const amountLine =
    data.donationAmount === null
      ? "Donation amount: Not provided"
      : `Donation amount: £${data.donationAmount}`;
  const referenceLine = data.donationReference
    ? `Donation reference/message: ${data.donationReference}`
    : "Donation reference/message: Not provided";
  const text = [
    "New Gift Aid Declaration — Gaudeamus",
    "",
    `Full name: ${data.fullName}`,
    `Email address: ${data.email}`,
    "Address:",
    data.homeAddress,
    `Postcode: ${data.postcode}`,
    amountLine,
    referenceLine,
    `Date submitted: ${submittedAt}`,
    "",
    `UK taxpayer declaration ticked: ${data.ukTaxpayerDeclaration ? "Yes" : "No"}`,
    `Gift Aid declaration ticked: ${data.giftAidDeclaration ? "Yes" : "No"}`,
    `Tax responsibility statement accepted: ${
      data.taxResponsibilityDeclaration ? "Yes" : "No"
    }`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromAddress,
      to: [financeEmail, infoEmail],
      subject: "New Gift Aid Declaration — Gaudeamus",
      text,
    });

    console.info("[gift-aid] Resend result", {
      declarationId: declaration.id,
      result,
    });

    if (result.error) {
      const emailError = safeErrorMessage(result.error);
      console.error("[gift-aid] email notification failed", {
        declarationId: declaration.id,
        error: result.error,
      });
      await supabase
        .from("gift_aid_declarations")
        .update({ notification_error: emailError })
        .eq("id", declaration.id);
      return NextResponse.json({
        ok: true,
        emailNotification: "failed",
        message: "Declaration saved, but email notification failed",
      });
    }

    await supabase
      .from("gift_aid_declarations")
      .update({
        notification_sent_at: new Date().toISOString(),
        notification_error: null,
      })
      .eq("id", declaration.id);
  } catch (error) {
    const emailError = safeErrorMessage(error);
    console.error("[gift-aid] email notification failed", {
      declarationId: declaration.id,
      error: safeError(error),
    });
    await supabase
      .from("gift_aid_declarations")
      .update({ notification_error: emailError })
      .eq("id", declaration.id);
    return NextResponse.json({
      ok: true,
      emailNotification: "failed",
      message: "Declaration saved, but email notification failed",
    });
  }

  return NextResponse.json({ ok: true, emailNotification: "sent" });
}
