import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/layout/PageHero";
import {
  upcomingProductions,
  pastProductions,
  producerLabel,
  type EventKind,
} from "@/content/events";
import { press } from "@/content/press";
import { siteConfig, type Locale } from "@/lib/utils";

function kindLabel(kind: EventKind, loc: Locale) {
  if (kind === "production") return loc === "it" ? "Produzione" : "Production";
  if (kind === "workshop") return loc === "it" ? "Laboratorio" : "Workshop";
  return loc === "it" ? "Comunità" : "Community";
}
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, eventJsonLd } from "@/lib/schema-org";

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
  const t = await getTranslations({ locale, namespace: "teatro" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/teatro`,
      languages: {
        en: `${siteConfig.url}/en/teatro`,
        it: `${siteConfig.url}/it/teatro`,
      },
    },
  };
}

export default async function TeatroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "teatro" });
  const loc = locale as Locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/teatro` },
        ])}
      />
      {[...upcomingProductions, ...pastProductions].map((e) => (
        <JsonLd key={e.slug} data={eventJsonLd(e, loc)} />
      ))}

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("heroKicker")}
        meta={t("heroMeta")}
        image="/events/poor-piero/poor-piero-07.jpeg"
        imageAlt="Compagnia Gaudeamus on stage"
        imagePosition="center 22%"
      />

      <section className="container-site py-12 md:py-16">
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8 md:col-start-3 space-y-5">
              <p className="bodoni-italic text-[clamp(1.4rem,1.8vw+0.5rem,1.85rem)] leading-[1.3] text-[color:var(--color-sepia)]">
                {t("lead")}
              </p>
              <p className="text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("leadInclusion")}
              </p>
              <p className="text-[1rem] italic leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("leadExtra")}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Current (featured) + Upcoming productions — deep-blue theatre-night panel */}
      {(() => {
        const current = upcomingProductions[0];
        const rest = upcomingProductions.slice(1);
        return (
          <section className="bg-[color:var(--color-notte)] py-16 text-[color:var(--color-travertino)] md:py-24">
            <div className="container-site">
              {current ? (
                <>
                  <FadeIn>
                    <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-oro-soft)]">
                      {t("currentEyebrow")}
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <Link
                      href={`/teatro/${current.slug}`}
                      className="group mt-8 grid gap-10 md:grid-cols-12 md:gap-14"
                    >
                      <div className="md:col-span-5">
                        {current.poster || current.cover ? (
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5">
                            <Image
                              src={current.poster ?? current.cover}
                              alt={current.title[loc]}
                              fill
                              sizes="(min-width: 768px) 40vw, 90vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                          </div>
                        ) : (
                          <div className="relative flex aspect-[3/4] w-full flex-col justify-between border border-[color:var(--color-travertino)]/30 bg-[color:var(--color-notte-deep)] p-8 transition-colors group-hover:border-[color:var(--color-travertino)]/60 md:p-10">
                            <p className="text-center font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.3em] text-[color:var(--color-oro-soft)]">
                              COMPAGNIA GAUDEAMUS · SCIO
                            </p>
                            <div className="text-center">
                              <p className="bodoni-italic text-[0.95rem] text-[color:var(--color-travertino)]/80">
                                {loc === "it" ? "presenta" : "presents"}
                              </p>
                              <h3 className="mt-4 bodoni-italic text-[clamp(1.6rem,2.4vw+0.5rem,2.6rem)] leading-[1.05]">
                                {current.title[loc]}
                              </h3>
                              <p className="mt-4 bodoni-italic text-[0.95rem] text-[color:var(--color-oro-soft)]">
                                {current.tagline[loc]}
                              </p>
                            </div>
                            <p className="text-center font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--color-travertino)]/80">
                              {current.year}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-end md:col-span-7">
                        <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-oro-soft)]">
                          {current.year} · {kindLabel(current.kind, loc)}
                        </p>
                        <h2 className="mt-4 bodoni-italic text-[clamp(2.2rem,4.4vw+0.5rem,4.4rem)] leading-[0.98]">
                          {current.title[loc]}
                        </h2>
                        <p className="mt-5 max-w-[42ch] bodoni-italic text-[1.2rem] leading-[1.45] opacity-95">
                          {current.tagline[loc]}
                        </p>
                        <p className="mt-6 max-w-[58ch] text-[1rem] leading-[1.65] opacity-85">
                          {current.summary[loc]}
                        </p>
                        {current.venues && (
                          <ul className="mt-6 space-y-1 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.18em] opacity-85">
                            {current.venues.map((v) => (
                              <li key={v}>· {v}</li>
                            ))}
                          </ul>
                        )}
                        <span className="mt-10 inline-flex items-center gap-3 self-start border-b border-[color:var(--color-travertino)]/60 pb-1 font-[family-name:var(--font-cartel)] text-[0.82rem] uppercase tracking-[0.26em] transition-colors group-hover:border-[color:var(--color-travertino)]">
                          {t("currentCta")}
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                </>
              ) : (
                <FadeIn>
                  <p className="max-w-[60ch] text-[1rem] leading-[1.65] opacity-85">
                    {t("onStageEmpty")}
                  </p>
                </FadeIn>
              )}

              {rest.length > 0 ? (
                <div className="mt-20 border-t border-[color:var(--color-travertino)]/20 pt-12 md:mt-24 md:pt-16">
                  <FadeIn>
                    <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-oro-soft)]">
                      {t("upcomingTitle")}
                    </p>
                  </FadeIn>
                  <Stagger
                    className={
                      rest.length === 1
                        ? "mt-10 space-y-0"
                        : "mt-10 grid gap-10 md:grid-cols-2 md:gap-14"
                    }
                  >
                    {rest.map((e) => {
                      const hasPoster = Boolean(e.poster || e.cover);
                      const single = rest.length === 1;
                      return (
                        <StaggerItem key={e.slug}>
                          <Link
                            href={`/teatro/${e.slug}`}
                            className={
                              single
                                ? "group grid items-start gap-10 md:grid-cols-12 md:gap-14"
                                : "group block"
                            }
                          >
                            {hasPoster ? (
                              <div className={
                                single
                                  ? "relative md:col-span-5 aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5"
                                  : "relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5"
                              }>
                                <Image
                                  src={e.poster ?? e.cover}
                                  alt={e.title[loc]}
                                  fill
                                  sizes="(min-width: 768px) 45vw, 90vw"
                                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                              </div>
                            ) : (
                              <div className={
                                single
                                  ? "relative md:col-span-5 flex aspect-[3/4] w-full flex-col justify-between border border-[color:var(--color-travertino)]/30 bg-[color:var(--color-notte-deep)] p-8 transition-colors group-hover:border-[color:var(--color-travertino)]/60 md:p-10"
                                  : "relative flex aspect-[3/4] w-full flex-col justify-between border border-[color:var(--color-travertino)]/30 bg-[color:var(--color-notte-deep)] p-8 transition-colors group-hover:border-[color:var(--color-travertino)]/60 md:p-10"
                              }>
                                <p className="text-center font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.3em] text-[color:var(--color-oro-soft)]">
                                  COMPAGNIA GAUDEAMUS · SCIO
                                </p>
                                <div className="text-center">
                                  <p className="bodoni-italic text-[0.95rem] text-[color:var(--color-travertino)]/80">
                                    {loc === "it" ? "presenta" : "presents"}
                                  </p>
                                  <h4 className="mt-4 bodoni-italic text-[clamp(1.5rem,2.4vw+0.5rem,2.5rem)] leading-[1.05]">
                                    {e.title[loc]}
                                  </h4>
                                  <p className="mt-4 bodoni-italic text-[0.95rem] text-[color:var(--color-oro-soft)]">
                                    {e.tagline[loc]}
                                  </p>
                                </div>
                                <p className="text-center font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--color-travertino)]/80">
                                  {e.year}
                                </p>
                              </div>
                            )}
                            <div className={
                              single
                                ? "md:col-span-7 flex flex-col gap-4"
                                : "mt-6 flex items-start justify-between gap-4"
                            }>
                              <div className="flex-1">
                                <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.28em] opacity-80">
                                  {e.year} · {kindLabel(e.kind, loc)}
                                </p>
                                <h3 className="mt-3 bodoni-italic text-[2rem] leading-[1.05]">
                                  {e.title[loc]}
                                </h3>
                                <p className="mt-2 text-[1rem] italic opacity-90">
                                  {e.tagline[loc]}
                                </p>
                                {e.venues && (
                                  <ul className="mt-3 space-y-1 text-[0.92rem] opacity-90">
                                    {e.venues.map((v) => (
                                      <li key={v}>· {v}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <ArrowUpRight
                                size={22}
                                strokeWidth={1.25}
                                className="mt-1 shrink-0 text-[color:var(--color-oro-soft)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </div>
                          </Link>
                        </StaggerItem>
                      );
                    })}
                  </Stagger>
                </div>
              ) : null}
            </div>
          </section>
        );
      })()}

      {/* Past productions — split into Compagnia productions and Hosted */}
      {(() => {
        const compagnia = pastProductions.filter((e) => e.producer === "compagnia");
        const hosted = pastProductions.filter((e) => e.producer === "hosted");
        const renderCard = (e: typeof pastProductions[number]) => (
          <StaggerItem key={e.slug}>
            <Link href={`/teatro/${e.slug}`} className="group block">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5">
                <Image
                  src={e.poster ?? e.cover}
                  alt={`${e.title[loc]} — locandina`}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {e.producer ? (
                  <span className="absolute left-3 top-3 inline-flex items-center bg-[color:var(--color-travertino)]/90 px-2 py-1 font-[family-name:var(--font-cartel)] text-[0.66rem] uppercase tracking-[0.2em] text-[color:var(--color-sepia)]">
                    {producerLabel(e.producer, loc)}
                  </span>
                ) : null}
              </div>
              <div className="mt-6">
                <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                  {e.year} · {kindLabel(e.kind, loc)}
                </p>
                <h3 className="mt-3 bodoni-italic text-[clamp(1.6rem,2.2vw+0.5rem,2.25rem)] leading-[1.05] text-[color:var(--color-sepia)]">
                  {e.title[loc]}
                </h3>
                <p className="mt-2 text-[1rem] italic text-[color:var(--color-sepia-soft)]">
                  {e.tagline[loc]}
                </p>
              </div>
            </Link>
          </StaggerItem>
        );

        return (
          <>
            {compagnia.length > 0 ? (
              <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
                <div className="container-site py-16 md:py-24">
                  <FadeIn>
                    <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                      {loc === "it" ? "Produzioni della Compagnia" : "Compagnia productions"}
                    </p>
                    <p className="mt-4 max-w-[60ch] text-[0.95rem] italic leading-[1.6] text-[color:var(--color-sepia-soft)]">
                      {loc === "it"
                        ? "Spettacoli scritti, diretti e prodotti dalla Compagnia."
                        : "Plays written, directed and produced by the Compagnia."}
                    </p>
                  </FadeIn>
                  <Stagger className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
                    {compagnia.map(renderCard)}
                  </Stagger>
                </div>
              </section>
            ) : null}

            {hosted.length > 0 ? (
              <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-travertino)]">
                <div className="container-site py-16 md:py-24">
                  <FadeIn>
                    <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                      {loc === "it" ? "Ospitati da Gaudeamus" : "Hosted by Gaudeamus"}
                    </p>
                    <p className="mt-4 max-w-[60ch] text-[0.95rem] italic leading-[1.6] text-[color:var(--color-sepia-soft)]">
                      {loc === "it"
                        ? "Lavori di artisti esterni che la Compagnia ha sostenuto, ospitato o fatto circolare."
                        : "Work by external artists that the Compagnia has supported, hosted or circulated."}
                    </p>
                  </FadeIn>
                  <Stagger className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
                    {hosted.map(renderCard)}
                  </Stagger>
                </div>
              </section>
            ) : null}
          </>
        );
      })()}

      {/* Dicono di noi — featured pull quote + outlet rail */}
      {(() => {
        const featured = press.find((p) => p.url === "/press/scda-article.pdf");
        const supporting = press
          .filter((p) => p !== featured && p.quote)
          .slice(0, 4);
        return (
          <section className="border-t border-[color:var(--color-sepia)]/15 bg-[color:var(--color-cielo)] py-20 md:py-28">
            <div className="container-site">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
                  {t("diconoEyebrow")}
                </p>
                <p className="mt-6 max-w-[58ch] bodoni-italic text-[1.15rem] leading-[1.5] text-[color:var(--color-sepia)]">
                  {t("diconoBody")}
                </p>
              </FadeIn>

              {featured?.quote ? (
                <FadeIn delay={0.1}>
                  <blockquote className="mt-14 max-w-[44ch]">
                    <p className="bodoni-italic text-[clamp(1.8rem,3vw+1rem,3.4rem)] leading-[1.15] text-[color:var(--color-sepia)]">
                      “{featured.quote[loc]}”
                    </p>
                    <footer className="mt-6 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                      — {featured.outlet}
                      {featured.date ? ` · ${featured.date.slice(0, 4)}` : ""}
                    </footer>
                  </blockquote>
                </FadeIn>
              ) : null}

              {supporting.length > 0 ? (
                <Stagger className="mt-16 grid gap-8 border-t border-[color:var(--color-sepia)]/15 pt-10 md:mt-20 md:grid-cols-2 md:gap-12">
                  {supporting.map((p) => (
                    <StaggerItem key={p.url}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex h-full flex-col"
                      >
                        <p className="bodoni-italic text-[1.15rem] leading-[1.5] text-[color:var(--color-sepia)]">
                          “{p.quote![loc]}”
                        </p>
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <span className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]">
                            {p.outlet}
                            {p.date ? ` · ${p.date.slice(0, 4)}` : ""}
                          </span>
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.5}
                            className="shrink-0 text-[color:var(--color-pompeiano)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : null}

              <FadeIn delay={0.2}>
                <Link
                  href="/teatro/recensioni"
                  className="mt-14 inline-flex items-center gap-3 border-b border-[color:var(--color-sepia)]/40 pb-1 font-[family-name:var(--font-cartel)] text-[0.82rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)] transition-colors hover:border-[color:var(--color-pompeiano)] hover:text-[color:var(--color-pompeiano)]"
                >
                  {t("diconoCta")}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </FadeIn>
            </div>
          </section>
        );
      })()}

      {/* Workshops teaser (reviews now have their own dedicated block above) */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <FadeIn className="md:col-span-7">
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
              {t("workshopTitle")}
            </p>
            <h3 className="mt-6 bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-[1.15] text-[color:var(--color-sepia)]">
              {t("workshopBody")}
            </h3>
            <Link
              href="/teatro/laboratori"
              className="hover-underline mt-6 inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
            >
              {t("workshopLink")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
