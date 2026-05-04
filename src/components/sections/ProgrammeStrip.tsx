"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/utils";

export function ProgrammeStrip() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  const items = [
    {
      key: "teatro",
      href: "/teatro",
      label: locale === "it" ? "Teatro" : "Theatre",
      title:
        locale === "it"
          ? "Produzioni in italiano con sottotitoli live."
          : "Productions in Italian, with live English subtitles.",
      image: "/events/poor-piero/poor-piero-04.jpeg",
    },
    {
      key: "eventi",
      href: "/eventi",
      label: locale === "it" ? "Eventi" : "Events",
      title:
        locale === "it"
          ? "Aperitivi letterari, feste di Natale, comunità."
          : "Literary aperitivos, Christmas parties, community.",
      image: "/events/christmas-party/christmas-party-07.jpg",
    },
    {
      key: "workshop",
      href: "/teatro/laboratori",
      label: locale === "it" ? "Laboratori" : "Workshops",
      title:
        locale === "it"
          ? "Teatro e lingua italiana, in pratica, in tutta la Scozia."
          : "Theatre and the Italian language, hands on, across Scotland.",
      image: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    },
  ];

  return (
    <section className="container-site py-20 md:py-28 text-[color:var(--color-travertino)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
            {t("manifestoEyebrow")}
          </p>
          <h2 className="mt-6 max-w-[24ch] bodoni-italic text-[clamp(2.25rem,4.5vw+1rem,4rem)] leading-[1.05]">
            {t("manifestoTitle")}
          </h2>
        </FadeIn>
      </div>
      <Stagger className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
        {items.map((it, i) => (
          <StaggerItem key={it.key}>
            <Link href={it.href} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-sepia)]">
                <Image
                  src={it.image}
                  alt={it.label}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[color:var(--color-sepia)]/65 via-[color:var(--color-sepia)]/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-[color:var(--color-travertino)]">
                  <span className="font-[family-name:var(--font-cartel)] text-[0.82rem] uppercase tracking-[0.28em]">
                    {String(i + 1).padStart(2, "0")} · {it.label}
                  </span>
                  <ArrowUpRight size={20} strokeWidth={1.25} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
              <h3 className="mt-5 max-w-[28ch] font-[family-name:var(--font-display)] font-medium text-[1.45rem] leading-[1.25] tracking-[-0.018em] text-[color:var(--color-travertino)]">
                {it.title}
              </h3>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
