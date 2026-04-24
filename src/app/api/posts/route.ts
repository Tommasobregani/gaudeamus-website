import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const postSchema = z.object({
  slug: z.string().min(2).max(140).regex(/^[a-z0-9-]+$/, "slug must be lowercase, hyphenated"),
  status: z.enum(["draft", "published"]),
  titleEn: z.string().min(1),
  titleIt: z.string().min(1),
  excerptEn: z.string().optional().nullable(),
  excerptIt: z.string().optional().nullable(),
  bodyEn: z.string().optional().nullable(),
  bodyIt: z.string().optional().nullable(),
  categoryEn: z.string().optional().nullable(),
  categoryIt: z.string().optional().nullable(),
  coverUrl: z.string().url().optional().nullable().or(z.literal("")),
});

async function requireEditor() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: "Supabase not configured", status: 500 as const };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", status: 401 as const };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["editor", "admin"].includes(profile.role)) {
    return { error: "Forbidden", status: 403 as const };
  }

  return { supabase, userId: user.id };
}

export async function POST(req: Request) {
  const auth = await requireEditor();
  if ("error" in auth) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = postSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const p = parsed.data;
  const row = {
    slug: p.slug,
    status: p.status,
    title_en: p.titleEn,
    title_it: p.titleIt,
    excerpt_en: p.excerptEn || null,
    excerpt_it: p.excerptIt || null,
    body_en: p.bodyEn || null,
    body_it: p.bodyIt || null,
    category_en: p.categoryEn || null,
    category_it: p.categoryIt || null,
    cover_url: p.coverUrl || null,
    published_at: p.status === "published" ? new Date().toISOString() : null,
    author_id: auth.userId,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await auth.supabase
    .from("posts")
    .upsert(row, { onConflict: "slug" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, post: data });
}
