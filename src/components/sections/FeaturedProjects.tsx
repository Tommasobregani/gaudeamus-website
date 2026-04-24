"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { events } from "@/content/events";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import type { Locale } from "@/lib/utils";

export function FeaturedProjects() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;
  const featured = events.slice(0, 4);

  return (
    <section className="container-site border-t border-[color:var(--color-sepia)]/20 py-24 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeIn>
            <RomanEyebrow n={2} label={t("projectsEyebrow")} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 bodoni-italic text-[clamp(2.5rem,5vw+1rem,4.75rem)] leading-[1] text-[color:var(--color-sepia)]">
              {t("projectsTitle")}
            </h2>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <Link
            href="/progetti"
            className="hover-underline inline-flex items-center gap-1 font-[family-name:var(--font-cartel)] text-sm tracking-[0.22em]"
          >
            {t("projectsLink")} <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </FadeIn>
      </div>

      <Stagger className="mt-16 grid gap-12 md:grid-cols-12">
        {featured.map((e, i) => {
          const numLabel = String(i + 1).padStart(2, "0");
          const layout = [
            "md:col-span-7",
            "md:col-span-5 md:mt-24",
            "md:col-span-7 md:mt-24",
            "md:col-span-5 md:mt-40",
          ][i] ?? "md:col-span-6";
          return (
            <StaggerItem
              key={e.slug}
              className={layout}
            >
              <Link
                href={`/progetti/${e.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)] duotone">
                  <Image
                    src={e.cover}
                    alt={e.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.1,1)] group-hover:scale-[1.035]"
                  />
                  {/* top-left Roman numeral */}
                  <span className="pointer-events-none absolute left-4 top-3 z-[2] bodoni-italic text-[2.5rem] leading-none text-[color:var(--color-travertino)]">
                    {numLabel}
                  </span>
                  {/* bottom caption */}
                  <div className="absolute bottom-0 left-0 right-0 z-[2] flex items-end justify-between border-t border-[color:var(--color-travertino)]/40 bg-gradient-to-t from-[color:var(--color-sepia)]/85 to-transparent px-4 py-3 text-[color:var(--color-travertino)]">
                    <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.24em]">
                      {e.kind.toUpperCase()}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.22em]">
                      {e.year}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="bodoni-italic text-[2rem] leading-[1.02] text-[color:var(--color-sepia)]">
                      {e.title[locale]}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[0.975rem] leading-relaxed text-[color:var(--color-sepia-soft)]">
                      {e.tagline[locale]}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.25}
                    className="mt-1 shrink-0 text-[color:var(--color-terracotta)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
