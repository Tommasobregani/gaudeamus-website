"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/news";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/utils";

/**
 * NewsStrip — rendered inside the SEPIA-dark ScrollStage on the homepage.
 * "Lights down, read the journal." Cream text on sepia, oro eyebrows.
 */
export function NewsStrip() {
  const t = useTranslations("home");
  const tNews = useTranslations("news");
  const locale = useLocale() as Locale;
  const latest = articles.slice(0, 3);

  return (
    <section className="border-t border-[color:var(--color-oro-soft)]/20 py-24 md:py-32 text-[color:var(--color-travertino)]">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeIn>
              <div className="flex items-center gap-4">
                <span className="bodoni-italic text-[1.5rem] leading-none text-[color:var(--color-oro-soft)]">
                  III
                </span>
                <span className="h-px w-6 bg-[color:var(--color-travertino)]/40" />
                <span className="font-[family-name:var(--font-cartel)] text-[0.95rem] tracking-[0.28em] text-[color:var(--color-travertino)]">
                  {t("newsEyebrow")}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 display-mixed text-[clamp(2.25rem,4vw+1rem,4rem)] leading-[1] text-[color:var(--color-travertino)]">
                {locale === "it" ? (
                  <>Dal <em>diario</em>.</>
                ) : (
                  <>From the <em>journal</em>.</>
                )}
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <Link
              href="/news"
              className="hover-underline inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em] text-[color:var(--color-oro-soft)]"
            >
              {t("newsLink")} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </FadeIn>
        </div>

        <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
          {latest.map((a, i) => (
            <StaggerItem key={a.slug}>
              <Link href={`/news/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)]">
                  <Image
                    src={a.cover}
                    alt={a.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-2 bodoni-italic text-[1.75rem] leading-none text-[color:var(--color-travertino)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 border-t border-[color:var(--color-travertino)]/25 pt-4">
                  <p className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.25em] text-[color:var(--color-oro-soft)]">
                    {a.category[locale]} · {a.readingMinutes} {tNews("minRead")}
                  </p>
                  <h3 className="mt-2 bodoni-italic text-[1.65rem] leading-[1.08] text-[color:var(--color-travertino)]">
                    {a.title[locale]}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-travertino)]/75">
                    {a.excerpt[locale]}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
