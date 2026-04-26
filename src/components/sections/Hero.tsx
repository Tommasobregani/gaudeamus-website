"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LetterReveal } from "@/components/motion/LetterReveal";
import { upcomingProductions } from "@/content/events";
import type { Locale } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const next = upcomingProductions[0];

  return (
    <section className="relative overflow-hidden pb-12 pt-6 md:pb-20 md:pt-8">
      {/* Top stamp bar — Compagnia + charity strap */}
      <div className="container-site flex flex-wrap items-center justify-between gap-3 border-t border-b border-[color:var(--color-sepia)]/20 py-3">
        <span className="stamp">Compagnia Artistica Gaudeamus · SCIO</span>
        <span className="stamp">{t("eyebrow")}</span>
      </div>

      {/* Massive poster title — second line in deep blue */}
      <div className="container-site relative pt-10 md:pt-16">
        <h1
          className="bodoni-title text-[color:var(--color-sepia)]"
          aria-label={`${t("heroLine1")} ${t("heroLine2")} ${t("heroLine3")}`}
        >
          <span className="block text-[clamp(3rem,11vw,9rem)] leading-[0.92]">
            <LetterReveal as="span" text={t("heroLine1")} className="inline-block" italicize />
          </span>
          <span className="mt-1 block text-[clamp(3rem,11vw,9rem)] leading-[0.92]">
            <span className="bodoni-italic inline-block pr-4 text-[color:var(--color-accent)]">
              <LetterReveal as="span" text={t("heroLine2")} className="inline-block" delay={0.12} />
            </span>
          </span>
          <span className="mt-1 flex items-baseline gap-5 text-[clamp(3rem,11vw,9rem)] leading-[0.92]">
            <LetterReveal as="span" text={t("heroLine3")} className="inline-block" delay={0.24} />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.95, duration: 1.1, ease: [0.2, 0.7, 0.1, 1] }}
              style={{ transformOrigin: "left" }}
              className="hidden h-[0.14em] flex-1 self-center bg-[color:var(--color-accent)] md:block"
              aria-hidden
            />
          </span>
        </h1>
      </div>

      {/* Subcopy + image */}
      <div className="container-site grid grid-cols-1 gap-10 pt-12 md:grid-cols-12 md:gap-12 md:pt-16">
        <motion.div
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
          className="md:col-span-6"
        >
          <p className="max-w-[54ch] text-[1.1rem] leading-[1.55] text-[color:var(--color-sepia-soft)] md:text-[1.2rem]">
            {t("heroSub")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/teatro" variant="primary" withArrow>
              {t("heroCtaPrimary")}
            </ButtonLink>
            <ButtonLink href="/eventi" variant="outline">
              {t("heroCtaSecondary")}
            </ButtonLink>
          </div>

          {next ? (
            <Link
              href={`/teatro/${next.slug}`}
              className="group mt-12 flex items-stretch border-l-[3px] border-[color:var(--color-accent)] bg-[color:var(--color-carta)] transition-colors hover:bg-[color:var(--color-travertino)]"
            >
              <div className="flex flex-1 flex-col gap-1 p-5 md:flex-row md:items-center md:justify-between md:gap-6">
                <div>
                  <p className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                    {locale === "it" ? "Prossima produzione" : "Next on stage"}
                  </p>
                  <p className="mt-2 bodoni-italic text-[1.35rem] leading-[1.15] text-[color:var(--color-sepia)]">
                    {next.title[locale]}
                  </p>
                  {next.venues && next.venues[0] ? (
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.18em] text-[color:var(--color-sepia-soft)]">
                      {next.venues[0]}
                    </p>
                  ) : null}
                </div>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.25}
                  className="shrink-0 text-[color:var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.2, 0.7, 0.1, 1] }}
          className="relative md:col-span-6"
        >
          <figure className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-accent)]">
              <Image
                src="/events/poor-piero/poor-piero-01.jpg"
                alt="Gaudeamus — Poor Piero, on stage in Aberdeen"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-[color:var(--color-travertino)]/40 bg-gradient-to-t from-[color:var(--color-sepia)]/80 via-[color:var(--color-sepia)]/40 to-transparent px-4 py-3 text-[color:var(--color-travertino)]">
                <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em]">
                  SCENA · POOR PIERO
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.22em]">
                  2024 — 2025 TOUR
                </span>
              </div>
            </div>
          </figure>
          {/* Decorative crosshair guides — theatrical poster register marks */}
          <div
            className="absolute -bottom-3 -left-3 hidden h-24 w-[2px] bg-[color:var(--color-accent)] md:block"
            aria-hidden
          />
          <div
            className="absolute -top-3 -right-3 hidden h-[2px] w-24 bg-[color:var(--color-accent)] md:block"
            aria-hidden
          />
          <div
            className="absolute -bottom-3 right-12 hidden h-[2px] w-24 bg-[color:var(--color-pompeiano)] md:block"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
