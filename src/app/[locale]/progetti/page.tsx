import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { PlaybillCatalog } from "@/components/events/PlaybillCatalog";
import { events } from "@/content/events";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd } from "@/lib/schema-org";
import { siteConfig, type Locale } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  const path = "progetti";
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
      languages: {
        en: `${siteConfig.url}/en/progetti`,
        it: `${siteConfig.url}/it/progetti`,
      },
    },
  };
}

export default async function ProgettiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const loc = locale as Locale;

  // Group events by stagione (year)
  const years = Array.from(new Set(events.map((e) => e.year))).sort((a, b) => b - a);
  const romanYear = (y: number) => {
    const map: Record<number, string> = {
      2023: "MMXXIII",
      2024: "MMXXIV",
      2025: "MMXXV",
      2026: "MMXXVI",
    };
    return map[y] ?? String(y);
  };

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/${"progetti"}` },
        ])}
      />
      {events.map((e) => (
        <JsonLd key={e.slug} data={eventJsonLd(e, loc)} />
      ))}

      {/* Cartello — like the wall board outside an Italian theatre */}
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="border-y-2 border-[color:var(--color-sepia)] py-5">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              IL REPERTORIO
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
              {events.length} {locale === "it" ? "titoli" : "titles"} · MMXXIII—MMXXVI
            </span>
          </div>
        </div>

        <FadeIn>
          <h1 className="mt-10 max-w-[14ch] display-mixed text-[clamp(3.5rem,9vw+1rem,10rem)] leading-[0.92]">
            {locale === "it" ? (
              <>Il nostro <em>repertorio</em>.</>
            ) : (
              <>Our <em>repertory</em>.</>
            )}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.15rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <Fregio width={280} />
          </div>
        </FadeIn>
      </section>

      {/* Filter + all playbills */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/20 pt-12 pb-24 md:pt-16 md:pb-32">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <RomanEyebrow n={1} label={locale === "it" ? "Repertorio" : "Repertory"} />
            <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              {locale === "it" ? "Filtra per genere" : "Filter by kind"}
            </p>
          </div>
        </FadeIn>

        <div className="mt-8">
          <PlaybillCatalog events={events} />
        </div>
      </section>

      {/* Stagioni — year-by-year breakdown with titles listed per year */}
      <section className="relative border-t border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <RomanEyebrow n={2} label={locale === "it" ? "Per stagione" : "By season"} />
          </FadeIn>
          <div className="mt-12 divide-y-2 divide-[color:var(--color-sepia)]/20 border-y-2 border-[color:var(--color-sepia)]">
            {years.map((y) => {
              const eventsOfYear = events.filter((e) => e.year === y);
              return (
                <FadeIn key={y}>
                  <div className="grid gap-6 py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-10">
                    <div className="md:col-span-4">
                      <span className="bodoni-italic block text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] text-[color:var(--color-sepia)]">
                        {romanYear(y)}
                      </span>
                      <span className="mt-2 block font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-terracotta)]">
                        {y} · {eventsOfYear.length} {locale === "it" ? (eventsOfYear.length === 1 ? "titolo" : "titoli") : eventsOfYear.length === 1 ? "title" : "titles"}
                      </span>
                    </div>
                    <ul className="md:col-span-8 flex flex-col gap-3">
                      {eventsOfYear.map((e, i) => (
                        <li key={e.slug} className="flex items-baseline gap-4">
                          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]">
                            {["I", "II", "III", "IV", "V"][i] ?? `${i + 1}`}
                          </span>
                          <span className="bodoni-italic text-[clamp(1.25rem,1.5vw+0.5rem,1.75rem)] leading-[1.1] text-[color:var(--color-sepia)]">
                            {e.title[loc]}
                          </span>
                          <span className="font-[family-name:var(--font-cartel)] text-[0.68rem] tracking-[0.24em] text-[color:var(--color-sepia-soft)]">
                            · {e.kind.toUpperCase()}
                          </span>
                          {e.venues && (
                            <span className="hidden font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-sepia-soft)] md:inline">
                              · {e.venues.join(" / ")}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
