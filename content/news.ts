/**
 * Journal / news articles — bilingual.
 * Real posts will come from Supabase 'posts' table once the client greenlights publishing.
 * Until then, this list stays empty so /news shows an honest empty state.
 */

export type Article = {
  slug: string;
  publishedAt: string;
  readingMinutes: number;
  category: { en: string; it: string };
  title: { en: string; it: string };
  excerpt: { en: string; it: string };
  body: { en: string[]; it: string[] };
  cover: string;
  author: string;
};

export const articles: Article[] = [];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
