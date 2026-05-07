"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import type { Locale } from "@/lib/utils";

/**
 * Impact — three editorial sentences that say what we are, in plain language.
 * No SaaS stat tiles. The numbers live inside the sentences as poster-sized
 * inline marks, not as separate metrics.
 */
export function Impact() {
  const t = useTranslations("home.impact");
  const locale = useLocale() as Locale;

  return (
    <section className="container-site py-20 md:py-28">
      <FadeIn>
        <p className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
          {t("eyebrow")}
        </p>
      </FadeIn>

      <FadeIn delay={0.06}>
        <p
          className="mt-7 max-w-[24ch] font-[family-name:var(--font-inter)] text-[clamp(2rem,4.4vw+0.5rem,4.2rem)] font-light leading-[1.04] tracking-[-0.025em] text-[color:var(--color-sepia)]"
          style={{ overflowWrap: "break-word" }}
        >
          {t("title")}
        </p>
      </FadeIn>

      {/* Three editorial sentences */}
      <div className="mt-16 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">
        <FadeIn delay={0.08}>
          <Sentence
            tag={locale === "it" ? "Fondata" : "Founded"}
            title={
              locale === "it"
                ? "Aberdeen, maggio 2023."
                : "Aberdeen, May 2023."
            }
            note={
              locale === "it"
                ? "Iscritta come SCIO scozzese a settembre 2023, l'unica charity che porta in scena il teatro italiano in Scozia."
                : "Registered as a Scottish SCIO in September 2023, the only charity staging Italian theatre in Scotland."
            }
          />
        </FadeIn>

        <FadeIn delay={0.14}>
          <Sentence
            tag={locale === "it" ? "Produzioni" : "Productions"}
            title={
              locale === "it"
                ? "Sette spettacoli in tre anni."
                : "Seven productions in three years."
            }
            note={
              locale === "it"
                ? "Tutte interamente in italiano, con sottotitoli in inglese dal vivo. Aberdeen, Edimburgo, Glasgow."
                : "All performed entirely in Italian, with live English subtitles. Aberdeen, Edinburgh, Glasgow."
            }
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <Sentence
            tag={locale === "it" ? "Comunità" : "Community"}
            title={
              locale === "it"
                ? "Tre città. Una sola compagnia."
                : "Three cities. One company."
            }
            note={
              locale === "it"
                ? "Aperitivi letterari, laboratori, feste di Natale. Un punto di riferimento per gli italiani in Scozia."
                : "Literary aperitivos, workshops, Christmas parties. A cultural home for Italians in Scotland."
            }
          />
        </FadeIn>
      </div>

      <FadeIn delay={0.28}>
        <Link
          href="/chi-siamo"
          className="group mt-14 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[0.74rem] font-medium uppercase tracking-[0.26em] text-[color:var(--color-notte)] md:mt-16"
        >
          <span className="relative">
            {locale === "it" ? "La nostra storia" : "Our story"}
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:origin-left group-hover:scale-x-100"
            />
          </span>
          <ArrowUpRight size={14} strokeWidth={1.6} />
        </Link>
      </FadeIn>
    </section>
  );
}

function Sentence({
  tag,
  title,
  note,
}: {
  tag: string;
  title: string;
  note: string;
}) {
  return (
    <article className="border-t border-[color:var(--color-sepia)]/15 pt-6">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ocra)]" />
        <span className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[color:var(--color-notte)]">
          {tag}
        </span>
      </div>
      <p className="mt-5 font-[family-name:var(--font-inter)] text-[clamp(1.2rem,1.4vw+0.5rem,1.6rem)] font-medium leading-[1.2] tracking-[-0.018em] text-[color:var(--color-sepia)]">
        {title}
      </p>
      <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
        {note}
      </p>
    </article>
  );
}
