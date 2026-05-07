"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

/**
 * Voice — signed manifesto, larger and warmer.
 * Big pull-quote with an ochre opening mark, founder signature on a hairline.
 * No glass, no card. Reads as a programme note.
 */
export function Voice() {
  const t = useTranslations("home.voice");

  return (
    <section className="container-site py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
            className="flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
            <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
              {t("eyebrow")}
            </p>
          </motion.div>
        </div>

        <div className="relative md:col-span-9 md:col-start-4">
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
            className="pointer-events-none absolute -top-10 -left-1 select-none font-[family-name:var(--font-inter)] text-[clamp(4.5rem,10vw,8.5rem)] font-light leading-[0.7] text-[color:var(--color-ocra)] md:-left-6"
          >
            “
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.95, ease: [0.2, 0.7, 0.1, 1] }}
            className="relative font-[family-name:var(--font-inter)] text-[clamp(1.55rem,2.4vw+0.6rem,2.4rem)] font-light leading-[1.28] tracking-[-0.018em] text-[color:var(--color-sepia)]"
          >
            {t("body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: 0.95,
              delay: 0.18,
              ease: [0.2, 0.7, 0.1, 1],
            }}
            className="mt-12 flex items-center gap-4 border-t border-[color:var(--color-sepia)]/12 pt-6"
          >
            <span aria-hidden className="h-px w-10 bg-[color:var(--color-ocra)]" />
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[0.98rem] font-medium tracking-[-0.005em] text-[color:var(--color-sepia)]">
                {t("signatory")}
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                {t("signatoryRole")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
