import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["en", "it"]).optional(),
});

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
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // Graceful stub before env is configured — still return 200 so the UI feels alive in dev.
    console.warn("[newsletter] RESEND env not configured; accepting silently.");
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    return NextResponse.json({ ok: true, locale });
  } catch (err) {
    console.error("[newsletter] resend error", err);
    return NextResponse.json({ ok: false, error: "Subscription failed" }, { status: 500 });
  }
}
