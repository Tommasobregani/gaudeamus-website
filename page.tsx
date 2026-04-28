import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Spotlight } from "@/components/sections/Spotlight";
import { ProgrammeStrip } from "@/components/sections/ProgrammeStrip";
import { Impact } from "@/components/sections/Impact";
import { PressRibbon } from "@/components/sections/PressRibbon";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";

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
    </>
  );
}
