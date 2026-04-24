"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";

export function ClosingCTA() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-terracotta)] text-[color:var(--color-travertino)]">
      <div className="container-site relative grid gap-10 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-8">
          <FadeIn>
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[0.78rem] tracking-[0.2em] text-[color:var(--color-travertino)]/90">05</span>
              <span className="h-px w-6 bg-[color:var(--color-travertino)]/50" />
              <span className="font-[family-name:var(--font-cartel)] text-[0.85rem] tracking-[0.3em]">
                {t("closingEyebrow")}
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-8 bodoni-italic text-[clamp(2.5rem,5vw+1rem,5.5rem)] leading-[1] text-[color:var(--color-travertino)]">
              {t("closingTitle")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Fregio width={200} tone="cream" />
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.2} className="md:col-span-4 md:flex md:items-end">
          <div className="flex flex-wrap gap-3">
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
              className="!border-[color:var(--color-travertino)] !text-[color:var(--color-travertino)] hover:!bg-[color:var(--color-travertino)] hover:!text-[color:var(--color-terracotta)]"
            >
              {t("closingCtaSecondary")}
            </ButtonLink>
          </div>
        </FadeIn>
      </div>
      <div className="grano" aria-hidden />
    </section>
  );
}
