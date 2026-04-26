import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  upcomingProductions,
  pastProductions,
  type EventKind,
} from "@/content/events";
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

      {/* Header */}
      <section className="container-site pt-16 pb-10 md:pt-24 md:pb-14">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-[18ch] display-mixed text-[clamp(2.75rem,7vw+1rem,8rem)] leading-[0.96]">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-5 space-y-5">
              <p className="text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
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

      {/* On stage / upcoming — deep-blue theatre-night panel */}
      <section className="bg-[color:var(--color-notte)] py-16 text-[color:var(--color-travertino)] md:py-24">
        <div className="container-site">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
            {t("onStageTitle")}
          </p>
        </FadeIn>
        {upcomingProductions.length === 0 ? (
          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-[1rem] leading-[1.65] opacity-85">
              {t("onStageEmpty")}
            </p>
          </FadeIn>
        ) : (
          <Stagger className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
            {upcomingProductions.map((e) => {
              const hasPoster = Boolean(e.poster || e.cover);
              return (
                <StaggerItem key={e.slug}>
                  <Link href={`/teatro/${e.slug}`} className="group block">
                    {hasPoster ? (
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5">
                        <Image
                          src={e.poster ?? e.cover}
                          alt={e.title[loc]}
                          fill
                          sizes="(min-width: 768px) 45vw, 90vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="relative flex aspect-[3/4] w-full flex-col justify-between border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] p-8 transition-colors group-hover:bg-[color:var(--color-travertino)] md:p-10">
                        <p className="text-center font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
                          COMPAGNIA GAUDEAMUS · SCIO
                        </p>
                        <div className="text-center">
                          <p className="font-[family-name:var(--font-body)] italic text-[0.95rem] text-[color:var(--color-sepia-soft)]">
                            {loc === "it" ? "presenta" : "presents"}
                          </p>
                          <h4 className="mt-4 bodoni-italic text-[clamp(1.5rem,2.4vw+0.5rem,2.5rem)] leading-[1.05] text-[color:var(--color-sepia)]">
                            {e.title[loc]}
                          </h4>
                          <p className="mt-4 italic text-[0.95rem] text-[color:var(--color-accent,var(--color-terracotta))]">
                            {e.tagline[loc]}
                          </p>
                        </div>
                        <p className="text-center font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
                          {e.year}
                        </p>
                      </div>
                    )}
                    <div className="mt-6 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {hasPoster ? (
                          <>
                            <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.28em] opacity-80">
                              {e.year} · {kindLabel(e.kind, loc)}
                            </p>
                            <h3 className="mt-3 bodoni-italic text-[2rem] leading-[1.05]">
                              {e.title[loc]}
                            </h3>
                            <p className="mt-2 text-[1rem] italic opacity-90">
                              {e.tagline[loc]}
                            </p>
                          </>
                        ) : null}
                        {e.venues && (
                          <ul className={`${hasPoster ? "mt-3" : ""} space-y-1 text-[0.92rem] opacity-90`}>
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
        )}
        </div>
      </section>

      {/* Past productions */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-24">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("pastTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            {pastProductions.map((e) => (
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
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
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
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Workshops + Reviews — sub-section teasers */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
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
          <FadeIn delay={0.1}>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("reviewsTitle")}
            </p>
            <h3 className="mt-6 bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-[1.15] text-[color:var(--color-sepia)]">
              {t("reviewsBody")}
            </h3>
            <Link
              href="/teatro/recensioni"
              className="hover-underline mt-6 inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
            >
              {t("reviewsLink")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
