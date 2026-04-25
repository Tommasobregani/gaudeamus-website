import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient as createServerSupabase } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

const schema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(160),
  addressLine1: z.string().min(1).max(200),
  city: z.string().min(1).max(120),
  postcode: z.string().min(1).max(20),
  country: z.string().min(1).max(80),
  donationAmount: z
    .union([z.number().nonnegative(), z.string().regex(/^\d+(\.\d{1,2})?$/)])
    .optional()
    .transform((v) => (v === undefined || v === "" ? null : Number(v))),
  donationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .transform((v) => v || null),
  consent: z.literal(true),
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
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.warn("[gift-aid] Supabase env not configured; accepting silently.");
    return NextResponse.json({ ok: true, stub: true });
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
  const { error } = await supabase.from("gift_aid_declarations").insert({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    address_line1: data.addressLine1,
    city: data.city,
    postcode: data.postcode,
    country: data.country,
    donation_amount: data.donationAmount,
    donation_date: data.donationDate,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    console.error("[gift-aid] insert error", error);
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
