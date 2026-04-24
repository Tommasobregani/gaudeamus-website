"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { EventEntry } from "@/content/events";
import type { Locale } from "@/lib/utils";

export function EventCard({ event, index }: { event: EventEntry; index?: number }) {
  const locale = useLocale() as Locale;
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][index ?? 0];

  return (
    <Link
      href={`/progetti/${event.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)]">
        <Image
          src={event.cover}
          alt={event.title[locale]}
          fill
          sizes="(min-width: 1024px) 32vw, 90vw"
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-sepia)]/55" />
        {typeof index === "number" && (
          <span className="pointer-events-none absolute left-4 top-3 bodoni-italic text-[2.25rem] leading-none text-[color:var(--color-travertino)]">
            {roman}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-[color:var(--color-travertino)]/40 px-4 py-3 text-[color:var(--color-travertino)]">
          <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.25em]">
            {event.kind.toUpperCase()}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.22em]">
            {event.year}
            {event.venues ? ` · ${event.venues[0]}` : ""}
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="bodoni-italic text-[1.75rem] leading-[1.05] text-[color:var(--color-sepia)]">
            {event.title[locale]}
          </h3>
          <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-[color:var(--color-sepia-soft)]">
            {event.tagline[locale]}
          </p>
        </div>
        <ArrowUpRight
          size={20}
          strokeWidth={1.25}
          className="mt-1 shrink-0 text-[color:var(--color-terracotta)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
