"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { Marquee } from "@/components/brand/Marquee";

export function Manifesto() {
  const t = useTranslations("home");

  return (
    <>
      {/* Italian-keyword frieze */}
      <Marquee
        words={[
          "teatro",
          "lingua",
          "comunità",
          "patrimonio",
          "memoria",
          "passione",
          "radici",
          "scena",
          "racconto",
        ]}
      />

      <section className="relative py-24 md:py-36">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <RomanEyebrow n={1} label={t("manifestoEyebrow")} />
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <p className="bodoni-italic text-[clamp(2.25rem,4vw+1rem,4rem)] leading-[1.04] text-[color:var(--color-sepia)]">
                {t("manifestoTitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-10 max-w-[58ch] text-[1.125rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("manifestoBody")}
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-12">
                <Fregio width={260} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
