"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { EventEntry, EventKind } from "@/content/events";
import type { Locale } from "@/lib/utils";

function kindLabel(kind: EventKind, loc: Locale) {
  if (kind === "production") return loc === "it" ? "Produzione" : "Production";
  if (kind === "workshop") return loc === "it" ? "Laboratorio" : "Workshop";
  return loc === "it" ? "Comunità" : "Community";
}

export function Playbill({ event, index }: { event: EventEntry; index?: number }) {
  const locale = useLocale() as Locale;
  const roman = String((index ?? 0) + 1).padStart(2, "0");
  const presenta = locale === "it" ? "presenta" : "presents";
  // Prefer the locandina (poster) for the card visual; fall back to the stage
  // photo (cover); if neither exists yet, skip the image block entirely so
  // we don't render an empty terracotta rectangle.
  const image = event.poster || event.cover || "";

  return (
    <Link
      href={`/teatro/${event.slug}`}
      className="group block border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] transition-colors hover:bg-[color:var(--color-travertino)]"
    >
      {/* Playbill header */}
      <header className="border-b border-[color:var(--color-sepia)] px-5 pt-5 pb-4 text-center">
        <p className="font-[family-name:var(--font-cartel)] text-[0.68rem] leading-none tracking-[0.32em] text-[color:var(--color-sepia)]">
          Compagnia Gaudeamus
        </p>
        <p className="mt-2 font-[family-name:var(--font-body)] italic text-[0.88rem] text-[color:var(--color-sepia-soft)]">
          {presenta}
        </p>
      </header>

      {/* Title area */}
      <div className="relative px-5 pt-7 pb-6 text-center">
        {typeof index === "number" && (
          <span className="bodoni-italic text-[1.35rem] leading-none text-[color:var(--color-accent)]">
            {roman}
          </span>
        )}
        <h3 className="mt-3 bodoni-italic text-[clamp(2rem,3vw+1rem,2.75rem)] leading-[0.98] text-[color:var(--color-sepia)]">
          {event.title[locale]}
        </h3>
        <p className="mx-auto mt-4 max-w-[28ch] font-[family-name:var(--font-body)] italic text-[0.95rem] leading-[1.4] text-[color:var(--color-sepia-soft)]">
          {event.tagline[locale]}
        </p>
      </div>

      {/* Stamp row */}
      <div className="flex items-center justify-between gap-3 border-y border-[color:var(--color-sepia)] px-5 py-3 text-[0.68rem]">
        <span className="font-[family-name:var(--font-cartel)] tracking-[0.28em] text-[color:var(--color-sepia)]">
          {kindLabel(event.kind, locale).toUpperCase()}
        </span>
        <span className="font-[family-name:var(--font-mono)] tracking-[0.2em] text-[color:var(--color-sepia)]">
          {event.year}
        </span>
      </div>

      {/* Hero image — only if we actually have a poster or cover */}
      {image ? (
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/10">
          <Image
            src={image}
            alt={event.title[locale]}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.04]"
          />
        </div>
      ) : null}

      {/* Footer CTA */}
      <footer className="flex items-center justify-between border-t border-[color:var(--color-sepia)] px-5 py-3">
        <span className="font-[family-name:var(--font-cartel)] text-[0.68rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
          {locale === "it" ? "Vedi la scheda" : "See the programme"}
        </span>
        <ArrowUpRight
          size={18}
          strokeWidth={1.25}
          className="text-[color:var(--color-accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </footer>
    </Link>
  );
}
