"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ImgReveal } from "@/components/motion/ImgReveal";
import type { Locale } from "@/lib/utils";

type Item = {
  slug: string;
  title: string;
  year: string;
  image: string;
  position?: string;
};

const ITEMS: Item[] = [
  {
    slug: "poor-piero",
    title: "Poor Piero",
    year: "2025",
    image: "/events/poor-piero/poor-piero-04.jpeg",
    position: "center 30%",
  },
  {
    slug: "no-shakespeare-fringe",
    title: "No Shakespeare · Fringe",
    year: "2024",
    image: "/events/no-shakespeare/no-shakespeare-04.jpg",
    position: "center 25%",
  },
  {
    slug: "no-shakespeare",
    title: "No Shakespeare",
    year: "2023",
    image: "/events/no-shakespeare/no-shakespeare-08.jpg",
    position: "center 35%",
  },
  {
    slug: "wander-fool-word",
    title: "Wander, Fool, Word",
    year: "2024",
    image: "/events/wander-fool-word/wander-fool-word-05.jpg",
    position: "center 30%",
  },
  {
    slug: "viaggio-lingua",
    title: "Viaggio in lingua",
    year: "2024",
    image: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    position: "center 40%",
  },
];

/**
 * WorkArchive — proper carousel.
 *  • Native horizontal scroll with snap (works for keyboard, touch, trackpad).
 *  • Prev / Next buttons increment by one card width.
 *  • Position indicator shows current / total.
 *  • Edge fade marks more content off-screen.
 */
export function WorkArchive() {
  const locale = useLocale() as Locale;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardW = card.getBoundingClientRect().width + 24; // gap-6 ≈ 24px
    const idx = Math.round(el.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(ITEMS.length - 1, idx)));
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goto = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const cardW = card.getBoundingClientRect().width + 24;
    el.scrollTo({ left: i * cardW, behavior: "smooth" });
  }, []);

  // Keyboard navigation — left / right while focus is anywhere on the carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = trackRef.current;
      if (!el) return;
      const focusedInside = el.contains(document.activeElement);
      if (!focusedInside) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goto(Math.min(ITEMS.length - 1, active + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goto(Math.max(0, active - 1));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, goto]);

  const prev = () => goto(Math.max(0, active - 1));
  const next = () => goto(Math.min(ITEMS.length - 1, active + 1));

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Header */}
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
              {locale === "it" ? "Selezione" : "Selected work"}
            </p>
            <h2 className="mt-5 max-w-[26ch] font-[family-name:var(--font-inter)] text-[clamp(1.8rem,3.6vw+0.5rem,3.2rem)] font-light leading-[1.06] tracking-[-0.025em] text-[color:var(--color-sepia)]">
              {locale === "it"
                ? "Tre anni di teatro italiano. Dall'archivio."
                : "Three years of Italian theatre. From the archive."}
            </h2>
          </div>

          <div className="flex items-end gap-6">
            <Link
              href="/teatro"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[color:var(--color-notte)]"
            >
              <span className="relative">
                {locale === "it" ? "Tutto il teatro" : "All productions"}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
              <ArrowUpRight size={14} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mt-12 md:mt-16">
        {/* Edge fade — both viewports */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent md:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent md:w-16"
        />

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 pl-[clamp(1.25rem,4vw,2.75rem)] pr-[clamp(1.25rem,4vw,2.75rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((item, i) => (
            <Link
              key={item.slug}
              href={`/teatro/${item.slug}`}
              className="group relative block w-[78vw] shrink-0 snap-start sm:w-[58vw] md:w-[clamp(320px,28vw,420px)]"
              aria-current={i === active ? "true" : undefined}
            >
              <ImgReveal
                from="bottom"
                parallax={false}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-cielo)] shadow-[0_18px_40px_rgba(15,42,74,0.12)]"
              >
                <motion.div
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1.04 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.05,
                    ease: [0.2, 0.7, 0.1, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 58vw, 78vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.05]"
                    style={{ objectPosition: item.position ?? "center" }}
                  />
                </motion.div>
              </ImgReveal>

              {/* Caption below */}
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <p className="font-[family-name:var(--font-inter)] text-[1.02rem] font-medium leading-[1.2] tracking-[-0.005em] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-notte)]">
                  {item.title}
                </p>
                <span className="font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.18em] text-[color:var(--color-muted)]">
                  {item.year}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Controls — aligned to the same edge as the cards */}
        <div className="mt-8 flex items-center justify-between gap-4 px-[clamp(1.25rem,4vw,2.75rem)] md:mt-10">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-ocra)]" />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tabular-nums tracking-[0.18em] text-[color:var(--color-notte)]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-16 bg-[color:var(--color-sepia)]/15" />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tabular-nums tracking-[0.18em] text-[color:var(--color-muted)]">
              {String(ITEMS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              aria-label={locale === "it" ? "Precedente" : "Previous"}
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-sepia)]/15 text-[color:var(--color-notte)] transition-all duration-300 hover:bg-[color:var(--color-notte)] hover:text-white hover:border-[color:var(--color-notte)] hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              aria-label={locale === "it" ? "Successivo" : "Next"}
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-sepia)]/15 text-[color:var(--color-notte)] transition-all duration-300 hover:bg-[color:var(--color-notte)] hover:text-white hover:border-[color:var(--color-notte)] hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
