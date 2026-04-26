"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { press } from "@/content/press";
import type { Locale } from "@/lib/utils";

/**
 * One-line press quote in the home flow — uses the SCDA Magazine
 * positioning quote, which is the company's strongest editorial
 * single-line claim ("the only theatre company in Scotland that
 * stages Italian works…").
 */
export function PressRibbon() {
  const locale = useLocale() as Locale;
  const featured = press.find((p) => p.url === "/press/scda-article.pdf");
  if (!featured || !featured.quote) return null;

  return (
    <section className="container-site py-16 md:py-20">
      <FadeIn>
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
              {locale === "it" ? "Stampa" : "Press"}
            </p>
          </div>
          <blockquote className="md:col-span-10">
            <p className="bodoni-italic text-[clamp(1.6rem,2.5vw+1rem,2.85rem)] leading-[1.2] text-[color:var(--color-sepia)]">
              “{featured.quote[locale]}”
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
              <span>— {featured.outlet}</span>
              {featured.date ? <span>· {featured.date.slice(0, 4)}</span> : null}
              <Link
                href="/teatro/recensioni"
                className="hover-underline ml-auto inline-flex items-center gap-1 text-[color:var(--color-accent)]"
              >
                {locale === "it" ? "Tutta la rassegna stampa" : "Full press"}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </Link>
            </footer>
          </blockquote>
        </div>
      </FadeIn>
    </section>
  );
}
