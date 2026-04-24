"use client";

import { useLocale } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { Fregio, Asterism } from "@/components/brand/Fregio";
import type { Locale } from "@/lib/utils";

/**
 * A small Italian interstitial — "Dalla Scozia, con passione italiana."
 * Sits between the hero and the manifesto. Breathes, signals the bond.
 */
export function ItalianInterstitial() {
  const locale = useLocale() as Locale;
  return (
    <section className="container-site border-t border-[color:var(--color-sepia)]/15 py-16 md:py-24">
      <FadeIn>
        <div className="flex flex-col items-center gap-6 text-center">
          <Fregio width={200} tone="terracotta" />
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
            {locale === "it" ? "IL LEGAME" : "THE BOND"}
          </p>
          <h2 className="bodoni-italic text-[clamp(2rem,4vw+1rem,4rem)] leading-[1.08] text-[color:var(--color-sepia)]">
            {locale === "it" ? (
              <>
                Dalla Scozia, <br className="md:hidden" />
                <span className="text-[color:var(--color-terracotta)]">con passione italiana.</span>
              </>
            ) : (
              <>
                From Scotland, <br className="md:hidden" />
                <span className="text-[color:var(--color-terracotta)]">with italian passion.</span>
              </>
            )}
          </h2>
          <div className="flex items-center gap-4 text-[color:var(--color-sepia-soft)]">
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.28em]">
              ABERDEEN
            </span>
            <Asterism tone="terracotta" />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.28em]">
              GLASGOW
            </span>
            <Asterism tone="terracotta" />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.28em]">
              EDIMBURGO
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
