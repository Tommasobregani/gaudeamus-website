"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/Button";
import { ImgReveal } from "@/components/motion/ImgReveal";
import type { Locale } from "@/lib/utils";

const TIERS = [25, 50, 100, 500] as const;

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
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
            <p className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
              {t("eyebrow")}
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.2, 0.7, 0.1, 1] }}
            className="mt-5 max-w-[24ch] font-[family-name:var(--font-inter)] text-[clamp(1.9rem,3.4vw+0.5rem,3.2rem)] font-light leading-[1.06] tracking-[-0.025em] text-[color:var(--color-sepia)]"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.1, 1] }}
            className="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.7] text-[color:var(--color-sepia-soft)]"
          >
            {t("body")}
          </motion.p>

          {/* Tier label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.2, 0.7, 0.1, 1] }}
            className="mt-12 font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
          >
            {t("tiersTitle")}
          </motion.p>

          {/* Tier entries — editorial programme-card feel, not pricing tiles */}
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-4 lg:gap-x-6">
            {TIERS.map((amount, i) => (
              <motion.li
                key={amount}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.22 + i * 0.06,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <Link
                  href={`/sostienici?amount=${amount}`}
                  className="group relative block pt-5 pb-2"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[color:var(--color-sepia)]/20 transition-colors duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:bg-[color:var(--color-ocra)]"
                  />
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-[family-name:var(--font-inter)] text-[clamp(1.7rem,2.2vw+0.5rem,2.2rem)] font-light leading-[1.0] tracking-[-0.025em] text-[color:var(--color-notte)]">
                      £{amount}
                    </span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="mt-2 text-[color:var(--color-muted)] transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:text-[color:var(--color-ocra)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-3 text-[0.88rem] leading-[1.5] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-sepia)]">
                    {t(`tier${amount}` as "tier25" | "tier50" | "tier100" | "tier500")}
                  </p>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Trust microline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
            className="mt-7 font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]"
          >
            {t("trust")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
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
