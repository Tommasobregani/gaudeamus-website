import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(8000),
  recipient: z.enum(["artistic", "general"]).default("general"),
  // Honeypot — must be empty.
  botField: z.string().max(0).optional().default(""),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.RESEND_FROM ?? "Gaudeamus <onboarding@resend.dev>";

  // Route to the right inbox based on the user's recipient choice.
  const to =
    data.recipient === "artistic"
      ? siteConfig.email.artistic
      : siteConfig.email.general;
  const tag = data.recipient === "artistic" ? "[ARTIST]" : "[GENERAL]";

  // No API key configured — accept silently in dev / preview to avoid leaking.
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set; logging payload only.");
    console.warn("[contact] would send to", to, "subject:", `${tag} ${data.subject}`);
    return NextResponse.json({ ok: true, stub: true });
  }

  const resend = new Resend(apiKey);

  const text = [
    `From: ${data.name} <${data.email}>`,
    `Recipient: ${tag}`,
    `Subject: ${data.subject}`,
    "",
    data.message,
  ].join("\n");

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to,
      replyTo: data.email,
      subject: `${tag} ${data.subject}`.slice(0, 200),
      text,
    });
    if (result.error) {
      console.error("[contact] resend error", result.error);
      return NextResponse.json(
        { ok: false, error: "Email failed" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[contact] send threw", err);
    return NextResponse.json(
      { ok: false, error: "Email failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
