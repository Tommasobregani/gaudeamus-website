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

      {/* Welcome masthead — paper, warm narrative */}
      <section className="relative">
        <div className="container-site border-b border-[color:var(--color-sepia)]/15 py-3 font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-muted)]">
          {t("stamp")}
        </div>
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
              {t("eyebrow")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 max-w-[16ch] bodoni-italic text-[clamp(2.6rem,7vw+1rem,6.5rem)] leading-[0.94] text-[color:var(--color-sepia)]">
              {t("title")}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-12 grid items-end gap-10 md:grid-cols-12 md:gap-14">
              <p className="md:col-span-7 max-w-[60ch] text-[1.1rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                {t("lead")}
              </p>
              <p className="md:col-span-4 md:col-start-9 font-[family-name:var(--font-mono)] text-[0.74rem] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {t("heroMeta")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* History */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
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

      {/* Mission — Pompeii-red panel for emotional weight */}
      <section className="bg-[color:var(--color-pompeiano)] py-20 text-[color:var(--color-travertino)] md:py-28">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
                {t("missionTitle")}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8 space-y-8">
            <FadeIn delay={0.1}>
              <p className="bodoni-italic text-[clamp(1.6rem,2.4vw+0.8rem,2.5rem)] leading-[1.2]">
                {t("missionBody")}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-[64ch] text-[1.05rem] leading-[1.7] opacity-90">
                {t("missionExtra1")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-[64ch] text-[1.05rem] leading-[1.7] opacity-90">
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
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
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
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("staffTitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-[64ch] text-[1rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
            {t("staffBody")}
          </p>
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((p) => {
            const initials = p.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            return (
              <StaggerItem key={p.name}>
                <article className="flex items-start gap-5 border border-[color:var(--color-sepia)]/15 bg-[color:var(--color-carta)] p-6 transition-colors hover:bg-[color:var(--color-travertino)]">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-[color:var(--color-notte)] font-[family-name:var(--font-cartel)] text-[1.05rem] tracking-[0.18em] text-[color:var(--color-travertino)]">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="bodoni-italic text-[1.5rem] leading-[1.1] text-[color:var(--color-sepia)]">
                      {p.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                      {p.role[loc]}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Partners */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-20">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
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
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
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
