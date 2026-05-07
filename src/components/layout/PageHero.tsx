"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { LetterReveal } from "@/components/motion/LetterReveal";

type Props = {
  eyebrow: string;
  title: string;
  /** Optional intro paragraph rendered below the title */
  lead?: string;
  /** Optional small mono meta line */
  meta?: string;
  /** Background photo. Defaults to a curated production still. */
  image?: string;
  imageAlt?: string;
  /**
   * object-position for the image — controls which part of the photo is
   * visible after object-cover crops it. CSS position string ("center",
   * "50% 30%", "right top", etc). Set per page so subjects never get cut.
   */
  imagePosition?: string;
  /** Reduce vertical scale (use on smaller utility pages like /contatti) */
  size?: "default" | "compact";
};

/**
 * PageHero v2 — photo is the hero. Text sits at the bottom of the section,
 * over a dark gradient that only covers the lower half. Subjects of the
 * photograph remain visible at all times.
 *
 * Composition:
 *   ┌──────────────────────────────────────┐
 *   │                                      │
 *   │           ── photo subject ──        │
 *   │                                      │
 *   │ ┌── eyebrow                          │
 *   │ │  Title                  meta ──┐   │
 *   │ │  lead paragraph                │   │
 *   └──┴──────────────────────────────────────┘
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  image = "/events/poor-piero/poor-piero-04.jpeg",
  imageAlt = "",
  imagePosition = "center 30%",
  size = "default",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1.10]);

  // Smaller on phones, taller on desktop.
  const minH =
    size === "compact"
      ? "clamp(520px, 64vh, 700px)"
      : "clamp(620px, 78vh, 900px)";

  return (
    <section
      ref={ref}
      data-page-hero="dark"
      className="relative isolate overflow-hidden"
      style={{ minHeight: minH }}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <motion.div
          style={reduce ? undefined : { y, scale }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </motion.div>

        {/* Bottom-only gradient — keeps the subject readable, doesn't cover the image */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,transparent_0%,rgba(8,26,49,0.55)_38%,rgba(8,26,49,0.86)_100%)]"
        />
        {/* Hairline bottom edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"
        />
      </div>

      {/* Foreground — text anchored bottom-left */}
      <div className="container-site relative z-10 flex min-h-[inherit] items-end pb-14 pt-32 md:pb-16 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.2, 0.7, 0.1, 1] }}
          className="grid w-full items-end gap-8 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-8">
            <p className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
              {eyebrow}
            </p>
            <h1
              className="mt-5 max-w-[18ch] font-[family-name:var(--font-inter)] text-[clamp(2rem,4.4vw+0.5rem,4.2rem)] font-light leading-[1.04] tracking-[-0.025em] text-white"
              style={{ overflowWrap: "break-word" }}
            >
              <LetterReveal as="span" text={title} className="block" />
            </h1>
            {lead ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.2, 0.7, 0.1, 1] }}
                className="mt-6 max-w-[58ch] text-[1rem] leading-[1.65] text-white/85"
              >
                {lead}
              </motion.p>
            ) : null}
          </div>

          {meta ? (
            <div className="md:col-span-3 md:col-start-10 md:self-end">
              <p className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-white/65">
                {meta}
              </p>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
