"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterCTA() {
  const t = useTranslations("home");

  return (
    <section className="container-site py-24 text-[color:var(--color-travertino)] md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
              {t("newsletterEyebrow")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 bodoni-italic text-[clamp(2rem,3.5vw+1rem,3.25rem)] leading-[1.05]">
              {t("newsletterTitle")}
            </h2>
          </FadeIn>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <FadeIn delay={0.15}>
            <p className="max-w-[54ch] text-[1.075rem] leading-[1.7] opacity-90">
              {t("newsletterBody")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-8 max-w-md">
            <NewsletterForm tone="dark" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
