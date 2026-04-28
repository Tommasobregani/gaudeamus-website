"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { events } from "@/content/events";
import type { Locale } from "@/lib/utils";

/**
 * Spotlight — full-bleed billboard for the next production (High Heels).
 * Pure typography on theatre red since we don't have a hero image yet.
 * Designed to read as a printed playbill: marquee strap on top, big italic title,
 * date as a visual element, single CTA. Stays out of the way of the home Hero
 * (Hero is the bigger announcement; Spotlight is the next single production).
 */
export function Spotlight() {
  const t = useTranslations("home.spotlight");
  const locale = useLocale() as Locale;

  const show = events.find((e) => e.kind === "production" && e.status === "upcoming");
  if (!show) return null;

  const dateLine = locale === "it" ? "13 — 15 Agosto 2026" : "13 — 15 August 2026";
  const venueLine = "Edinburgh Fringe · Venue 67";

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-pompeiano)] text-[color:var(--color-on-accent)]">
      {/* Faint poster grid behind the type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Marquee strap — top */}
      <div className="container-site relative flex flex-wrap items-center justify-between gap-3 border-y border-[color:var(--color-on-accent)]/35 py-4 font-[family-name:var(--font-cartel)] text-[0.84rem] uppercase tracking-[0.28em] text-[color:var(--color-on-accent)]">
        <span>{t("eyebrow")}</span>
        <span className="opacity-85">{venueLine}</span>
      </div>

      <div className="container-site relative py-20 md:py-28">
        <FadeIn>
          <h2 className="bodoni-italic max-w-[15ch] text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[0.96] text-[color:var(--color-on-accent)]">
            {show.title[locale]}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-10 bodoni-italic text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.01em] text-[color:var(--color-on-accent)]">
            {dateLine}
          </p>
        </FadeIn>

        {/* Tagline + summary — narrow column for legibility */}
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <p className="bodoni-italic text-[clamp(1.2rem,1.6vw,1.55rem)] leading-[1.45]">
              {show.tagline[locale]}
            </p>
            <p className="mt-6 max-w-[58ch] text-[1rem] leading-[1.7] text-[color:var(--color-on-accent)]/95">
              {show.summary[locale]}
            </p>

            <Link
              href={`/teatro/${show.slug}`}
              className="group mt-12 inline-flex items-center gap-3 border-b border-[color:var(--color-on-accent)]/60 pb-1 font-[family-name:var(--font-cartel)] text-[0.82rem] uppercase tracking-[0.26em] transition-colors hover:border-[color:var(--color-on-accent)]"
            >
              {t("cta")}
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Right column — credits as a printed program would list them */}
          <div className="md:col-span-4 md:col-start-9 self-end">
            <p className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.28em] opacity-65">
              {t("metaWho")}
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.86rem] leading-[1.55] opacity-90">
              {t("metaWhoValue")}
            </p>
            <p className="mt-6 font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.28em] opacity-65">
              {t("kicker")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
