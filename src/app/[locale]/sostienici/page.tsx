import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GiftAidModalButton } from "@/components/forms/GiftAidModalButton";
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
  const hasBankDetails = Boolean(
    siteConfig.bank.accountNumber && siteConfig.bank.sortCode,
  );

  const where = [
    {
      key: "Productions",
      title: t("whereProductions"),
      body: t("whereProductionsBody"),
      image: "/events/poor-piero/poor-piero-04.jpeg",
    },
    {
      key: "Workshops",
      title: t("whereWorkshops"),
      body: t("whereWorkshopsBody"),
      image: "/events/viaggio-lingua/viaggio-lingua-01.jpg",
    },
    {
      key: "Community",
      title: t("whereCommunity"),
      body: t("whereCommunityBody"),
      image: "/events/christmas-party/christmas-party-07.jpg",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        meta={t("heroMeta")}
        image="/events/christmas-party/christmas-party-07.jpg"
        imageAlt="Gaudeamus community Christmas Party, Aberdeen"
        imagePosition="center 30%"
      />

      {/* Where your money goes — deep-blue panel after the red hero */}
      <section className="mt-0 bg-[color:var(--color-notte)] py-20 text-[color:var(--color-travertino)] md:py-28">
        <div className="container-site">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
              {t("whereTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {where.map((w, i) => (
              <StaggerItem key={w.key}>
                <article>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-sepia)]">
                    <Image
                      src={w.image}
                      alt={w.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] font-medium text-[1.4rem] leading-[1.22] tracking-[-0.018em]">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.6] opacity-90">
                    {w.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gift Aid - simplified per Eva: no detailed explanation, just the action */}
      <section className="relative mt-24 border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site grid items-center gap-10 py-16 md:grid-cols-12 md:gap-14 md:py-20">
          <div className="md:col-span-7">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
                {t("giftAidTitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 max-w-[26ch] font-[family-name:var(--font-display)] font-medium text-[clamp(1.65rem,2.4vw+0.8rem,2.4rem)] leading-[1.18] tracking-[-0.02em] text-[color:var(--color-sepia)]">
                {t("giftAidBody")}
              </h2>
            </FadeIn>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <FadeIn delay={0.15}>
              <GiftAidModalButton ctaLabel={t("giftAidCta")} size="lg" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Donate / bank transfer */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
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
              {hasBankDetails ? (
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
                    <Link
                      className="hover-underline text-[color:var(--color-sepia)]"
                      href="/contatti"
                    >
                      {locale === "it" ? "Contattaci" : "Get in touch"}
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[color:var(--color-sepia)]/30 bg-[color:var(--color-carta)] p-6 md:p-8">
                  <p className="bodoni-italic text-[clamp(1.25rem,1.6vw+0.5rem,1.6rem)] leading-[1.3] text-[color:var(--color-sepia)]">
                    {t("bankPending")}
                  </p>
                  <Link
                    className="hover-underline mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-accent)]"
                    href="/contatti"
                  >
                    {locale === "it" ? "Contattaci" : "Get in touch"}
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Volunteer + share */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
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
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
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
