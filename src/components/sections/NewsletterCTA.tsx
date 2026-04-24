"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterCTA() {
  const t = useTranslations("home");

  return (
    <section className="container-site border-t border-[color:var(--color-sepia)]/20 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeIn>
            <RomanEyebrow n={4} label={t("newsletterEyebrow")} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 bodoni-italic text-[clamp(2rem,3.5vw+1rem,3.25rem)] leading-[1.05] text-[color:var(--color-sepia)]">
              {t("newsletterTitle")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Fregio width={180} tone="terracotta" />
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <FadeIn delay={0.15}>
            <p className="max-w-[54ch] text-[1.075rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
              {t("newsletterBody")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-8 max-w-md">
            <NewsletterForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
