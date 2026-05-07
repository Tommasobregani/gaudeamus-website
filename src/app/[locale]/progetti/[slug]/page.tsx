import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { fundedProjects, projectBySlug } from "@/content/projects";
import { siteConfig, type Locale } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImgReveal } from "@/components/motion/ImgReveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema-org";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const p of fundedProjects) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const project = projectBySlug(slug);
  if (!project) return {};
  const loc = locale as Locale;
  return {
    title: project.title[loc],
    description: project.body[loc].slice(0, 160),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/progetti/${slug}`,
      languages: {
        en: `${siteConfig.url}/en/progetti/${slug}`,
        it: `${siteConfig.url}/it/progetti/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const project = projectBySlug(slug);
  if (!project) notFound();

  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "projects" });

  // Find prev/next for footer nav
  const idx = fundedProjects.findIndex((p) => p.slug === project.slug);
  const next = fundedProjects[(idx + 1) % fundedProjects.length];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/progetti` },
          { name: project.title[loc], href: `/${locale}/progetti/${slug}` },
        ])}
      />

      {/* Hero — full-bleed photo with text anchored bottom */}
      <section className="relative isolate overflow-hidden" style={{ minHeight: "min(82vh, 880px)" }}>
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title[loc]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(180deg,transparent_0%,rgba(8,26,49,0.55)_38%,rgba(8,26,49,0.88)_100%)]"
          />
        </div>

        <div className="container-site relative z-10 flex min-h-[inherit] items-end pb-14 pt-32 md:pb-16 md:pt-40">
          <div className="w-full">
            <Link
              href="/progetti"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/75 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} strokeWidth={1.6} />
              {locale === "it" ? "Tutti i progetti" : "All projects"}
            </Link>

            <FadeIn delay={0.05}>
              <p className="mt-8 font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
                {t("eyebrow")} · {project.year}
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1
                className="mt-5 max-w-[26ch] font-[family-name:var(--font-inter)] text-[clamp(2rem,4.4vw+0.5rem,4.2rem)] font-light leading-[1.04] tracking-[-0.025em] text-white"
                style={{ overflowWrap: "break-word" }}
              >
                {project.title[loc]}
              </h1>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-site grid gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-28">
        <div className="md:col-span-4">
          <FadeIn>
            <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
              {locale === "it" ? "Sintesi" : "Overview"}
            </p>
            <p className="mt-5 font-[family-name:var(--font-inter)] text-[1rem] leading-[1.6] text-[color:var(--color-sepia)]">
              {locale === "it"
                ? "Un progetto realizzato dalla Compagnia Artistica Gaudeamus."
                : "A project delivered by Compagnia Artistica Gaudeamus."}
            </p>
          </FadeIn>

          {project.partners?.length ? (
            <FadeIn delay={0.1}>
              <div className="mt-10">
                <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
                  {locale === "it" ? "Partner" : "Partners"}
                </p>
                <ul className="mt-4 space-y-2 font-[family-name:var(--font-inter)] text-[0.95rem] leading-[1.55] text-[color:var(--color-sepia-soft)]">
                  {project.partners.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="text-[color:var(--color-cielo-deep)]">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ) : null}
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <FadeIn delay={0.1}>
            <p className="text-[1.08rem] leading-[1.75] text-[color:var(--color-sepia)]">
              {project.body[loc]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Inline showcase image with Hendricks reveal */}
      <section className="container-site pb-20 md:pb-28">
        <ImgReveal
          from="bottom"
          parallax
          className="relative block aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-xl)] bg-[color:var(--color-cielo)] md:aspect-[21/9]"
        >
          <Image
            src={project.image}
            alt={project.title[loc]}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </ImgReveal>
      </section>

      {/* Next project */}
      <section className="bg-[color:var(--color-notte)] py-20 text-white md:py-24">
        <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
              {locale === "it" ? "Progetto successivo" : "Next project"}
            </p>
            <Link
              href={`/progetti/${next.slug}`}
              className="group mt-5 inline-flex items-center gap-4"
            >
              <span className="font-[family-name:var(--font-inter)] text-[clamp(1.6rem,2.6vw+0.5rem,2.4rem)] font-light leading-[1.1] tracking-[-0.02em] text-white transition-colors group-hover:text-[color:var(--color-cielo)]">
                {next.title[loc]}
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/22 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[color:var(--color-notte)] group-hover:-translate-y-0.5">
                <ArrowUpRight size={18} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
