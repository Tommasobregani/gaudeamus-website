import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { ProgrammeStrip } from "@/components/sections/ProgrammeStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";
import { articles } from "@/content/news";
import { NewsStrip } from "@/components/sections/NewsStrip";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  // News section is only shown if there are real articles to show.
  const showNews = articles.length > 0;

  return (
    <>
      <JsonLd data={organizationJsonLd(locale as "en" | "it")} />
      <JsonLd data={websiteJsonLd(locale as "en" | "it")} />

      <ScrollStage palette="travertino">
        <Hero />
      </ScrollStage>

      <ScrollStage palette="notte">
        <ProgrammeStrip />
      </ScrollStage>

      <ScrollStage palette="travertino">
        <FeaturedProjects />
      </ScrollStage>

      {showNews ? (
        <ScrollStage palette="sepia">
          <NewsStrip />
        </ScrollStage>
      ) : null}

      <ScrollStage palette="travertino">
        <NewsletterCTA />
      </ScrollStage>

      <ScrollStage palette="terracotta">
        <ClosingCTA />
      </ScrollStage>
    </>
  );
}
