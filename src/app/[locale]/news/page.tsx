import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { MagazineMasthead } from "@/components/brand/MagazineMasthead";
import { Fregio } from "@/components/brand/Fregio";
import { articles } from "@/content/news";
import { listPublishedPosts } from "@/lib/posts";
import { siteConfig, type Locale } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic"; // so new Supabase posts appear without rebuild

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/news`,
      languages: {
        en: `${siteConfig.url}/en/news`,
        it: `${siteConfig.url}/it/news`,
      },
    },
  };
}

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  const loc = locale as Locale;

  // Merge seed articles + published Supabase posts (if any)
  const dbPosts = await listPublishedPosts();
  const combined = [...dbPosts, ...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const [lead, ...rest] = combined;
  const now = new Date();
  const issueLabel = loc === "it" ? `Anno I · Numero ${combined.length}` : `Vol. I · No. ${combined.length}`;
  const dateLabel = `${monthNames[loc][now.getMonth()]} · 2026`;

  // Categories strip
  const categories = Array.from(new Set(combined.map((a) => a.category[loc])));

  return (
    <>
      {/* Masthead */}
      <section className="container-site pt-10 md:pt-14">
        <MagazineMasthead
          issueLabel={issueLabel}
          dateLabel={dateLabel}
          title={loc === "it" ? "Il Diario" : "The Journal"}
          subtitle={t("lead")}
        />
        <FadeIn delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {categories.map((cat, i) => (
              <span key={cat} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[color:var(--color-terracotta)]" />}
                <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.28em] text-[color:var(--color-sepia)]">
                  {cat.toUpperCase()}
                </span>
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Empty state when no articles exist yet */}
      {combined.length === 0 && (
        <section className="container-site border-t-2 border-[color:var(--color-sepia)] py-24 md:py-32">
          <div className="mx-auto max-w-[60ch] text-center">
            <p className="bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.5rem)] leading-[1.2] text-[color:var(--color-sepia)]">
              {loc === "it"
                ? "Il diario è in preparazione. Iscriviti alla newsletter e ti avviseremo non appena usciranno i primi numeri."
                : "The journal is in preparation. Subscribe to the newsletter and we'll let you know as soon as the first issues are out."}
            </p>
            <div className="mt-10">
              <Link
                href="/contatti"
                className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.26em] text-[color:var(--color-accent)]"
              >
                {loc === "it" ? "Scrivici" : "Get in touch"}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* LEAD story — big front-page article */}
      {lead && (
        <section className="container-site border-t-2 border-[color:var(--color-sepia)] pt-16 pb-20 md:pt-20 md:pb-24">
          <FadeIn>
            <Link
              href={`/news/${lead.slug}`}
              className="group grid gap-10 md:grid-cols-12 md:gap-14"
            >
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)] duotone">
                  <Image
                    src={lead.cover}
                    alt={lead.title[loc]}
                    fill
                    priority
                    sizes="(min-width:1024px) 60vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="md:col-span-5 md:flex md:flex-col md:justify-center">
                <p className="font-[family-name:var(--font-cartel)] text-[0.82rem] tracking-[0.28em] text-[color:var(--color-terracotta)]">
                  {loc === "it" ? "In apertura" : "Lead"} · {lead.category[loc]} · {lead.readingMinutes} {t("minRead")}
                </p>
                <h2 className="mt-5 bodoni-italic text-[clamp(2.5rem,5vw+1rem,5rem)] leading-[0.98] text-[color:var(--color-sepia)]">
                  {lead.title[loc]}
                </h2>
                <p className="mt-6 max-w-[52ch] font-[family-name:var(--font-body)] text-[1.1rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                  {lead.excerpt[loc]}
                </p>
                <p className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.26em] text-[color:var(--color-sepia)] group-hover:text-[color:var(--color-terracotta)]">
                  {loc === "it" ? "Leggi l'articolo" : "Read the article"}
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </p>
              </div>
            </Link>
          </FadeIn>
        </section>
      )}

      {/* Rest — three-column print layout */}
      {rest.length > 0 && (
        <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
          <FadeIn>
            <RomanEyebrow n={1} label={loc === "it" ? "Nelle pagine interne" : "Inside pages"} />
          </FadeIn>
          <Stagger className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-3">
            {rest.map((a, i) => (
              <StaggerItem
                key={a.slug}
                className={
                  "border-b border-[color:var(--color-sepia)]/25 p-0 md:border-b-0 " +
                  (i < rest.length - 1 && i % 3 !== 2
                    ? "md:border-r md:border-r-[color:var(--color-sepia)]/25"
                    : "")
                }
              >
                <Link
                  href={`/news/${a.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-[color:var(--color-carta)] md:p-8"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)]">
                    <Image
                      src={a.cover}
                      alt={a.title[loc]}
                      fill
                      sizes="(min-width:1024px) 30vw, 100vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-5 font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-terracotta)]">
                    {a.category[loc]} · {a.readingMinutes} {t("minRead")}
                  </p>
                  <h3 className="mt-3 bodoni-italic text-[1.65rem] leading-[1.1] text-[color:var(--color-sepia)]">
                    {a.title[loc]}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                    {a.excerpt[loc]}
                  </p>
                  <span className="mt-5 font-[family-name:var(--font-body)] italic text-[0.9rem] text-[color:var(--color-sepia-soft)]">
                    — {a.author}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <div className="container-site py-16">
        <div className="flex justify-center">
          <Fregio width={240} tone="terracotta" />
        </div>
      </div>
    </>
  );
}
