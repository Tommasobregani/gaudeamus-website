import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { upcomingEvents, pastEvents, events as allEvents } from "@/content/events";
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
  const path = "eventi";
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
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

const romanYear = (y: number) => {
  const map: Record<number, string> = { 2023: "MMXXIII", 2024: "MMXXIV", 2025: "MMXXV", 2026: "MMXXVI" };
  return map[y] ?? String(y);
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

  // City counts
  const cityCounts: Record<string, number> = {};
  for (const e of allEvents) {
    for (const v of e.venues ?? []) {
      cityCounts[v] = (cityCounts[v] ?? 0) + 1;
    }
  }

  return (
    <>
      {/* Cartello — event board */}
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="border-y-2 border-[color:var(--color-sepia)] py-5">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              CALENDARIO · MMXXVI
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
              {locale === "it" ? "AGGIORNATO" : "UPDATED"} · {new Date().toLocaleDateString(loc === "it" ? "it-IT" : "en-GB", { day: "2-digit", month: "short" })}
            </span>
          </div>
        </div>

        <FadeIn>
          <h1 className="mt-10 max-w-[14ch] display-mixed text-[clamp(3.5rem,9vw+1rem,10rem)] leading-[0.92]">
            {locale === "it" ? (
              <>Il <em>calendario</em>.</>
            ) : (
              <>The <em>calendar</em>.</>
            )}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.15rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Prossimi eventi — big date format */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
        <FadeIn>
          <div className="flex items-end justify-between">
            <RomanEyebrow n={1} label={t("upcomingTitle")} />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-terracotta)]">
              {upcomingEvents.length} {locale === "it" ? (upcomingEvents.length === 1 ? "evento" : "eventi") : upcomingEvents.length === 1 ? "event" : "events"}
            </span>
          </div>
        </FadeIn>
        {upcomingEvents.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="mt-12 border-2 border-dashed border-[color:var(--color-sepia)]/30 p-10 text-center md:p-16">
              <p className="bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] leading-[1.2] text-[color:var(--color-sepia)]">
                {locale === "it"
                  ? "Stiamo preparando la prossima stagione."
                  : "The next season is in preparation."}
              </p>
              <p className="mx-auto mt-5 max-w-[46ch] font-[family-name:var(--font-body)] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("noUpcoming")}
              </p>
              <div className="mt-8 flex justify-center">
                <Fregio width={180} tone="terracotta" />
              </div>
            </div>
          </FadeIn>
        ) : (
          <Stagger className="mt-12 space-y-4">
            {upcomingEvents.map((e) => {
              const date = e.date ? new Date(e.date) : null;
              return (
                <StaggerItem key={e.slug}>
                  <Link
                    href={`/progetti/${e.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[color:var(--color-sepia)]/25 py-6 transition-colors hover:bg-[color:var(--color-carta)] md:gap-10 md:py-8"
                  >
                    <div className="text-center">
                      <span className="bodoni-italic block text-[clamp(2.75rem,5vw,4.5rem)] leading-none text-[color:var(--color-sepia)]">
                        {date ? String(date.getDate()).padStart(2, "0") : "—"}
                      </span>
                      <span className="mt-1 block font-[family-name:var(--font-cartel)] text-[0.7rem] tracking-[0.28em] text-[color:var(--color-terracotta)]">
                        {date ? monthNames[loc][date.getMonth()].toUpperCase() : ""}
                      </span>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.28em] text-[color:var(--color-sepia-soft)]">
                        {e.kind.toUpperCase()}
                        {e.venues ? ` · ${e.venues.join(" · ").toUpperCase()}` : ""}
                      </p>
                      <h3 className="mt-2 bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-[1.05] text-[color:var(--color-sepia)]">
                        {e.title[loc]}
                      </h3>
                      <p className="mt-2 font-[family-name:var(--font-body)] italic text-[0.95rem] text-[color:var(--color-sepia-soft)]">
                        {e.tagline[loc]}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={22}
                      strokeWidth={1.25}
                      className="text-[color:var(--color-terracotta)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* Cities map substitute — three big pin cards */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <RomanEyebrow n={2} label={locale === "it" ? "Dove andiamo in scena" : "Where we play"} />
          </FadeIn>
          <div className="mt-10 grid gap-0 border-t-2 border-[color:var(--color-sepia)] sm:grid-cols-3">
            {["Aberdeen", "Glasgow", "Edinburgh"].map((city, i) => {
              const count = cityCounts[city] ?? 0;
              return (
                <FadeIn key={city} delay={i * 0.08}>
                  <div
                    className={
                      "relative border-b border-[color:var(--color-sepia)]/25 p-8 md:p-10 " +
                      (i < 2 ? "sm:border-r sm:border-r-[color:var(--color-sepia)]/25" : "")
                    }
                  >
                    <MapPin
                      size={20}
                      strokeWidth={1.5}
                      className="absolute right-5 top-5 text-[color:var(--color-terracotta)]"
                    />
                    <span className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
                      {["I", "II", "III"][i]}
                    </span>
                    <h3 className="mt-4 bodoni-italic text-[clamp(2.5rem,5vw+1rem,4rem)] leading-[0.95] text-[color:var(--color-sepia)]">
                      {city === "Edinburgh" && locale === "it" ? "Edimburgo" : city}
                    </h3>
                    <p className="mt-3 font-[family-name:var(--font-body)] italic text-[1rem] text-[color:var(--color-sepia-soft)]">
                      Scotland
                    </p>
                    <p className="mt-6 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
                      {count > 0
                        ? `${count} ${locale === "it" ? (count === 1 ? "evento" : "eventi") : count === 1 ? "event" : "events"}`
                        : locale === "it"
                        ? "In preparazione"
                        : "In preparation"}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eventi passati — past event list with visual */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-32">
        <FadeIn>
          <RomanEyebrow n={3} label={t("pastTitle")} />
        </FadeIn>
        <Stagger className="mt-12 space-y-0 border-t-2 border-[color:var(--color-sepia)]">
          {pastEvents.map((e, i) => (
            <StaggerItem key={e.slug}>
              <Link
                href={`/progetti/${e.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[color:var(--color-sepia)]/25 py-6 transition-colors hover:bg-[color:var(--color-carta)] md:grid-cols-[5rem_1fr_auto_auto] md:gap-10 md:py-8"
              >
                <span className="bodoni-italic text-[clamp(2rem,3vw+1rem,2.75rem)] leading-none text-[color:var(--color-terracotta)]">
                  {["I", "II", "III", "IV", "V", "VI"][i]}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.28em] text-[color:var(--color-sepia-soft)]">
                    {e.kind.toUpperCase()}
                    {e.venues ? ` · ${e.venues.join(" · ").toUpperCase()}` : ""}
                  </p>
                  <h3 className="mt-2 bodoni-italic text-[clamp(1.5rem,2vw+1rem,2.25rem)] leading-[1.1] text-[color:var(--color-sepia)]">
                    {e.title[loc]}
                  </h3>
                </div>
                <span className="hidden font-[family-name:var(--font-mono)] text-[0.8rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)] md:inline">
                  {romanYear(e.year)}
                </span>
                <div className="relative hidden h-20 w-28 overflow-hidden bg-[color:var(--color-terracotta-deep)] md:block">
                  <Image
                    src={e.cover}
                    alt={e.title[loc]}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn delay={0.2}>
          <div className="mt-16 flex justify-center">
            <Fregio width={220} tone="terracotta" />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
