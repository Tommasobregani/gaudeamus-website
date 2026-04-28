import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles, articleBySlug } from "@/content/news";
import { getPublishedPostBySlug } from "@/lib/posts";
import { FadeIn } from "@/components/motion/FadeIn";
import { IlluminatedInitial } from "@/components/brand/IlluminatedInitial";
import { PullQuote } from "@/components/brand/PullQuote";
import { Fregio } from "@/components/brand/Fregio";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema-org";
import { siteConfig, type Locale } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export const dynamicParams = true; // allow runtime rendering for new Supabase posts

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const a = articleBySlug(slug) ?? (await getPublishedPostBySlug(slug));
  if (!a) return {};
  const loc = locale as Locale;
  return {
    title: a.title[loc],
    description: a.excerpt[loc],
    openGraph: {
      type: "article",
      publishedTime: a.publishedAt,
      authors: [a.author],
      title: a.title[loc],
      description: a.excerpt[loc],
      images: [{ url: a.cover, width: 1600, height: 1200, alt: a.title[loc] }],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/news/${a.slug}`,
      languages: {
        en: `${siteConfig.url}/en/news/${a.slug}`,
        it: `${siteConfig.url}/it/news/${a.slug}`,
      },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const article = articleBySlug(slug) ?? (await getPublishedPostBySlug(slug));
  if (!article) notFound();
  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "news" });
  const dateFormatted = new Date(article.publishedAt).toLocaleDateString(
    loc === "it" ? "it-IT" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Split body for drop-cap first + pull quote middle
  const body = article.body[loc];
  const mid = Math.floor(body.length / 2);
  const firstHalf = body.slice(0, mid);
  const secondHalf = body.slice(mid);

  return (
    <>
      <JsonLd data={articleJsonLd(article, loc)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/news` },
          { name: article.title[loc], href: `/${locale}/news/${article.slug}` },
        ])}
      />

      <article>
        <section className="container-site pt-10 md:pt-14">
          <Link
            href="/news"
            className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            {t("back")}
          </Link>
        </section>

        {/* Article front matter — newspaper style */}
        <header className="container-site pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="border-y-2 border-[color:var(--color-sepia)] py-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
                {article.category[loc].toUpperCase()}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
                {dateFormatted} · {article.readingMinutes} {t("minRead")}
              </span>
            </div>
          </div>

          <FadeIn delay={0.1}>
            <h1 className="mt-10 max-w-[22ch] bodoni-italic text-[clamp(2.75rem,7vw+1rem,7.5rem)] leading-[0.95] text-[color:var(--color-sepia)]">
              {article.title[loc]}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-[54ch] bodoni-italic text-[clamp(1.35rem,2vw+1rem,1.85rem)] leading-[1.3] text-[color:var(--color-terracotta)]">
              {article.excerpt[loc]}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-10 flex items-baseline gap-4 border-t border-[color:var(--color-sepia)]/25 pt-5">
              <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia)]">
                {loc === "it" ? "Firmato" : "Signed"}
              </span>
              <span className="bodoni-italic text-[1.25rem] text-[color:var(--color-sepia)]">
                {article.author}
              </span>
            </div>
          </FadeIn>
        </header>

        {/* Cover image */}
        <FadeIn>
          <div className="container-site">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)] duotone">
              <Image
                src={article.cover}
                alt={article.title[loc]}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
              {loc === "it" ? "Scena" : "Scene"} · {article.category[loc]}
            </p>
          </div>
        </FadeIn>

        {/* Body with illuminated drop cap */}
        <div className="container-prose py-20 md:py-24">
          {firstHalf.length > 0 && (
            <FadeIn>
              <IlluminatedInitial className="mb-8">{firstHalf[0]}</IlluminatedInitial>
            </FadeIn>
          )}
          {firstHalf.slice(1).map((p, i) => (
            <FadeIn key={`a-${i}`} delay={i * 0.04}>
              <p className="mb-6 font-[family-name:var(--font-body)] text-[1.15rem] leading-[1.75] text-[color:var(--color-sepia-soft)]">
                {p}
              </p>
            </FadeIn>
          ))}

          {/* Pull quote at mid-point */}
          {body.length > 2 && (
            <PullQuote
              quote={article.excerpt[loc]}
              attribution={`${article.title[loc]}`}
            />
          )}

          {secondHalf.map((p, i) => (
            <FadeIn key={`b-${i}`} delay={i * 0.04}>
              <p className="mb-6 font-[family-name:var(--font-body)] text-[1.15rem] leading-[1.75] text-[color:var(--color-sepia-soft)] last:mb-0">
                {p}
              </p>
            </FadeIn>
          ))}

          <FadeIn delay={0.2}>
            <div className="mt-16 flex flex-col items-center gap-4">
              <Fregio width={200} tone="terracotta" />
              <p className="bodoni-italic text-[1.25rem] text-[color:var(--color-sepia)]">
                {article.author}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
                {dateFormatted}
              </p>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
          <div className="container-site py-20 md:py-24">
            <FadeIn>
              <div className="flex items-end justify-between">
                <RomanEyebrow n={1} label={loc === "it" ? "Nelle altre pagine" : "In other pages"} />
                <Link
                  href="/news"
                  className="hover-underline inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
                >
                  {loc === "it" ? "Tutte le storie" : "All stories"}
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </FadeIn>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/news/${a.slug}`}
                  className="group block"
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
                  <p className="mt-4 font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-terracotta)]">
                    {a.category[loc]}
                  </p>
                  <h3 className="mt-2 bodoni-italic text-[1.55rem] leading-[1.1] text-[color:var(--color-sepia)]">
                    {a.title[loc]}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
