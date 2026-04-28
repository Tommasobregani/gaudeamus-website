import { articles } from "@/content/news";
import { siteConfig } from "@/lib/utils";

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = siteConfig.url;
  const items = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((a) => {
      const url = `${base}/en/news/${a.slug}`;
      return `
    <item>
      <title>${escape(a.title.en)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <description>${escape(a.excerpt.en)}</description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gaudeamus — Journal</title>
    <link>${base}/en/news</link>
    <description>Notes from the wings.</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
