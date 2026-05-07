import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Voice } from "@/components/sections/Voice";
import { ProgrammeStrip } from "@/components/sections/ProgrammeStrip";
import { Spotlight } from "@/components/sections/Spotlight";
import { Impact } from "@/components/sections/Impact";
import { PressRibbon } from "@/components/sections/PressRibbon";
import { DonateStory } from "@/components/sections/DonateStory";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";

/**
 * Homepage flow (8 sections):
 *   Hero          — what we are, where, the next show, SCDA differentiator
 *   SelectedWork  — stills + posters, single carousel with toggle
 *   Voice         — signed manifesto from the artistic director
 *   Spotlight     — the next production, full bleed
 *   Impact        — three editorial sentences
 *   PressRibbon   — external validation
 *   DonateStory   — emotional ask + £25/£50/£100/£500 tiers
 *   ClosingCTA    — trust chips + newsletter + partners + Donate
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={organizationJsonLd(locale as "en" | "it")} />
      <JsonLd data={websiteJsonLd(locale as "en" | "it")} />

      <ScrollStage palette="travertino">
        <Hero />
      </ScrollStage>

      <ScrollStage palette="carta">
        <SelectedWork />
      </ScrollStage>

      <ScrollStage palette="carta">
        <Voice />
      </ScrollStage>

      <ScrollStage palette="travertino">
        <ProgrammeStrip />
      </ScrollStage>

      <Spotlight />

      <ScrollStage palette="travertino">
        <Impact />
      </ScrollStage>

      <ScrollStage palette="carta">
        <PressRibbon />
      </ScrollStage>

      <ScrollStage palette="carta">
        <DonateStory />
      </ScrollStage>

      <ClosingCTA />
    </>
  );
}
