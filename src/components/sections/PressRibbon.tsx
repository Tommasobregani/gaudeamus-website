"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { press } from "@/content/press";
import type { Locale } from "@/lib/utils";

/**
 * PressRibbon — three press quotes that cycle every 6.5s.
 * Big ochre opening quote, hairline before the outlet name.
 * The cycling shows we're covered by multiple outlets, not by one.
 */

const FEATURED_URLS = [
  "/press/scda-article.pdf",
  "https://londononeradio.com/teatro-italiano-in-scozia-trionfo-per-poor-piero-della-compagnia-gaudeamus/",
  "https://www.complitaly.uk/notizie/gaudeamus-porta-la-scena-italiana-nel-regno-unito",
];

export function PressRibbon() {
  const locale = useLocale() as Locale;
  const items = FEATURED_URLS
    .map((url) => press.find((p) => p.url === url))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.quote));

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const current = items[idx];

  return (
    <section className="container-site py-20 md:py-28">
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-2">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
                {locale === "it" ? "Stampa" : "Press"}
              </p>
            </div>
          </FadeIn>
        </div>

        <blockquote className="relative md:col-span-10">
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
            className="pointer-events-none absolute -top-8 -left-2 select-none font-[family-name:var(--font-inter)] text-[clamp(5rem,12vw,10rem)] font-light leading-[0.7] text-[color:var(--color-ocra)] md:-left-6"
          >
            “
          </motion.span>

          <div className="relative min-h-[140px] md:min-h-[180px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.url}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
                className="font-[family-name:var(--font-inter)] text-[clamp(1.5rem,2.4vw+0.8rem,2.6rem)] font-light leading-[1.22] tracking-[-0.018em] text-[color:var(--color-sepia)]"
              >
                {current.quote![locale]}
                <span className="text-[color:var(--color-cielo-deep)]">”</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <FadeIn delay={0.1}>
            <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
              <span aria-hidden className="inline-block h-px w-10 bg-[color:var(--color-ocra)]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.url + "-meta"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  {current.outlet}
                  {current.date ? ` · ${current.date.slice(0, 4)}` : ""}
                </motion.span>
              </AnimatePresence>

              {/* Indicators — quiet, ochre on active */}
              <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {items.map((it, i) => (
                    <button
                      key={it.url}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={`Quote ${i + 1}`}
                      aria-current={i === idx ? "true" : undefined}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === idx
                          ? "w-6 bg-[color:var(--color-ocra)]"
                          : "w-1.5 bg-[color:var(--color-sepia)]/20 hover:bg-[color:var(--color-sepia)]/40"
                      }`}
                    />
                  ))}
                </div>
                <Link
                  href="/teatro/recensioni"
                  className="group inline-flex items-center gap-1.5 text-[color:var(--color-notte)]"
                >
                  <span className="relative">
                    {locale === "it" ? "Tutta la rassegna" : "All press"}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:origin-left group-hover:scale-x-100"
                    />
                  </span>
                  <ArrowUpRight size={13} strokeWidth={1.6} />
                </Link>
              </div>
            </footer>
          </FadeIn>
        </blockquote>
      </div>
    </section>
  );
}
