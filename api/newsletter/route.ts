import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient as createServerSupabase } from "@supabase/supabase-js";

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
    return NextResponse.json({ ok: true, locale });
  } catch (err) {
    console.error("[newsletter] subscribe error", err);
    return NextResponse.json({ ok: false, error: "Subscription failed" }, { status: 500 });
  }
}
