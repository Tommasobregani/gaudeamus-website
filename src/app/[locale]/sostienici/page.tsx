import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/Button";
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
  const t = await getTranslations({ locale, namespace: "support" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/sostienici`,
      languages: {
        en: `${siteConfig.url}/en/sostienici`,
        it: `${siteConfig.url}/it/sostienici`,
      },
    },
  };
}

export default async function SostieniciPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "support" });

  return (
    <>
      <section className="container-site pt-16 pb-10 md:pt-24 md:pb-14">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-[18ch] display-mixed text-[clamp(2.75rem,7vw+1rem,8rem)] leading-[0.96]">
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

      {/* Donate — bank transfer details */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                {t("donateTitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[40ch] text-[1.05rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("donateBody")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <div className="border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] p-6 md:p-8">
                <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)]">
                  {t("bankTitle")}
                </p>
                <dl className="mt-6 space-y-4 font-[family-name:var(--font-mono)] text-[0.92rem]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <dt className="text-[color:var(--color-sepia-soft)]">{t("bankAccountHolder")}</dt>
                    <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.accountHolder}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <dt className="text-[color:var(--color-sepia-soft)]">{t("bankName")}</dt>
                    <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.name}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <dt className="text-[color:var(--color-sepia-soft)]">{t("bankAccountNumber")}</dt>
                    <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.accountNumber}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <dt className="text-[color:var(--color-sepia-soft)]">{t("bankSortCode")}</dt>
                    <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.sortCode}</dd>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <dt className="text-[color:var(--color-sepia-soft)]">{t("bankReference")}</dt>
                    <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.reference}</dd>
                  </div>
                </dl>
                <p className="mt-6 border-t border-[color:var(--color-sepia)]/20 pt-5 text-[0.88rem] italic text-[color:var(--color-sepia-soft)]">
                  {t("bankNote")}{" "}
                  <a
                    className="hover-underline text-[color:var(--color-sepia)]"
                    href={`mailto:${siteConfig.email.finance}`}
                  >
                    {siteConfig.email.finance}
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gift Aid */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                  {t("giftAidTitle")}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-6 max-w-[24ch] bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] leading-[1.1] text-[color:var(--color-sepia)]">
                  {t("giftAidBody")}
                </h2>
              </FadeIn>
            </div>
            <div className="md:col-span-5 md:flex md:justify-end">
              <FadeIn delay={0.15}>
                <ButtonLink href="/sostienici/gift-aid" variant="primary" withArrow>
                  {t("giftAidCta")}
                </ButtonLink>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer + share */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("volunteerTitle")}
            </p>
            <p className="mt-6 max-w-[44ch] text-[1.02rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("volunteerBody")}
            </p>
            <Link
              href="/contatti"
              className="hover-underline mt-6 inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
            >
              {t("contactCta")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("shareTitle")}
            </p>
            <p className="mt-6 max-w-[44ch] text-[1.02rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("shareBody")}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
