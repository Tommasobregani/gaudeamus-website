import type { CSSProperties } from "react";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";
import { Spotlight } from "@/components/sections/Spotlight";
import { ProgrammeStrip } from "@/components/sections/ProgrammeStrip";
import { Impact } from "@/components/sections/Impact";
import { PressRibbon } from "@/components/sections/PressRibbon";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const copy =
    locale === "it"
      ? {
          section: "Comunità solidale",
          title: "Arte condivisa, sostegno reale.",
          openingTitle: "Insieme, il palcoscenico diventa aiuto concreto.",
          openingText:
            "Ogni spettacolo, laboratorio e raccolta fondi rafforza la nostra comunità artistica e sostiene chi ha più bisogno.",
          text:
            "Manteniamo la stessa energia teatrale di Gaudeamus, con un accento più comunitario: laboratori aperti, eventi benefit e collaborazioni locali per sostenere progetti culturali e sociali.",
          ctaPrimary: "Dona ora",
          ctaSecondary: "Diventa volontario",
        }
      : {
          section: "Community for charity",
          title: "Shared art, real support.",
          openingTitle: "Together, the stage becomes real support.",
          openingText:
            "Every show, workshop, and fundraiser strengthens our creative community and helps people who need it most.",
          text:
            "We keep the same Gaudeamus stage spirit with a stronger community focus: open workshops, benefit events, and local collaborations to support cultural and social causes.",
          ctaPrimary: "Donate now",
          ctaSecondary: "Become a volunteer",
        };

  const charityPalette = {
    "--color-accent": "#2d8a74",
    "--color-accent-secondary": "#2f5ea8",
    "--color-pompeiano": "#2d8a74",
    "--color-pompeiano-deep": "#1f6858",
    "--color-terracotta": "#d47b5f",
    "--color-notte": "#2f5ea8",
    "--color-carta": "#f7fbf8",
    "--color-travertino": "#eaf4ef",
    "--color-carta-soft": "#dceee4",
  } as CSSProperties;

  return (
    <div className="relative overflow-hidden" style={charityPalette}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 10% 15%, #8ccbb8 0, transparent 42%), radial-gradient(circle at 84% 20%, #8aa8dd 0, transparent 38%), radial-gradient(circle at 55% 80%, #e9a98d 0, transparent 44%)",
        }}
      />

      <JsonLd data={organizationJsonLd(locale as "en" | "it")} />
      <JsonLd data={websiteJsonLd(locale as "en" | "it")} />

      <ScrollStage palette="travertino">
        <section className="relative min-h-[78vh] overflow-hidden border-b border-[color:var(--color-border)]">
          <Image
            src="/events/christmas-party/christmas-party-04.jpg"
            alt="Gaudeamus community event"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/65" />
          <div className="relative container-site flex min-h-[78vh] items-end py-16 md:py-24">
            <div className="max-w-[62ch] text-white">
              <p className="cartel-sm mb-4 text-white/80">{copy.section}</p>
              <h1 className="max-w-[18ch] text-[clamp(2.5rem,6.7vw,6rem)] leading-[0.94]">
                {copy.openingTitle}
              </h1>
              <p className="mt-5 max-w-[56ch] text-[1.06rem] leading-relaxed text-white/90 md:text-[1.2rem]">
                {copy.openingText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/sostienici" variant="primary">
                  {copy.ctaPrimary}
                </ButtonLink>
                <ButtonLink href="/contatti" variant="outline">
                  {copy.ctaSecondary}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </ScrollStage>

      <section className="relative border-y border-[color:var(--color-border)] bg-[color:var(--color-carta)] py-16 md:py-20">
        <div className="container-site grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="cartel-sm mb-5 text-[color:var(--color-notte)]">{copy.section}</p>
            <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,4rem)] leading-[0.96] text-[color:var(--color-sepia)]">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg text-[color:var(--color-sepia-soft)]">{copy.text}</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/sostienici" variant="primary">
                {copy.ctaPrimary}
              </ButtonLink>
              <ButtonLink href="/contatti" variant="outline">
                {copy.ctaSecondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Spotlight />

      <ScrollStage palette="notte">
        <ProgrammeStrip />
      </ScrollStage>

      <ScrollStage palette="travertino">
        <Impact />
      </ScrollStage>

      <ScrollStage palette="carta">
        <PressRibbon />
      </ScrollStage>

      <ScrollStage palette="pompeiano">
        <ClosingCTA />
      </ScrollStage>
    </div>
  );
}
