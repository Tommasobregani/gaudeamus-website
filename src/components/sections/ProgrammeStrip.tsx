"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ImgReveal } from "@/components/motion/ImgReveal";
import type { Locale } from "@/lib/utils";

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;

type Pillar = {
  key: string;
  href: string;
  label: { en: string; it: string };
  title: { en: string; it: string };
  image: string;
  position: string;
};

const PILLARS: Pillar[] = [
  {
    key: "teatro",
    href: "/teatro",
    label: { en: "Theatre", it: "Teatro" },
    title: {
      en: "Productions in Italian, with live English subtitles.",
      it: "Produzioni in italiano, con sottotitoli live in inglese.",
    },
    image: "/events/poor-piero/poor-piero-09.jpeg",
    position: "center 30%",
  },
  {
    key: "workshop",
    href: "/teatro",
    label: { en: "Workshops", it: "Laboratori" },
    title: {
      en: "Theatre and the Italian language, hands on, across Scotland.",
      it: "Teatro e lingua italiana, in pratica, in tutta la Scozia.",
    },
    image: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    position: "center 40%",
  },
  {
    key: "eventi",
    href: "/eventi",
    label: { en: "Events", it: "Eventi" },
    title: {
      en: "Community events: aperitivos, gatherings, Christmas parties.",
      it: "Eventi di comunità: aperitivi letterari, incontri, feste di Natale.",
    },
    image: "/events/christmas-party/christmas-party-07.jpg",
    position: "center 35%",
  },
];

/**
 * ProgrammeStrip — three pillars (theatre, workshops, community) as
 * editorial cards. Hairline numbering, photo above caption, ochre
 * underline appears on hover. Sits on the warm travertino stage.
 */
export function ProgrammeStrip() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <section className="container-site py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.85, ease: POWER3_OUT }}
        className="flex items-center gap-3"
      >
        <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
        <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
          {t("manifestoEyebrow")}
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.95, delay: 0.06, ease: POWER3_OUT }}
        className="mt-6 max-w-[24ch] font-[family-name:var(--font-inter)] text-[clamp(2rem,4.4vw+0.5rem,3.8rem)] font-light leading-[1.04] tracking-[-0.025em] text-[color:var(--color-sepia)]"
      >
        {t("manifestoTitle")}
      </motion.h2>

      <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
        {PILLARS.map((p, i) => (
          <Link
            key={p.key}
            href={p.href}
            className="group block"
            aria-label={`${p.label[locale]} — ${p.title[locale]}`}
          >
            <ImgReveal
              from="bottom"
              parallax={false}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-cielo)] shadow-[0_18px_42px_rgba(15,42,74,0.10)]"
            >
              <motion.div
                initial={{ scale: 1.14 }}
                whileInView={{ scale: 1.04 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 1.6,
                  delay: i * 0.06,
                  ease: [0.165, 0.84, 0.44, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={p.image}
                  alt={p.label[locale]}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
                  style={{ objectPosition: p.position }}
                />
              </motion.div>
            </ImgReveal>

            <div className="mt-6 flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                {String(i + 1).padStart(2, "0")} · {p.label[locale]}
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="text-[color:var(--color-muted)] transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:rotate-45 group-hover:text-[color:var(--color-notte)]"
              />
            </div>
            <h3 className="relative mt-3 inline-block max-w-[28ch] font-[family-name:var(--font-inter)] text-[1.18rem] font-medium leading-[1.3] tracking-[-0.012em] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-notte)]">
              {p.title[locale]}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--color-ocra)] transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-x-100"
              />
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
