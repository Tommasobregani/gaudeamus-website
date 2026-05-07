"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/content/events";
import type { Locale } from "@/lib/utils";

/**
 * Spotlight — full-bleed cinematic billboard for the next production.
 * Glass plate floats over a production photo. No red, no italic.
 */
export function Spotlight() {
  const t = useTranslations("home.spotlight");
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  const show = events.find((e) => e.kind === "production" && e.status === "upcoming");
  if (!show) return null;

  // Use the show's hero/cover where possible, fall back to a strong production still.
  const cover =
    (show.cover as string | undefined) && (show.cover as string).length > 0
      ? (show.cover as string)
      : "/events/no-shakespeare/no-shakespeare-09.jpg";

  const dateLine = locale === "it" ? "13, 14 & 15 Agosto 2026" : "13, 14 & 15 August 2026";
  const venueLine = "Edinburgh Fringe · Venue 67";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden"
      style={{ minHeight: "clamp(620px, 88vh, 1000px)" }}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <motion.div
          style={reduce ? undefined : { y: photoY, scale: photoScale }}
          className="absolute inset-0"
        >
          <Image
            src={cover}
            alt={show.title[locale]}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </motion.div>
        {/* Bottom-only gradient — keeps the production photo readable as the showcase */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(180deg,transparent_0%,rgba(8,26,49,0.4)_42%,rgba(8,26,49,0.86)_100%)]"
        />
        {/* Top edge — soft tint so the eyebrow strap reads */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(8,26,49,0.45)_0%,transparent_100%)]"
        />
      </div>

      {/* Top eyebrow strap */}
      <div className="container-site relative z-10 flex flex-wrap items-center justify-between gap-3 pt-10 text-white/85">
        <span className="font-[family-name:var(--font-inter)] text-[0.74rem] uppercase tracking-[0.3em]">
          {t("eyebrow")}
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[0.74rem] uppercase tracking-[0.28em] text-white/70">
          {venueLine}
        </span>
      </div>

      {/* Type plate — anchored to the bottom so the photo carries the upper half */}
      <div className="container-site relative z-10 flex min-h-[inherit] items-end pt-32 pb-12 md:pt-40 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.0, ease: [0.2, 0.7, 0.1, 1] }}
          className="w-full max-w-[1100px]"
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-8">
              <h2
                className="max-w-[16ch] font-[family-name:var(--font-inter)] text-[clamp(2.2rem,5vw+0.5rem,4.4rem)] font-light leading-[1.02] tracking-[-0.025em] text-white"
                style={{ overflowWrap: "break-word" }}
              >
                {show.title[locale]}
              </h2>

              <p className="mt-7 font-[family-name:var(--font-inter)] text-[clamp(1.1rem,1.4vw+0.4rem,1.4rem)] font-medium leading-[1.2] tracking-[-0.01em] text-[color:var(--color-cielo)]">
                {dateLine}
              </p>

              <p className="mt-6 max-w-[58ch] text-[1rem] leading-[1.7] text-white/85">
                {show.summary[locale]}
              </p>

              <Link
                href={`/teatro/${show.slug}`}
                className="group mt-10 inline-flex items-center gap-3 border-b border-white/45 pb-1 font-[family-name:var(--font-inter)] text-[0.78rem] uppercase tracking-[0.26em] text-white transition-colors hover:border-white"
              >
                {t("cta")}
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="md:col-span-4 md:col-start-9 md:self-end">
              <p className="font-[family-name:var(--font-inter)] text-[0.66rem] uppercase tracking-[0.3em] text-white/55">
                {t("metaWho")}
              </p>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.84rem] leading-[1.55] text-white/85">
                {t("metaWhoValue")}
              </p>
              <p className="mt-6 font-[family-name:var(--font-inter)] text-[0.66rem] uppercase tracking-[0.3em] text-white/55">
                {t("kicker")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
