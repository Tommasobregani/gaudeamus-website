import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { events, eventBySlug } from "@/content/events";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { CastList } from "@/components/brand/CastList";
import { PullQuote } from "@/components/brand/PullQuote";
import { CurtainReveal } from "@/components/motion/CurtainReveal";
import { EditorialGallery } from "@/components/events/EditorialGallery";
import { Playbill } from "@/components/brand/Playbill";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd } from "@/lib/schema-org";
import { siteConfig, type Locale } from "@/lib/utils";

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
  const path = `progetti/${slug}`;
  return {
    title: event.title[loc],
    description: event.summary[loc],
    openGraph: {
      title: event.title[loc],
      description: event.summary[loc],
      images: [{ url: event.cover, width: 1200, height: 1500, alt: event.title[loc] }],
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

  const t = await getTranslations({ locale, namespace: "projects" });
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
          { name: t("eyebrow"), href: `/${locale}/${"progetti"}` },
          { name: event.title[loc], href: `/${locale}/${"progetti"}/${event.slug}` },
        ])}
      />

      <section className="container-site pt-10 md:pt-14">
        <Link
          href="/progetti"
          className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {t("eyebrow")}
        </Link>
      </section>

      {/* Grand teatro playbill header */}
      <section className="container-site pt-10 pb-8 md:pt-14 md:pb-12">
        <div className="border-y-2 border-[color:var(--color-sepia)]">
          <div className="border-b border-[color:var(--color-sepia)]/25 px-1 py-3 text-center">
            <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              COMPAGNIA GAUDEAMUS · SCIO · {event.venues ? event.venues.join(" · ").toUpperCase() : "SCOTLAND"}
            </p>
          </div>
          <div className="px-1 pt-10 pb-8 text-center">
            <p className="font-[family-name:var(--font-body)] italic text-[1rem] text-[color:var(--color-sepia-soft)]">
              {locale === "it" ? "presenta" : "presents"}
            </p>
            <h1 className="mt-6 bodoni-italic text-[clamp(3.5rem,10vw+1rem,10rem)] leading-[0.92] text-[color:var(--color-sepia)]">
              {event.title[loc]}
            </h1>
            <p className="mx-auto mt-8 max-w-[54ch] bodoni-italic text-[clamp(1.35rem,2vw+1rem,2rem)] leading-[1.25] text-[color:var(--color-terracotta)]">
              {event.tagline[loc]}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-[color:var(--color-sepia)]/25 px-1 py-3">
            <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              {event.kind.toUpperCase()}
            </span>
            <span className="bodoni-italic text-[1rem] text-[color:var(--color-terracotta)]">
              {romanYear(event.year)}
            </span>
            <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              {event.venues ? event.venues.join(" · ").toUpperCase() : "SCOTLAND"}
            </span>
          </div>
        </div>
      </section>

      {/* Curtain reveal cover */}
      <section className="container-site pt-6 md:pt-10">
        <FadeIn>
          <CurtainReveal
            src={event.cover}
            alt={event.title[loc]}
            fill
            wrapperClassName="relative aspect-[21/10] w-full"
            className="object-cover"
            sizes="100vw"
            priority
          />
        </FadeIn>
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
                      {event.kind === "production"
                        ? locale === "it"
                          ? "Teatro"
                          : "Theatre"
                        : event.kind === "workshop"
                        ? locale === "it"
                          ? "Laboratorio"
                          : "Workshop"
                        : locale === "it"
                        ? "Incontro"
                        : "Gathering"}
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

      {/* Pull quote */}
      <section className="container-site py-20 md:py-24">
        <FadeIn>
          <PullQuote
            quote={event.tagline[loc]}
            attribution={`${event.title[loc]} — ${romanYear(event.year)}`}
          />
        </FadeIn>
      </section>

      {/* Gallery */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-32">
        <FadeIn>
          <div className="flex items-end justify-between">
            <RomanEyebrow n={2} label={locale === "it" ? "Galleria" : "Gallery"} />
            <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              {event.gallery.length} {t("photos")}
            </p>
          </div>
        </FadeIn>
        <div className="mt-10">
          <EditorialGallery images={event.gallery} alt={event.title[loc]} />
        </div>
      </section>

      {/* Related */}
      {relatedList.length > 0 && (
        <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
          <div className="container-site py-20 md:py-28">
            <FadeIn>
              <div className="flex items-end justify-between">
                <RomanEyebrow n={3} label={locale === "it" ? "Anche da vedere" : "Also worth seeing"} />
                <Link
                  href="/progetti"
                  className="hover-underline inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
                >
                  {locale === "it" ? "Tutti i progetti" : "All projects"}
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
