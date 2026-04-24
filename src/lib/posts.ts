import { createClient } from "./supabase/server";
import type { Article } from "@/content/news";

/**
 * Reads published Supabase posts and returns them in the same shape as seed Articles.
 * Safely returns [] if Supabase isn't configured or the query fails.
 */
export async function listPublishedPosts(): Promise<Article[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "slug, published_at, title_en, title_it, excerpt_en, excerpt_it, body_en, body_it, cover_url, category_en, category_it",
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];

    return data.map((p) => mapPost(p));
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Article | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        "slug, published_at, title_en, title_it, excerpt_en, excerpt_it, body_en, body_it, cover_url, category_en, category_it",
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error || !data) return null;
    return mapPost(data);
  } catch {
    return null;
  }
}

type DbPost = {
  slug: string;
  published_at: string | null;
  title_en: string;
  title_it: string;
  excerpt_en: string | null;
  excerpt_it: string | null;
  body_en: string | null;
  body_it: string | null;
  cover_url: string | null;
  category_en: string | null;
  category_it: string | null;
};

function mapPost(p: DbPost): Article {
  const bodyEn = (p.body_en ?? "").split(/\n\n+/).filter(Boolean);
  const bodyIt = (p.body_it ?? "").split(/\n\n+/).filter(Boolean);
  const wordCount = (p.body_en ?? "").split(/\s+/).length;
  const reading = Math.max(1, Math.round(wordCount / 200));

  return {
    slug: p.slug,
    publishedAt: (p.published_at ?? new Date().toISOString()).slice(0, 10),
    readingMinutes: reading,
    category: { en: p.category_en ?? "Journal", it: p.category_it ?? "Diario" },
    title: { en: p.title_en, it: p.title_it },
    excerpt: { en: p.excerpt_en ?? "", it: p.excerpt_it ?? "" },
    body: { en: bodyEn, it: bodyIt },
    cover: p.cover_url ?? "/events/no-shakespeare/no-shakespeare-01.jpg",
    author: "Gaudeamus editorial",
  };
}
