import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { events, eventBySlug, producerLabel, type EventKind } from "@/content/events";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { CastList } from "@/components/brand/CastList";
import { PullQuote } from "@/components/brand/PullQuote";
import { EditorialGallery } from "@/components/events/EditorialGallery";
import { Playbill } from "@/components/brand/Playbill";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd } from "@/lib/schema-org";
import { siteConfig, type Locale } from "@/lib/utils";

function kindLabel(kind: EventKind, loc: Locale) {
  if (kind === "production") return loc === "it" ? "Produzione" : "Production";
  if (kind === "workshop") return loc === "it" ? "Laboratorio" : "Workshop";
  return loc === "it" ? "Comunità" : "Community";
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    events.map((e) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const event = eventBySlug(slug);
  if (!event) return {};
  const loc = locale as Locale;
  const path = `teatro/${slug}`;
  return {
    title: event.title[loc],
    description: event.summary[loc],
    openGraph: {
      title: event.title[loc],
      description: event.summary[loc],
      ...(event.cover
        ? { images: [{ url: event.cover, width: 1200, height: 1500, alt: event.title[loc] }] }
        : {}),
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
      languages: {
        en: `${siteConfig.url}/en/${path}`,
        it: `${siteConfig.url}/it/${path}`,
      },
    },
  };
}

const romanYear = (y: number) => {
  const map: Record<number, string> = { 2023: "2023", 2024: "2024", 2025: "2025", 2026: "2026" };
  return map[y] ?? String(y);
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const event = eventBySlug(slug);
  if (!event) notFound();

  const t = await getTranslations({ locale, namespace: "teatro" });
  const tProj = await getTranslations({ locale, namespace: "projects" });
  const loc = locale as Locale;

  const related = events.filter((e) => e.slug !== event.slug && e.kind === event.kind).slice(0, 3);
  const relatedFallback = events.filter((e) => e.slug !== event.slug).slice(0, 3);
  const relatedList = (related.length >= 2 ? related : relatedFallback).slice(0, 3);

  return (
    <>
      <JsonLd data={eventJsonLd(event, loc)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/${"teatro"}` },
          { name: event.title[loc], href: `/${locale}/${"teatro"}/${event.slug}` },
        ])}
      />

      <section className="container-site pt-10 md:pt-14">
        <Link
          href="/teatro"
          className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {t("eyebrow")}
        </Link>
      </section>

      {/* Hero — title block first, then a wide cinematic stage photo */}
      <section className="container-site pt-6 pb-10 md:pt-10 md:pb-12">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
            {kindLabel(event.kind, loc)} · {romanYear(event.year)}
            {event.producer ? ` · ${producerLabel(event.producer, loc)}` : ""}
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-6 bodoni-italic text-[clamp(3rem,9vw+1rem,9rem)] leading-[0.92] text-[color:var(--color-sepia)]">
            {event.title[loc]}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-[52ch] bodoni-italic text-[clamp(1.25rem,1.8vw+0.5rem,1.85rem)] leading-[1.25] text-[color:var(--color-accent)]">
            {event.tagline[loc]}
          </p>
        </FadeIn>
      </section>

      {event.cover ? (
        <section className="container-site pb-10 md:pb-14">
          <FadeIn>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-sepia)]/10 md:aspect-[21/9]">
              <Image
                src={event.cover}
                alt={`${event.title[loc]} — on stage`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--color-sepia)]/55 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[color:var(--color-travertino)]">
                <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em]">
                  SCENA · {event.title[loc].toUpperCase()}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.22em]">
                  {event.year}
                </span>
              </div>
            </div>
          </FadeIn>
        </section>
      ) : null}

      {/* Summary + venue strip */}
      <section className="container-site pb-12 md:pb-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {event.summary[loc]}
            </p>
          </div>
          {event.venues && event.venues.length > 0 ? (
            <ul className="md:col-span-5 space-y-2 border-l-2 border-[color:var(--color-accent)] pl-5">
              {event.venues.map((v) => (
                <li
                  key={v}
                  className="font-[family-name:var(--font-mono)] text-[0.85rem] uppercase tracking-[0.16em] text-[color:var(--color-sepia)]"
                >
                  {v}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* Story + cast list */}
      <section className="border-y border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site grid gap-14 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-7">
            <FadeIn>
              <RomanEyebrow n={1} label={locale === "it" ? "Racconto" : "The story"} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-8 space-y-6">
                {event.description[loc].map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "bodoni-italic text-[clamp(1.4rem,2vw+1rem,2rem)] leading-[1.22] text-[color:var(--color-sepia)]"
                        : "font-[family-name:var(--font-body)] text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <FadeIn delay={0.1}>
              <div className="sticky top-28 border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-travertino)] p-6">
                {event.poster ? (
                  <div className="-m-6 mb-6">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5">
                      <Image
                        src={event.poster}
                        alt={`${event.title[loc]} — locandina`}
                        fill
                        sizes="(min-width: 768px) 30vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : null}
                {event.credits && (
                  <CastList
                    title={locale === "it" ? "Scheda tecnica" : "Cast & crew"}
                    rows={event.credits[loc]}
                  />
                )}
                <div className="mt-6 flex flex-col gap-3 border-t border-[color:var(--color-sepia)]/25 pt-6 text-[0.85rem]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-[family-name:var(--font-cartel)] tracking-[0.24em] text-[color:var(--color-sepia)]">
                      {locale === "it" ? "Anno" : "Year"}
                    </span>
                    <span className="bodoni-italic text-[1.1rem] text-[color:var(--color-sepia)]">
                      {romanYear(event.year)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-[family-name:var(--font-cartel)] tracking-[0.24em] text-[color:var(--color-sepia)]">
                      {locale === "it" ? "Genere" : "Kind"}
                    </span>
                    <span className="bodoni-italic text-[1.05rem] text-[color:var(--color-sepia)]">
                      {kindLabel(event.kind, loc)}
                    </span>
                  </div>
                  {event.venues && (
                    <div className="flex items-baseline justify-between">
                      <span className="font-[family-name:var(--font-cartel)] tracking-[0.24em] text-[color:var(--color-sepia)]">
                        {locale === "it" ? "Sedi" : "Venues"}
                      </span>
                      <span className="bodoni-italic text-[1.05rem] text-[color:var(--color-sepia)]">
                        {event.venues.join(" · ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </section>

      {/* Gallery — only when we have at least 2 images */}
      {event.gallery.length >= 2 ? (
        <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-32">
          <FadeIn>
            <div className="flex items-end justify-between">
              <RomanEyebrow n={2} label={locale === "it" ? "Galleria" : "Gallery"} />
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                {event.gallery.length} {tProj("photos")}
              </p>
            </div>
          </FadeIn>
          <div className="mt-10">
            <EditorialGallery images={event.gallery} alt={event.title[loc]} />
          </div>
        </section>
      ) : null}

      {/* Related */}
      {relatedList.length > 0 && (
        <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
          <div className="container-site py-20 md:py-28">
            <FadeIn>
              <div className="flex items-end justify-between">
                <RomanEyebrow n={3} label={locale === "it" ? "Anche da vedere" : "Also worth seeing"} />
                <Link
                  href="/teatro"
                  className="hover-underline inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
                >
                  {locale === "it" ? "Tutte le produzioni" : "All productions"}
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {relatedList.map((e, i) => (
                <Playbill key={e.slug} event={e} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing fregio */}
      <div className="container-site py-16">
        <div className="flex justify-center">
          <Fregio width={240} tone="terracotta" />
        </div>
      </div>
    </>
  );
}
