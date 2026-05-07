"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/Button";
import { LetterReveal } from "@/components/motion/LetterReveal";
import { ImgReveal } from "@/components/motion/ImgReveal";
import { upcomingProductions, productions } from "@/content/events";
import type { Locale } from "@/lib/utils";

// archi-site easing curves
const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;
const POWER4_OUT = [0.165, 0.84, 0.44, 1] as const;

// Hero stills rotated on each pageview (Poor Piero, 2025).
const HERO_STILLS = [
  { src: "/events/poor-piero/poor-piero-07.jpeg", position: "center 25%" },
  { src: "/events/poor-piero/poor-piero-04.jpeg", position: "center 30%" },
  { src: "/events/poor-piero/poor-piero-06.jpeg", position: "center 28%" },
] as const;

/**
 * Hero — calm editorial layout, charity register.
 * Type left, photo right, captions BELOW the photo. No glass plates.
 * Motion patterns mirror Northfold/archi-site:
 *   • Title rises (y: 60 → 0) with power4.out, word-stagger.
 *   • Photo: clip-reveal (power4.inOut) + slow Ken Burns scale settle.
 *   • Sub + CTAs: power3.out fade + small y-offset, gently delayed.
 *   • Scroll: tiny parallax on the photo column only.
 */
export function Hero() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  // Pick a photo on the client so each visit can land on a different still
  // without an SSR/CSR mismatch. SSR always sees stills[0].
  const [stillIndex, setStillIndex] = useState(0);
  useEffect(() => {
    setStillIndex(Math.floor(Math.random() * HERO_STILLS.length));
  }, []);
  const still = HERO_STILLS[stillIndex];

  const nextShow = upcomingProductions[0] ?? productions[0];
  const nextDate = nextShow?.date
    ? new Date(nextShow.date).toLocaleDateString(
        locale === "it" ? "it-IT" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : null;
  const nextVenue = nextShow?.venues?.[0]?.split(".")[0] ?? "";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28"
    >
      <div className="container-site">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          {/* ═══ LEFT — type column ═══ */}
          <div className="md:col-span-7 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: POWER3_OUT }}
              className="flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
                {t("eyebrow")}
              </p>
            </motion.div>

            <h1 className="mt-7 max-w-[18ch] min-w-0 text-[color:var(--color-sepia)]">
              <LetterReveal
                as="span"
                text={t("heroLine1")}
                className="block font-[family-name:var(--font-serif-display)] text-[clamp(2.8rem,6.4vw+0.5rem,6.4rem)] font-light leading-[1.04] tracking-[-0.018em] md:font-extralight"
              />
              <LetterReveal
                as="span"
                text={t("heroLine2")}
                delay={0.12}
                italicize
                className="mt-1 block font-[family-name:var(--font-serif-display)] text-[clamp(2.8rem,6.4vw+0.5rem,6.4rem)] font-light italic leading-[1.04] tracking-[-0.018em] text-[color:var(--color-rosso)] md:font-extralight"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: POWER4_OUT }}
              className="mt-8 max-w-[52ch] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)] md:text-[1.05rem]"
            >
              {t("heroSub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.75, ease: POWER3_OUT }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/teatro" variant="primary" size="lg" withArrow>
                {t("heroCtaPrimary")}
              </ButtonLink>
              <ButtonLink href="/sostienici" variant="outline" size="lg">
                {t("heroCtaSecondary")}
              </ButtonLink>
            </motion.div>

            {/* Quiet "next on stage" row, hairline-only */}
            {nextShow ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95, ease: POWER3_OUT }}
                className="mt-12 max-w-md border-t border-[color:var(--color-sepia)]/12 pt-5"
              >
                <Link href={`/teatro/${nextShow.slug}`} className="group block">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
                      {locale === "it" ? "Prossimo spettacolo" : "Next on stage"}
                    </p>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="text-[color:var(--color-notte)] transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:rotate-45"
                    />
                  </div>
                  <p className="mt-3 font-[family-name:var(--font-inter)] text-[1.18rem] font-medium leading-[1.2] tracking-[-0.012em] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-notte)]">
                    {nextShow.title[locale]}
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-inter)] text-[0.92rem] leading-[1.45] text-[color:var(--color-sepia-soft)]">
                    {nextDate}
                    {nextVenue ? ` · ${nextVenue}` : ""}
                  </p>
                </Link>
              </motion.div>
            ) : null}
          </div>

          {/* ═══ RIGHT — photo column. Caption sits BELOW the photo. ═══ */}
          <div className="md:col-span-5 lg:col-span-5">
            <ImgReveal
              from="bottom"
              parallax={false}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-cielo)] shadow-[var(--shadow-lift)] md:aspect-[3/4]"
            >
              <motion.div
                style={reduce ? undefined : { scale: photoScale, y: photoY }}
                className="absolute inset-0"
              >
                <Image
                  src={still.src}
                  alt="Compagnia Gaudeamus, Poor Piero in scena"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: still.position }}
                />
              </motion.div>
            </ImgReveal>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: POWER3_OUT }}
              className="mt-5 flex items-baseline justify-between gap-4"
            >
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                  In scena
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-inter)] text-[0.96rem] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-sepia)]">
                  Poor Piero
                </p>
              </div>
              <span aria-hidden className="h-px flex-1 self-end bg-[color:var(--color-sepia)]/15" />
              <span className="self-end font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]">
                Aberdeen · 2025
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
