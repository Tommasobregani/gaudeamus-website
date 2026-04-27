"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function ClosingCTA() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-pompeiano)] text-[color:var(--color-on-accent)]">
      <div className="container-site relative py-24 md:py-32">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-on-accent)]/85">
            {t("closingEyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 max-w-[20ch] bodoni-italic text-[clamp(2.4rem,5.4vw+0.5rem,5.4rem)] leading-[1.02]">
            {t("closingTitle")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <ButtonLink
              href="/sostienici"
              variant="primary"
              className="!bg-[color:var(--color-travertino)] !text-[color:var(--color-sepia)] hover:!bg-[color:var(--color-travertino)]/90"
              withArrow
            >
              {t("closingCtaPrimary")}
            </ButtonLink>
            <ButtonLink
              href="/contatti"
              variant="outline"
              className="!border-[color:var(--color-travertino)] !text-[color:var(--color-travertino)] hover:!bg-[color:var(--color-travertino)] hover:!text-[color:var(--color-pompeiano)]"
            >
              {t("closingCtaSecondary")}
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
