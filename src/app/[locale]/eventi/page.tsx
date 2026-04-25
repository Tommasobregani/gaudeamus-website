import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import {
  upcomingCommunityEvents,
  pastCommunityEvents,
} from "@/content/events";
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
  const t = await getTranslations({ locale, namespace: "events" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/eventi`,
      languages: {
        en: `${siteConfig.url}/en/eventi`,
        it: `${siteConfig.url}/it/eventi`,
      },
    },
  };
}

const monthNames = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  it: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
};

export default async function EventiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "events" });
  const loc = locale as Locale;

  return (
    <>
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
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

      {/* Upcoming */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
            {t("upcomingTitle")}
          </p>
        </FadeIn>
        {upcomingCommunityEvents.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="mt-10 border border-dashed border-[color:var(--color-sepia)]/30 p-10 text-center md:p-14">
              <p className="bodoni-italic text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] leading-[1.25] text-[color:var(--color-sepia)]">
                {t("noUpcoming")}
              </p>
            </div>
          </FadeIn>
        ) : (
          <Stagger className="mt-10 space-y-2">
            {upcomingCommunityEvents.map((e) => {
              const date = e.date ? new Date(e.date) : null;
              return (
                <StaggerItem key={e.slug}>
                  <Link
                    href={`/teatro/${e.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[color:var(--color-sepia)]/25 py-6 transition-colors hover:bg-[color:var(--color-carta)] md:gap-10 md:py-8"
                  >
                    <div className="text-center">
                      <span className="bodoni-italic block text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-[color:var(--color-sepia)]">
                        {date ? String(date.getDate()).padStart(2, "0") : "—"}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.26em] text-[color:var(--color-accent,var(--color-terracotta))]">
                        {date ? monthNames[loc][date.getMonth()].toUpperCase() : ""}
                      </span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                        {e.year}
                      </p>
                      <h3 className="mt-2 bodoni-italic text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-[1.05] text-[color:var(--color-sepia)]">
                        {e.title[loc]}
                      </h3>
                      <p className="mt-2 italic text-[0.95rem] text-[color:var(--color-sepia-soft)]">
                        {e.tagline[loc]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.25}
                      className="text-[color:var(--color-accent,var(--color-terracotta))] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* Past */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-16 md:py-20">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-accent,var(--color-terracotta))]">
              {t("pastTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 space-y-0 border-t-2 border-[color:var(--color-sepia)]">
            {pastCommunityEvents.map((e, i) => (
              <StaggerItem key={e.slug}>
                <Link
                  href={`/teatro/${e.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[color:var(--color-sepia)]/25 py-6 transition-colors hover:bg-white md:grid-cols-[5rem_1fr_auto_auto] md:gap-10 md:py-7"
                >
                  <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.22em] text-[color:var(--color-sepia)]/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="bodoni-italic text-[clamp(1.25rem,1.5vw+0.5rem,1.75rem)] leading-[1.1] text-[color:var(--color-sepia)]">
                      {e.title[loc]}
                    </h3>
                    <p className="mt-1 italic text-[0.92rem] text-[color:var(--color-sepia-soft)]">
                      {e.tagline[loc]}
                    </p>
                  </div>
                  <span className="hidden font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)] md:inline">
                    {e.year}
                  </span>
                  <div className="relative hidden h-16 w-24 overflow-hidden bg-[color:var(--color-sepia)]/10 md:block">
                    <Image
                      src={e.cover}
                      alt={e.title[loc]}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
