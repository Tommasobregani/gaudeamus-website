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
      image: "/events/poor-piero/poor-piero-09.jpeg",
      position: "center 30%",
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
      position: "center 40%",
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
      position: "center 35%",
    },
  ];

  return (
    <section className="container-site py-20 md:py-28 text-white">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <FadeIn>
          <p className="font-[family-name:var(--font-inter)] text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
            {t("manifestoEyebrow")}
          </p>
          <h2 className="mt-6 max-w-[24ch] font-[family-name:var(--font-inter)] font-light text-[clamp(2.1rem,4.4vw+0.5rem,3.8rem)] leading-[1.06] tracking-[-0.025em] text-white">
            {t("manifestoTitle")}
          </h2>
        </FadeIn>
      </div>
      <Stagger className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
        {items.map((it, i) => (
          <StaggerItem key={it.key}>
            <Link href={it.href} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-notte-deep)]">
                <Image
                  src={it.image}
                  alt={it.label}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ objectPosition: it.position }}
                />
              </div>

              {/* Caption below the photo — no overlays, no glass */}
              <div className="mt-5 flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-cielo)]">
                  {String(i + 1).padStart(2, "0")} · {it.label}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.6}
                  className="text-white/70 transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:rotate-45 group-hover:text-white"
                />
              </div>
              <h3 className="relative mt-3 inline-block max-w-[28ch] font-[family-name:var(--font-inter)] font-medium text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-white">
                {it.title}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--color-cielo)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-x-100"
                />
              </h3>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
