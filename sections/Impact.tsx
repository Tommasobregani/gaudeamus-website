"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";

type Stat = {
  display: string;
  labelKey: string;
  noteKey: string;
};

const STATS: Stat[] = [
  { display: "2023", labelKey: "yearLabel", noteKey: "yearNote" },
  { display: "7", labelKey: "productionsLabel", noteKey: "productionsNote" },
  { display: "3", labelKey: "citiesLabel", noteKey: "citiesNote" },
  { display: "100%", labelKey: "italianLabel", noteKey: "italianNote" },
];

export function Impact() {
  const t = useTranslations("home.impact");

  return (
    <section className="container-site py-20 md:py-28">
      <FadeIn>
        <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
          {t("eyebrow")}
        </p>
        <h2 className="mt-6 max-w-[22ch] bodoni-italic text-[clamp(2.2rem,4.4vw+1rem,4rem)] leading-[1.02] text-[color:var(--color-sepia)]">
          {t("title")}
        </h2>
      </FadeIn>

      <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 md:mt-24 md:grid-cols-4 md:gap-x-12">
        {STATS.map((s, i) => (
          <FadeIn key={s.labelKey} delay={i * 0.06}>
            <li className="flex flex-col gap-4 border-t border-[color:var(--color-sepia)]/15 pt-6">
              <span className="bodoni-italic leading-[0.92] text-[clamp(2.8rem,6vw,5rem)] text-[color:var(--color-pompeiano)]">
                {s.display}
              </span>
              <span className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)]">
                {t(s.labelKey)}
              </span>
              <span className="text-[0.92rem] leading-[1.55] text-[color:var(--color-muted)]">
                {t(s.noteKey)}
              </span>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
