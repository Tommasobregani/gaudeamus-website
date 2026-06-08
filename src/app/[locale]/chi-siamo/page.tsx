import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PageHero } from "@/components/layout/PageHero";
import { staff } from "@/content/staff";
import { press } from "@/content/press";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/chi-siamo`,
      languages: {
        en: `${siteConfig.url}/en/chi-siamo`,
        it: `${siteConfig.url}/it/chi-siamo`,
      },
    },
  };
}

export default async function ChiSiamoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = locale as Locale;

  const doing = [
    { key: "doingProductions", label: locale === "it" ? "Produzioni" : "Productions" },
    { key: "doingWorkshops", label: locale === "it" ? "Laboratori" : "Workshops" },
    { key: "doingEvents", label: locale === "it" ? "Eventi" : "Events" },
    { key: "doingCollaborations", label: locale === "it" ? "Collaborazioni" : "Collaborations" },
  ] as const;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/chi-siamo` },
        ])}
      />

      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        meta={t("heroMeta")}
        image="/events/poor-piero/poor-piero-04.jpeg"
        imageAlt="Compagnia Gaudeamus on stage"
        imagePosition="center 28%"
      />

      {/* History */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
                  {t("historyTitle")}
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn delay={0.1}>
                <p className="text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                  {t("historyBody")}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Mission — deep blue stage */}
      <section className="relative overflow-hidden bg-[color:var(--color-notte)] py-20 text-white md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_15%_30%,rgba(167,192,224,0.14)_0%,transparent_60%)]"
        />
        <div className="container-site relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-inter)] text-[0.74rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
                {t("missionTitle")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8 space-y-8">
            <FadeIn delay={0.1}>
              <p className="font-[family-name:var(--font-inter)] text-[clamp(1.6rem,2.4vw+0.8rem,2.5rem)] font-light leading-[1.22] tracking-[-0.018em] text-white">
                {t("missionBody")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-[64ch] text-[1.02rem] leading-[1.7] text-white/85">
                {t("missionExtra1")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-[64ch] text-[1.02rem] leading-[1.7] text-white/85">
                {t("missionExtra2")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
              {t("doingTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-0 md:grid-cols-2">
            {doing.map((d, i) => (
              <StaggerItem
                key={d.key}
                className={
                  "border-t border-[color:var(--color-sepia)]/25 p-6 md:p-8 " +
                  (i % 2 === 0 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
                }
              >
                <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)]/70">
                  {d.label}
                </p>
                <p className="mt-4 text-[1.05rem] leading-[1.65] text-[color:var(--color-sepia)]">
                  {t(d.key)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="container-site py-20 md:py-28">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("staffTitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-[64ch] text-[1rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
            {t("staffBody")}
          </p>
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((p) => {
            const initials = p.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            return (
              <StaggerItem key={p.name}>
                <article className="glass-light flex items-start gap-5 rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-notte)] font-[family-name:var(--font-inter)] text-[0.95rem] font-medium tracking-[0.12em] text-white">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-inter)] text-[1.15rem] font-medium leading-[1.2] tracking-[-0.012em] text-[color:var(--color-sepia)]">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-inter)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-muted)]">
                      {p.role[loc]}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Parlano di noi — restored per Eva's request (May 2026 review) */}
      {(() => {
        const quotes = press.filter((p) => p.quote).slice(0, 3);
        if (quotes.length === 0) return null;
        return (
          <section className="border-t border-[color:var(--color-sepia)]/15 bg-[color:var(--color-cielo)] py-20 md:py-24">
            <div className="container-site">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
                  {locale === "it" ? "Parlano di noi" : "What they say about us"}
                </p>
                <p className="mt-6 max-w-[58ch] bodoni-italic text-[1.15rem] leading-[1.5] text-[color:var(--color-sepia)]">
                  {locale === "it"
                    ? "Una raccolta di articoli, recensioni e conversazioni sulla compagnia, attraverso le parole di chi ci ha visti."
                    : "A collection of articles, reviews and conversations about the company, in the words of those who have seen us."}
                </p>
              </FadeIn>

              <Stagger className="mt-12 grid gap-8 border-t border-[color:var(--color-sepia)]/15 pt-10 md:grid-cols-3 md:gap-12">
                {quotes.map((p) => (
                  <StaggerItem key={p.url}>
                    <a
                      href={p.url}
                      target={p.url.startsWith("http") ? "_blank" : undefined}
                      rel={p.url.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="group flex h-full flex-col"
                    >
                      <p className="bodoni-italic text-[1.05rem] leading-[1.5] text-[color:var(--color-sepia)]">
                        “{p.quote![loc]}”
                      </p>
                      <div className="mt-6 flex items-center justify-between gap-4">
                        <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]">
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

              <FadeIn delay={0.2}>
                <Link
                  href="/teatro/recensioni"
                  className="mt-14 inline-flex items-center gap-3 border-b border-[color:var(--color-sepia)]/40 pb-1 font-[family-name:var(--font-cartel)] text-[0.82rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)] transition-colors hover:border-[color:var(--color-pompeiano)] hover:text-[color:var(--color-pompeiano)]"
                >
                  {locale === "it" ? "Tutta la rassegna stampa" : "Full press archive"}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </FadeIn>
            </div>
          </section>
        );
      })()}

      {/* Partners */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-20">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
              {t("partnersTitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-[64ch] text-[1rem] leading-[1.75] text-[color:var(--color-sepia-soft)]">
              {t("partnersBody")}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-90">
              <Image
                src="/partners/london-one-radio.jpg"
                alt="London One Radio"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/italian-scotland.jpg"
                alt="Italian Scotland"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/valvona-crolla.png"
                alt="Valvona &amp; Crolla, Edimburgo"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/comites.png"
                alt="Com.It.Es."
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/maeci-consolato-edinburgh.png"
                alt="Consolato Generale d'Italia, Edimburgo"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Join */}
      <section className="container-site py-20 md:py-28">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("joinTitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-[58ch] bodoni-italic text-[clamp(1.5rem,2.2vw+0.8rem,2.25rem)] leading-[1.25] text-[color:var(--color-sepia)]">
            {t("joinBody")}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
