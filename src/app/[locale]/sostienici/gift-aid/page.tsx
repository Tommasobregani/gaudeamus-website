import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { GiftAidForm } from "@/components/forms/GiftAidForm";
import { siteConfig } from "@/lib/utils";

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
  const t = await getTranslations({ locale, namespace: "giftAid" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/sostienici/gift-aid`,
      languages: {
        en: `${siteConfig.url}/en/sostienici/gift-aid`,
        it: `${siteConfig.url}/it/sostienici/gift-aid`,
      },
    },
  };
}

export default async function GiftAidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "giftAid" });
  const tS = await getTranslations({ locale, namespace: "support" });

  return (
    <>
      <section className="container-site pt-10 md:pt-14">
        <Link
          href="/sostienici"
          className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {tS("eyebrow")}
        </Link>
      </section>

      <section className="container-site pt-10 pb-12 md:pt-14 md:pb-16">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-[20ch] display-mixed text-[clamp(2.5rem,6vw+1rem,7rem)] leading-[0.96]">
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                {t("explainerTitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-[0.98rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                {t("explainerBody1")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                {t("explainerBody2")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                {t("formTitle")}
              </p>
              <div className="mt-8">
                <GiftAidForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
