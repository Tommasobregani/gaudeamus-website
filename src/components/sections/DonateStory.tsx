"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { ImgReveal } from "@/components/motion/ImgReveal";
import type { Locale } from "@/lib/utils";

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;

/**
 * DonateStory — emotional ask. Per Eva's directive (29 Apr meeting):
 * "mantenere la donazione libera senza gli step perché tendenzialmente una
 * donazione non è un crowdfunding". No tiered amounts. Plain ask + Donate
 * + Gift Aid. Trust microline kept.
 */
export function DonateStory() {
  const t = useTranslations("home.donate");
  const locale = useLocale() as Locale;
  const it = locale === "it";

  return (
    <section className="container-site py-20 md:py-28">
      <div className="grid items-start gap-10 md:grid-cols-12 md:gap-14">
        {/* Photo */}
        <div className="md:col-span-5">
          <ImgReveal
            from="bottom"
            parallax={false}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-cielo)] shadow-[var(--shadow-lift)]"
          >
            <Image
              src="/events/christmas-party/christmas-party-02.jpg"
              alt={
                it
                  ? "La comunità Gaudeamus a una festa"
                  : "The Gaudeamus community at a gathering"
              }
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </ImgReveal>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              {it ? "La comunità" : "Community"}
            </p>
            <span aria-hidden className="h-px flex-1 self-end bg-[color:var(--color-sepia)]/15" />
            <span className="font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]">
              Aberdeen · 2025
            </span>
          </div>
        </div>

        {/* Story */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: POWER3_OUT }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
            <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
              {t("eyebrow")}
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.05, ease: POWER3_OUT }}
            className="mt-5 max-w-[24ch] font-[family-name:var(--font-inter)] text-[clamp(1.9rem,3.4vw+0.5rem,3.2rem)] font-light leading-[1.06] tracking-[-0.025em] text-[color:var(--color-sepia)]"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: POWER3_OUT }}
            className="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.7] text-[color:var(--color-sepia-soft)]"
          >
            {t("body")}
          </motion.p>

          {/* Free donation, any amount — no tiers, no crowdfunding feel. */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.85, delay: 0.18, ease: POWER3_OUT }}
            className="mt-10 border-t border-[color:var(--color-sepia)]/15 pt-6"
          >
            <p className="font-[family-name:var(--font-serif-display)] text-[clamp(1.1rem,1.4vw+0.5rem,1.45rem)] font-light italic leading-[1.4] text-[color:var(--color-sepia)]">
              {t("freeNote")}
            </p>
          </motion.div>

          {/* Trust microline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: POWER3_OUT }}
            className="mt-7 font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]"
          >
            {t("trust")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: POWER3_OUT }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/sostienici" variant="primary" size="lg" withArrow>
              {t("ctaPrimary")}
            </ButtonLink>
            <ButtonLink href="/sostienici/gift-aid" variant="outline" size="lg">
              {t("ctaSecondary")}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
