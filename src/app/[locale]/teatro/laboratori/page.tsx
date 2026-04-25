import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { workshops } from "@/content/events";
import { siteConfig, type Locale } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "workshops" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/teatro/laboratori`,
      languages: {
        en: `${siteConfig.url}/en/teatro/laboratori`,
        it: `${siteConfig.url}/it/teatro/laboratori`,
      },
    },
  };
}

export default async function LaboratoriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "workshops" });
  const tT = await getTranslations({ locale, namespace: "teatro" });
  const loc = locale as Locale;

  return (
    <>
      <section className="container-site pt-10 md:pt-14">
        <Link
          href="/teatro"
          className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {tT("eyebrow")}
        </Link>
      </section>

      <section className="container-site pt-10 pb-12 md:pt-14 md:pb-16">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-[18ch] display-mixed text-[clamp(2.5rem,6vw+1rem,7rem)] leading-[0.96]">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-10 max-w-[60ch] text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
            {t("lead")}
          </p>
        </FadeIn>
      </section>

      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-24">
        <Stagger className="grid gap-10 md:grid-cols-3 md:gap-12">
          {workshops.map((w) => (
            <StaggerItem key={w.slug}>
              <article>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[color:var(--color-sepia)]/5">
                  <Image
                    src={w.poster ?? w.cover}
                    alt={w.title[loc]}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5">
                  <p className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                    {w.year}
                    {w.venues ? ` · ${w.venues.join(" · ")}` : ""}
                  </p>
                  <h3 className="mt-2 bodoni-italic text-[1.5rem] leading-[1.05] text-[color:var(--color-sepia)]">
                    {w.title[loc]}
                  </h3>
                  <p className="mt-2 text-[0.95rem] italic text-[color:var(--color-sepia-soft)]">
                    {w.tagline[loc]}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
