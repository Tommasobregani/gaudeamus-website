import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { press } from "@/content/press";
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
  const t = await getTranslations({ locale, namespace: "press" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/news/parlano-di-noi`,
      languages: {
        en: `${siteConfig.url}/en/news/parlano-di-noi`,
        it: `${siteConfig.url}/it/news/parlano-di-noi`,
      },
    },
  };
}

const typeLabel: Record<string, { en: string; it: string }> = {
  article: { en: "Article", it: "Articolo" },
  review: { en: "Review", it: "Recensione" },
  video: { en: "Video", it: "Video" },
  podcast: { en: "Podcast", it: "Podcast" },
  pdf: { en: "PDF", it: "PDF" },
};

export default async function ParlanoDiNoiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "press" });
  const loc = locale as Locale;
  const it = locale === "it";

  // Collect distinct outlets for the strip
  const outlets = Array.from(new Set(press.map((p) => p.outlet)));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[color:var(--color-carta)]">
        <div className="container-site grid gap-10 py-20 md:grid-cols-12 md:gap-x-14 md:py-28">
          <div className="min-w-0 md:col-span-7">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
                {it ? "Parlano di noi" : "Press"}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="mt-6 max-w-[20ch] min-w-0 font-[family-name:var(--font-display)] font-medium italic text-[clamp(2.4rem,5.4vw+1rem,5.25rem)] leading-[0.98] tracking-[-0.025em] text-[color:var(--color-sepia)]"
                style={{ overflowWrap: "break-word" }}
              >
                {it ? "Parlano di noi." : "What people say about us."}
              </h1>
            </FadeIn>
          </div>
          <div className="min-w-0 md:col-span-5 md:flex md:items-end">
            <FadeIn delay={0.2}>
              <p className="max-w-[44ch] text-[1.02rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {t("lead")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Outlet strip - the "where" */}
      <section className="border-y border-[color:var(--color-sepia)]/15 bg-[color:var(--color-cielo)] py-10">
        <div className="container-site">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
                {it ? "Sui media" : "On the record"}
              </span>
              {outlets.map((o) => (
                <span
                  key={o}
                  className="font-[family-name:var(--font-display)] italic text-[1.1rem] leading-none text-[color:var(--color-sepia)]"
                >
                  {o}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Press list - editorial layout */}
      <section className="container-site py-16 md:py-20">
        <Stagger className="border-t-2 border-[color:var(--color-sepia)]">
          {press.map((p) => (
            <StaggerItem key={p.url}>
              <a
                href={p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
                rel={p.url.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group grid gap-6 border-b border-[color:var(--color-sepia)]/22 py-9 transition-colors hover:bg-[color:var(--color-carta)] md:grid-cols-12 md:gap-10 md:py-11"
              >
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-pompeiano)]">
                    {typeLabel[p.type]?.[loc] ?? p.type}
                  </span>
                  {p.date ? (
                    <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.18em] text-[color:var(--color-muted)]">
                      {p.date.slice(0, 4)}
                    </span>
                  ) : null}
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-[family-name:var(--font-display)] font-medium text-[clamp(1.35rem,1.7vw+0.6rem,1.95rem)] leading-[1.18] tracking-[-0.018em] text-[color:var(--color-sepia)]">
                    {p.title[loc]}
                  </h2>
                  {p.quote ? (
                    <p className="mt-3 max-w-[68ch] italic text-[1.02rem] leading-[1.55] text-[color:var(--color-sepia-soft)]">
                      &ldquo;{p.quote[loc]}&rdquo;
                    </p>
                  ) : null}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                      {p.outlet}
                      {p.author ? ` · ${p.author}` : ""}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--color-pompeiano)] transition-transform duration-300 group-hover:translate-x-1">
                      {t("external")}
                      <ArrowUpRight size={14} strokeWidth={1.7} />
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-sepia)]/22 px-5 py-2 font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)] transition-all hover:bg-[color:var(--color-sepia)] hover:text-white"
            >
              {it ? "Torna a News" : "Back to News"}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
