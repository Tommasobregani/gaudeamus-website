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
      {/* Editorial masthead — community photo with title overlay */}
      <section className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[color:var(--color-sepia)] md:aspect-[21/9]">
          <Image
            src="/events/christmas-party/christmas-party-2025.jpg"
            alt="Gaudeamus community gathering at the Butchers Arms, Aberdeen"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-sepia)]/85 via-[color:var(--color-sepia)]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
            <div className="container-site">
              <FadeIn>
                <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-oro-soft)]">
                  {t("eyebrow")}
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="mt-4 max-w-[20ch] bodoni-italic text-[clamp(2.5rem,8vw+1rem,7rem)] leading-[0.94] text-[color:var(--color-travertino)]">
                  {t("title")}
                </h1>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-12 md:py-16">
        <FadeIn>
          <p className="max-w-[60ch] text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
            {t("lead")}
          </p>
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

      {/* Past — image-card grid for community memory */}
      <section className="relative bg-[color:var(--color-pompeiano)] py-16 text-[color:var(--color-travertino)] md:py-20">
        <div className="container-site">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
              {t("pastTitle")}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            {pastCommunityEvents.map((e) => (
              <StaggerItem key={e.slug}>
                <Link href={`/teatro/${e.slug}`} className="group block">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-[color:var(--color-sepia)]/40">
                    <Image
                      src={e.cover}
                      alt={e.title[loc]}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[color:var(--color-pompeiano)]/90 via-[color:var(--color-pompeiano)]/40 to-transparent" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.26em] opacity-70">
                        {e.year}
                      </p>
                      <h3 className="mt-2 bodoni-italic text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-[1.1]">
                        {e.title[loc]}
                      </h3>
                      <p className="mt-2 italic text-[0.95rem] opacity-90">
                        {e.tagline[loc]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.25}
                      className="mt-1 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
