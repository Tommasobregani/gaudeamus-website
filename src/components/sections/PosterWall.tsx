"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { ImgReveal } from "@/components/motion/ImgReveal";
import type { Locale } from "@/lib/utils";

type Poster = {
  slug: string;
  title: string;
  year: string;
  image: string;
};

const POSTERS: Poster[] = [
  { slug: "poor-piero", title: "Poor Piero", year: "2025", image: "/events/poor-piero/locandina.jpg" },
  { slug: "no-shakespeare-fringe", title: "No Shakespeare · Fringe", year: "2024", image: "/events/no-shakespeare/locandina-fringe.jpg" },
  { slug: "wander-fool-word", title: "Wander, Fool, Word", year: "2024", image: "/events/wander-fool-word/locandina.png" },
  { slug: "viaggio-lingua", title: "Viaggio in lingua", year: "2024", image: "/events/viaggio-lingua/locandina.png" },
  { slug: "no-shakespeare", title: "No Shakespeare", year: "2023", image: "/events/no-shakespeare/locandina.jpg" },
];

/**
 * PosterWall — the locandinas. The cultural artefact of any teatro lives here:
 * the printed show poster. Five posters in a quiet asymmetric grid that scales
 * up the eye-line so the most recent show reads first.
 */
export function PosterWall() {
  const locale = useLocale() as Locale;
  const it = locale === "it";

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-travertino)] py-20 md:py-28">
      {/* Tiny ochre wash at the top edge — warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-ocra)] to-transparent"
      />

      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ocra)]" />
              <p className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
                {it ? "Le locandine" : "The posters"}
              </p>
            </div>
            <h2 className="mt-5 max-w-[26ch] font-[family-name:var(--font-inter)] text-[clamp(1.8rem,3.6vw+0.5rem,3.2rem)] font-light leading-[1.06] tracking-[-0.025em] text-[color:var(--color-sepia)]">
              {it
                ? "Una compagnia si racconta anche dai suoi manifesti."
                : "A company is also the posters it leaves behind."}
            </h2>
          </div>
        </div>

        {/* Asymmetric grid — most recent is the largest */}
        <div className="mt-12 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
          {/* Hero poster — large */}
          <PosterCard poster={POSTERS[0]} large />

          {/* Stack of 2 right side */}
          <div className="contents md:col-span-5 md:flex md:flex-col md:gap-6">
            <PosterCard poster={POSTERS[1]} />
            <PosterCard poster={POSTERS[2]} />
          </div>

          {/* Bottom row — 2 smaller */}
          <PosterCard poster={POSTERS[3]} className="md:col-span-6" />
          <PosterCard poster={POSTERS[4]} className="md:col-span-6" />
        </div>
      </div>
    </section>
  );
}

function PosterCard({
  poster,
  large = false,
  className = "",
}: {
  poster: Poster;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/teatro/${poster.slug}`}
      className={`group block ${
        large ? "md:col-span-7 md:row-span-2" : ""
      } ${className}`}
    >
      <ImgReveal
        from="bottom"
        parallax={false}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-cielo)] shadow-[0_18px_40px_rgba(15,42,74,0.10)] md:aspect-[4/5]"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={poster.image}
            alt={`${poster.title} — locandina`}
            fill
            sizes={large ? "(min-width: 768px) 60vw, 90vw" : "(min-width: 768px) 35vw, 90vw"}
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.03]"
          />
        </motion.div>
      </ImgReveal>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="font-[family-name:var(--font-inter)] text-[0.96rem] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-notte)]">
          {poster.title}
        </p>
        <span className="font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]">
          {poster.year}
        </span>
      </div>
    </Link>
  );
}
