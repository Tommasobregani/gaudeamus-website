import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { MapPin } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { siteConfig } from "@/lib/utils";

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
  const t = await getTranslations({ locale, namespace: "contact" });
  const path = "contatti";
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
      languages: {
        en: `${siteConfig.url}/en/contatti`,
        it: `${siteConfig.url}/it/contatti`,
      },
    },
  };
}

export default async function ContattiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const it = locale === "it";

  const channels = [
    {
      roman: "01",
      title: t("generalTitle"),
      email: siteConfig.email.general,
      body: it
        ? "Informazioni generali, segreteria, richieste di stampa e curiosità."
        : "General enquiries, press requests and anything else.",
    },
    {
      roman: "02",
      title: t("artisticTitle"),
      email: siteConfig.email.artistic,
      body: it
        ? "Proposte artistiche, coproduzioni, inviti a festival, collaborazioni."
        : "Artistic proposals, co-productions, festival invitations, collaborations.",
    },
    {
      roman: "03",
      title: t("financeTitle"),
      email: siteConfig.email.finance,
      body: it
        ? "Tesoreria, donazioni e Gift Aid."
        : "Treasury, donations and Gift Aid.",
    },
  ];

  const offices = [
    {
      roman: "01",
      city: "Aberdeen",
      cityIt: "Aberdeen",
      role: it ? "SEDE LEGALE" : "REGISTERED OFFICE",
      note: it
        ? "Sede legale della charity. Operiamo in tutta la Scozia."
        : "Registered charity office. We operate across Scotland.",
    },
  ];

  return (
    <>
      {/* Cartello */}
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="border-y-2 border-[color:var(--color-sepia)] py-5">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              {it ? "CONTATTI" : "CONTACT"}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
              ITALIANDRAMAUK.ORG
            </span>
          </div>
        </div>

        <FadeIn>
          <h1 className="mt-10 max-w-[12ch] bodoni-italic text-[clamp(3.5rem,10vw+1rem,11rem)] leading-[0.92] text-[color:var(--color-sepia)]">
            {it ? "Parliamone." : "Let's talk."}
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

      {/* Channels — three big address cards */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
        <FadeIn>
          <RomanEyebrow n={1} label={it ? "Indirizzi" : "Addresses"} />
        </FadeIn>
        <Stagger className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-3">
          {channels.map((c, i) => (
            <StaggerItem
              key={c.email}
              className={
                "border-b border-[color:var(--color-sepia)]/25 md:border-b-0 " +
                (i < channels.length - 1 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
              }
            >
              <article className="flex h-full flex-col p-8 md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="bodoni-italic text-[2.5rem] leading-none text-[color:var(--color-terracotta)]">
                    {c.roman}
                  </span>
                  <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                    {t("writeTo")}
                  </span>
                </div>
                <h3 className="mt-6 bodoni-italic text-[1.85rem] leading-[1.08] text-[color:var(--color-sepia)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
                  {c.body}
                </p>

                <a
                  href={`mailto:${c.email}`}
                  className="hover-underline mt-8 inline-flex items-baseline bodoni-italic text-[1.3rem] leading-tight text-[color:var(--color-terracotta)]"
                >
                  {c.email}
                </a>

              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Offices — like signage panels */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-20 md:py-28">
          <FadeIn>
            <RomanEyebrow n={2} label={it ? "Dove siamo" : "Where we are"} />
          </FadeIn>
          <div className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-2">
            {offices.map((o, i) => (
              <FadeIn key={o.city} delay={i * 0.1}>
                <article
                  className={
                    "relative flex flex-col border-b border-[color:var(--color-sepia)]/25 p-10 md:border-b-0 md:p-14 " +
                    (i === 0 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
                  }
                >
                  <MapPin
                    size={28}
                    strokeWidth={1.25}
                    className="absolute right-8 top-8 text-[color:var(--color-terracotta)]"
                  />
                  <span className="bodoni-italic text-[2rem] leading-none text-[color:var(--color-terracotta)]">
                    {o.roman}
                  </span>
                  <span className="mt-5 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
                    {o.role}
                  </span>
                  <h3 className="mt-4 bodoni-italic text-[clamp(3rem,7vw+1rem,6rem)] leading-[0.95] text-[color:var(--color-sepia)]">
                    {it ? o.cityIt : o.city}
                  </h3>
                  <p className="mt-4 font-[family-name:var(--font-body)] italic text-[1.05rem] text-[color:var(--color-sepia-soft)]">
                    {o.note}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
                    Scotland · United Kingdom
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Response promise + registered-as */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <FadeIn>
              <RomanEyebrow n={3} label={it ? "Il nostro tempo di risposta" : "Our response time"} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[40ch] bodoni-italic text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] leading-[1.15] text-[color:var(--color-sepia)]">
                {it
                  ? "Rispondiamo entro qualche giorno lavorativo."
                  : "We aim to respond within a few working days."}
              </p>
            </FadeIn>
          </div>

          <div className="md:col-span-6">
            <FadeIn>
              <RomanEyebrow n={4} label={t("registeredTitle")} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 max-w-[48ch] bodoni-italic text-[clamp(1.5rem,2vw+1rem,2.25rem)] leading-[1.18] text-[color:var(--color-sepia-soft)]">
                {t("registeredBody")}
              </p>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-20 flex justify-center">
            <Fregio width={240} tone="terracotta" />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
