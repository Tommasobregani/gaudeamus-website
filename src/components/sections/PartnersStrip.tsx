"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/lib/utils";

// Canonical partner set agreed with the charity (June 2026 review):
// London One Radio · Italian Scotland · Valvona & Crolla · Com.It.Es ·
// Consolato Generale d'Italia, Edimburgo · Istituto Italiano di Cultura (TBC).
// Consolato Onorario di Aberdeen removed.
const PARTNERS = [
  {
    src: "/partners/london-one-radio.jpg",
    alt: "London One Radio",
    width: 220,
    height: 90,
  },
  {
    src: "/partners/italian-scotland.jpg",
    alt: "Italian Scotland",
    width: 220,
    height: 90,
  },
  {
    src: "/partners/valvona-crolla.png",
    alt: "Valvona & Crolla, Edinburgh",
    width: 220,
    height: 90,
  },
  {
    src: "/partners/comites.png",
    alt: "Com.It.Es. Scotland & Northern Ireland",
    width: 220,
    height: 90,
  },
  {
    src: "/partners/maeci-consolato-edinburgh.png",
    alt: "Consulate General of Italy, Edinburgh",
    width: 220,
    height: 90,
  },
  // Istituto Italiano di Cultura, Edimburgo — TBC, will be re-enabled once confirmed.
  // {
  //   src: "/partners/istituto-cultura-edinburgh.png",
  //   alt: "Istituto Italiano di Cultura, Edinburgh",
  //   width: 220,
  //   height: 90,
  // },
] as const;

export function PartnersStrip() {
  const locale = useLocale() as Locale;
  const heading = locale === "it" ? "In collaborazione con" : "In partnership with";

  return (
    <section className="container-site py-14 md:py-18">
      <h2 className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.3em] text-[color:var(--color-sepia-soft)]">
        {heading}
      </h2>
      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-6 md:gap-x-10">
        {PARTNERS.map((partner) => (
          <div
            key={partner.src}
            className="group flex min-h-[56px] items-center"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={partner.width}
              height={partner.height}
              className="h-auto max-h-[56px] w-auto object-contain grayscale transition duration-300 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

