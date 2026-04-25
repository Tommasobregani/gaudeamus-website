import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { NewsStrip } from "@/components/sections/NewsStrip";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
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

      <ScrollStage palette="carta">
        <Manifesto />
      </ScrollStage>

      <ScrollStage palette="travertino">
        <FeaturedProjects />
      </ScrollStage>

      <ScrollStage palette="sepia">
        <NewsStrip />
      </ScrollStage>

      <ScrollStage palette="travertino">
        <NewsletterCTA />
      </ScrollStage>

      <ScrollStage palette="terracotta">
        <ClosingCTA />
      </ScrollStage>
    </>
  );
}
