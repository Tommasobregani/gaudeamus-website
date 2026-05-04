"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { LetterReveal } from "@/components/motion/LetterReveal";

/**
 * Cinematic hero per Eva's brief:
 *  - Smaller title (was clamp(...,10rem); now clamp(...,6rem))
 *  - Better photo on the right, dominant, full-height with slow Ken Burns motion
 *  - Two clear opening options: Explore Teatro (primary) + Support (secondary)
 *  - "Vivace ma sobrio" - one strong statement, not a poem
 */
export function Hero() {
  const t = useTranslations("home");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Subtle Ken Burns: slow scale + drift while page is in view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.42]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* Left — typography */}
          <div className="md:col-span-6 lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
              className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]"
            >
              {t("eyebrow")}
            </motion.p>

            <h1 className="mt-7 max-w-[14ch] min-w-0 text-[color:var(--color-sepia)]">
              <LetterReveal
                as="span"
                text={t("heroLine1")}
                className="block font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.9vw+1rem,4.75rem)] font-medium leading-[0.98] tracking-[-0.025em]"
              />
              <LetterReveal
                as="span"
                text={t("heroLine2")}
                delay={0.12}
                italicize
                className="mt-1 block font-[family-name:var(--font-display)] italic text-[clamp(2.2rem,4.9vw+1rem,4.75rem)] font-normal leading-[0.98] tracking-[-0.03em] text-[color:var(--color-pompeiano)]"
              />
              <LetterReveal
                as="span"
                text={t("heroLine3")}
                delay={0.24}
                className="mt-1 block font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.9vw+1rem,4.75rem)] font-medium leading-[0.98] tracking-[-0.025em]"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.2, 0.7, 0.1, 1] }}
              className="mt-9 max-w-[52ch] text-[1.02rem] leading-[1.65] text-[color:var(--color-sepia-soft)] md:text-[1.08rem]"
            >
              {t("heroSub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.2, 0.7, 0.1, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/teatro" variant="primary" size="lg" withArrow>
                {t("heroCtaPrimary")}
              </ButtonLink>
              <ButtonLink href="/sostienici" variant="outline" size="lg">
                {t("heroCtaSecondary")}
              </ButtonLink>
            </motion.div>
          </div>

          {/* Right — cinematic photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
            className="md:col-span-6 lg:col-span-6"
          >
            <figure className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-nero)] shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : { scale: photoScale, y: photoY }
                  }
                  className="absolute inset-0"
                >
                  <Image
                    src="/events/poor-piero/poor-piero-07.jpeg"
                    alt="Compagnia Gaudeamus, Poor Piero in scena"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
                {/* subtle vignette + dynamic darkening at scroll for type readability */}
                <motion.div
                  aria-hidden
                  style={reduce ? undefined : { opacity: overlayOpacity }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
                />
                {/* hairline rosso accent on bottom edge */}
                <span aria-hidden className="absolute inset-x-6 bottom-5 h-px bg-white/30" />
                {/* meta strip — production credit */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3 text-white">
                  <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.28em] text-white/85">
                    Poor Piero · in scena
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[0.68rem] tracking-[0.2em] text-white/65">
                    2025
                  </span>
                </div>
              </div>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
