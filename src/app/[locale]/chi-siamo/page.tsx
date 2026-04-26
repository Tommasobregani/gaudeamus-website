import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { staff } from "@/content/staff";
import { siteConfig, type Locale } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema-org";

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
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/chi-siamo`,
      languages: {
        en: `${siteConfig.url}/en/chi-siamo`,
        it: `${siteConfig.url}/it/chi-siamo`,
      },
    },
  };
}

export default async function ChiSiamoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = locale as Locale;

  const doing = [
    { key: "doingProductions", label: locale === "it" ? "Produzioni" : "Productions" },
    { key: "doingWorkshops", label: locale === "it" ? "Laboratori" : "Workshops" },
    { key: "doingEvents", label: locale === "it" ? "Eventi" : "Events" },
    { key: "doingCollaborations", label: locale === "it" ? "Collaborazioni" : "Collaborations" },
  ] as const;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/chi-siamo` },
        ])}
      />

      {/* Opening — title + lead with brand mark */}
      <section className="container-site pt-16 pb-20 md:pt-20 md:pb-28">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <div className="mt-8 grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <FadeIn delay={0.1} className="md:col-span-9">
            <h1 className="max-w-[18ch] display-mixed text-[clamp(2.75rem,7vw+1rem,8rem)] leading-[0.96]">
              {t("title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="md:col-span-3 md:flex md:justify-end">
            <Image
              src="/brand-mark.jpg"
              alt="Gaudeamus brand mark"
              width={220}
              height={220}
              priority
              className="h-32 w-32 rounded-full object-cover md:h-44 md:w-44"
            />
          </FadeIn>
        </div>
        <FadeIn delay={0.25}>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.15rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* History */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                  {t("historyTitle")}
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn delay={0.1}>
                <p className="text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                  {t("historyBody")}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-site py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
                {t("missionTitle")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8 space-y-8">
            <FadeIn delay={0.1}>
              <p className="bodoni-italic text-[clamp(1.6rem,2.4vw+0.8rem,2.5rem)] leading-[1.2] text-[color:var(--color-sepia)]">
                {t("missionBody")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-[64ch] text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                {t("missionExtra1")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-[64ch] text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                {t("missionExtra2")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("doingTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-0 md:grid-cols-2">
            {doing.map((d, i) => (
              <StaggerItem
                key={d.key}
                className={
                  "border-t border-[color:var(--color-sepia)]/25 p-6 md:p-8 " +
                  (i % 2 === 0 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
                }
              >
                <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia)]/70">
                  {d.label}
                </p>
                <p className="mt-4 text-[1.05rem] leading-[1.65] text-[color:var(--color-sepia)]">
                  {t(d.key)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section className="container-site py-20 md:py-28">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("staffTitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-[64ch] text-[1rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
            {t("staffBody")}
          </p>
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-1 gap-0 border-t-2 border-[color:var(--color-sepia)] sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((p, i) => (
            <StaggerItem key={p.name}>
              <article
                className={
                  "flex flex-col border-b border-[color:var(--color-sepia)]/25 p-6 lg:p-8 " +
                  (i % 2 === 0 ? "sm:border-r sm:border-r-[color:var(--color-sepia)]/25 " : "") +
                  "lg:border-r lg:border-r-[color:var(--color-sepia)]/25 lg:[&:nth-child(3n)]:border-r-0"
                }
              >
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.22em] text-[color:var(--color-sepia)]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 bodoni-italic text-[1.6rem] leading-[1.05] text-[color:var(--color-sepia)]">
                  {p.name}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-body)] text-[0.95rem] text-[color:var(--color-sepia-soft)]">
                  {p.role[loc]}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Partners */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-20">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("partnersTitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-[64ch] text-[1rem] leading-[1.75] text-[color:var(--color-sepia-soft)]">
              {t("partnersBody")}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-90">
              <Image
                src="/partners/comites.png"
                alt="Com.It.Es."
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/consolato-aberdeen.jpg"
                alt="Consolato Onorario di Aberdeen"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/maeci-consolato-edinburgh.png"
                alt="Consolato Generale d'Italia, Edimburgo"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/partners/london-one-radio.jpg"
                alt="London One Radio"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Join */}
      <section className="container-site py-20 md:py-28">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("joinTitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-[58ch] bodoni-italic text-[clamp(1.5rem,2.2vw+0.8rem,2.25rem)] leading-[1.25] text-[color:var(--color-sepia)]">
            {t("joinBody")}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
