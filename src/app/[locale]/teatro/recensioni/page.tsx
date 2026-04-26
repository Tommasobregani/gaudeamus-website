import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
      canonical: `${siteConfig.url}/${locale}/teatro/recensioni`,
      languages: {
        en: `${siteConfig.url}/en/teatro/recensioni`,
        it: `${siteConfig.url}/it/teatro/recensioni`,
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

function formatDate(iso: string, loc: "en" | "it") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(loc === "it" ? "it-IT" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function RecensioniPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "press" });
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

      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-12 md:py-16">
        <Stagger className="border-t-2 border-[color:var(--color-sepia)]">
          {press.map((item) => (
            <StaggerItem key={item.url}>
              <a
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-[color:var(--color-sepia)]/25 py-7 transition-colors hover:bg-[color:var(--color-carta)] md:gap-8 md:py-9"
              >
                <span className="mt-1 font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]/55">
                  {typeLabel[item.type][loc]}
                </span>
                <div>
                  <h3 className="bodoni-italic text-[clamp(1.25rem,1.75vw+0.5rem,1.75rem)] leading-[1.15] text-[color:var(--color-sepia)]">
                    {item.title[loc]}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                    {item.outlet}
                    {item.author ? ` · ${item.author}` : ""}
                    {item.date ? ` · ${formatDate(item.date, loc)}` : ""}
                  </p>
                  {item.quote && (
                    <p className="mt-4 max-w-[64ch] border-l-2 border-[color:var(--color-accent,var(--color-terracotta))] pl-4 italic text-[0.98rem] leading-[1.55] text-[color:var(--color-sepia-soft)]">
                      “{item.quote[loc]}”
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.25}
                  className="mt-1 text-[color:var(--color-accent,var(--color-terracotta))] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
