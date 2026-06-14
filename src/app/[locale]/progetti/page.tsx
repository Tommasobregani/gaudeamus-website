import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig, type Locale } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema-org";

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
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/progetti`,
      languages: {
        en: `${siteConfig.url}/en/progetti`,
        it: `${siteConfig.url}/it/progetti`,
      },
    },
  };
}

import { fundedProjects } from "@/content/projects";

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

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/progetti` },
        ])}
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        meta={t("heroMeta")}
        image="/media/events/christmas-party-2026-3.jpg"
        imageAlt="Gaudeamus Christmas Party"
        imagePosition="center 30%"
      />

      {/* Founding hero — the 2023 entry as a deep-blue anchor */}
      {(() => {
        const founding = fundedProjects[fundedProjects.length - 1];
        return (
          <section className="bg-[color:var(--color-notte)] py-16 text-[color:var(--color-travertino)] md:py-20">
            <div className="container-site grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <FadeIn>
                  <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
                    {locale === "it" ? "Da dove veniamo" : "Where it started"}
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <span className="mt-6 block bodoni-italic text-[clamp(4rem,8vw+1rem,8rem)] leading-[0.9]">
                    {founding.year}
                  </span>
                </FadeIn>
              </div>
              <div className="md:col-span-8 md:flex md:flex-col md:justify-center">
                <FadeIn delay={0.1}>
                  <h2 className="bodoni-italic text-[clamp(1.75rem,2.6vw+1rem,3rem)] leading-[1.1]">
                    {founding.title[loc]}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-[1.7] opacity-90">
                    {founding.body[loc]}
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Institutional partners strip — logos + names per Eva's directive */}
      <section className="border-y border-[color:var(--color-sepia)]/15 bg-[color:var(--color-cielo)] py-16 md:py-20">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-mono)] text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-rosso)]">
                {t("partnersTitle")}
              </p>
              <p className="mt-6 max-w-[36ch] font-[family-name:var(--font-serif-display)] font-light italic text-[1.15rem] leading-[1.45] text-[color:var(--color-sepia)]">
                {t("partnersBody")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.05}>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[
                  { src: "/partners/london-one-radio.jpg", alt: "London One Radio" },
                  { src: "/partners/italian-scotland.jpg", alt: "Italian Scotland" },
                  { src: "/partners/valvona-crolla.png", alt: "Valvona & Crolla, Edinburgh" },
                  { src: "/partners/comites.png", alt: "Com.It.Es. Scotland & Northern Ireland" },
                  { src: "/partners/maeci-consolato-edinburgh.png", alt: "Consolato Generale d'Italia, Edimburgo" },
                ].map((p) => (
                  <li
                    key={p.src}
                    title={p.alt}
                    className="group relative flex aspect-[3/2] items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-sepia)]/12 bg-white p-3.5 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-0.5 hover:border-[color:var(--color-rosso)]/40 hover:shadow-[0_18px_40px_rgba(15,42,74,0.12)]"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.12}>
              <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                {[
                  "London One Radio",
                  "Italian Scotland",
                  loc === "it" ? "Valvona & Crolla, Edimburgo" : "Valvona & Crolla, Edinburgh",
                  loc === "it"
                    ? "Com.It.Es. Scozia e Irlanda del Nord"
                    : "Com.It.Es. Scotland & Northern Ireland",
                  loc === "it"
                    ? "Consolato Generale d'Italia, Edimburgo"
                    : "Consulate General of Italy, Edinburgh",
                  loc === "it"
                    ? "Istituto Italiano di Cultura, Edimburgo"
                    : "Italian Cultural Institute, Edinburgh",
                  loc === "it"
                    ? "Albo Consolare delle Associazioni Culturali Italiane nel Regno Unito"
                    : "Italian Consular Register of Cultural Associations in the UK",
                  "Aberdeen City Council, Creative Funding",
                  "National Lottery Ethnic Minority Development Fund",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 border-t border-[color:var(--color-sepia)]/15 pt-4 text-[0.95rem] leading-[1.4] text-[color:var(--color-sepia)]"
                  >
                    <span aria-hidden className="text-[color:var(--color-rosso)]">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <Stagger className="border-t-2 border-[color:var(--color-sepia)]">
          {fundedProjects.slice(0, -1).map((p, i, arr) => {
            const showYear = i === 0 || arr[i - 1].year !== p.year;
            return (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/progetti/${p.slug}`}
                  className="group grid gap-6 border-b border-[color:var(--color-sepia)]/25 py-10 transition-colors hover:bg-white/40 md:grid-cols-12 md:gap-10 md:py-12"
                >
                  <div className="md:col-span-3">
                    {showYear ? (
                      <span className="block font-[family-name:var(--font-inter)] text-[clamp(2.5rem,4vw+1rem,3.75rem)] font-light leading-[0.95] tracking-[-0.025em] text-[color:var(--color-sepia)]">
                        {p.year}
                      </span>
                    ) : null}
                  </div>
                  <div className="md:col-span-9">
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="font-[family-name:var(--font-inter)] text-[clamp(1.4rem,1.8vw+0.5rem,2rem)] font-medium leading-[1.2] tracking-[-0.018em] text-[color:var(--color-sepia)]">
                        {p.title[loc]}
                      </h3>
                      <span className="mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--color-sepia)]/15 text-[color:var(--color-notte)] transition-all duration-300 group-hover:bg-[color:var(--color-notte)] group-hover:text-white group-hover:-translate-y-0.5">
                        <ArrowUpRight size={16} strokeWidth={1.6} />
                      </span>
                    </div>
                    <p className="mt-4 max-w-[64ch] text-[1.02rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                      {p.body[loc]}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <FadeIn delay={0.2}>
          <p className="mt-12 max-w-[58ch] text-[0.95rem] italic leading-[1.7] text-[color:var(--color-sepia-soft)]">
            {locale === "it"
              ? "Stiamo aggiornando questo archivio con la lista completa dei progetti finanziati. Se sei un finanziatore o vuoi proporre una collaborazione, scrivici."
              : "We are updating this archive with the full list of funded projects. If you are a funder or want to propose a collaboration, please get in touch."}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
