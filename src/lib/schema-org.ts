import { siteConfig } from "./utils";
import type { EventEntry } from "@/content/events";
import type { Article } from "@/content/news";

export function organizationJsonLd(locale: "en" | "it") {
  const description =
    locale === "it" ? siteConfig.description.it : siteConfig.description.en;

  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "PerformingGroup"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/opengraph-image`,
    image: `${siteConfig.url}/opengraph-image`,
    description,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressRegion: "Scotland",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.registeredOffice.city,
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    email: siteConfig.email.general,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean),
    inLanguage: ["en", "it"],
  };
}

export function websiteJsonLd(locale: "en" | "it") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function eventJsonLd(e: EventEntry, locale: "en" | "it") {
  return {
    "@context": "https://schema.org",
    "@type": e.kind === "production" ? "TheaterEvent" : "Event",
    name: e.title[locale],
    description: e.summary[locale],
    startDate: e.date ?? `${e.year}-01-01`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: (e.venues ?? []).map((v) => ({
      "@type": "Place",
      name: v,
      address: {
        "@type": "PostalAddress",
        addressLocality: v,
        addressRegion: "Scotland",
        addressCountry: "GB",
      },
    })),
    ...(e.cover ? { image: `${siteConfig.url}${e.cover}` } : {}),
    organizer: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale,
    url: `${siteConfig.url}/${locale}/teatro/${e.slug}`,
  };
}

export function articleJsonLd(a: Article, locale: "en" | "it") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title[locale],
    description: a.excerpt[locale],
    image: `${siteConfig.url}${a.cover}`,
    datePublished: a.publishedAt,
    dateModified: a.publishedAt,
    author: { "@type": "Organization", name: a.author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale,
    url: `${siteConfig.url}/${locale}/news/${a.slug}`,
    mainEntityOfPage: `${siteConfig.url}/${locale}/news/${a.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteConfig.url}${it.href}`,
    })),
  };
}
