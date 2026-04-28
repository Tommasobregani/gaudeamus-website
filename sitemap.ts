import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { events } from "@/content/events";
import { articles } from "@/content/news";

const staticPages = [
  "",
  "chi-siamo",
  "teatro",
  "teatro/laboratori",
  "teatro/recensioni",
  "eventi",
  "news",
  "progetti",
  "sostienici",
  "sostienici/gift-aid",
  "contatti",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPages) {
    const urlEn = `${base}/en${path ? `/${path}` : ""}`;
    const urlIt = `${base}/it${path ? `/${path}` : ""}`;
    const priority = path === "" ? 1 : 0.8;
    entries.push({
      url: urlEn,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
    entries.push({
      url: urlIt,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
  }

  for (const e of events) {
    const urlEn = `${base}/en/teatro/${e.slug}`;
    const urlIt = `${base}/it/teatro/${e.slug}`;
    entries.push({
      url: urlEn,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
    entries.push({
      url: urlIt,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
  }

  for (const a of articles) {
    const urlEn = `${base}/en/news/${a.slug}`;
    const urlIt = `${base}/it/news/${a.slug}`;
    entries.push({
      url: urlEn,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
    entries.push({
      url: urlIt,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: { en: urlEn, it: urlIt } },
    });
  }

  return entries;
}
