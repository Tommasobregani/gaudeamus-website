import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig, type Locale } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema-org";

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
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/progetti`,
      languages: {
        en: `${siteConfig.url}/en/progetti`,
        it: `${siteConfig.url}/it/progetti`,
      },
    },
  };
}

type FundedProject = {
  year: number;
  title: { en: string; it: string };
  body: { en: string; it: string };
};

const fundedProjects: FundedProject[] = [
  {
    year: 2025,
    title: {
      en: "Italian Connections — Italy in Scotland between theatre and music (2025/26)",
      it: "Italian Connections — l'Italia in Scozia tra teatro e musica (2025/26)",
    },
    body: {
      en: "A nine-month cultural programme across Aberdeen, Edinburgh and Glasgow celebrating Italian identity through theatre and music. Supported by the Italian Consular Authority and the National Lottery Fund, it ran from November 2025 to June 2026 with productions (Poor Piero), commedia dell'arte workshops, and cultural events exploring the connections between Italian and Scottish heritage.",
      it: "Un programma culturale di nove mesi tra Aberdeen, Edimburgo e Glasgow che celebra l'identità italiana attraverso teatro e musica. Sostenuto dall'Autorità Consolare Italiana e dal National Lottery Fund, è andato in scena da novembre 2025 a giugno 2026 con produzioni (Poor Piero), laboratori di commedia dell'arte ed eventi culturali sui legami tra patrimonio italiano e scozzese.",
    },
  },
  {
    year: 2025,
    title: {
      en: "Joining the Albo Consolare",
      it: "Ingresso nell'Albo Consolare",
    },
    body: {
      en: "Gaudeamus joins the Albo Consolare delle Associazioni Culturali Italiane nel Regno Unito — the official Italian-government register of cultural associations in the UK — consolidating its institutional role in promoting Italian art and culture across Scotland.",
      it: "Gaudeamus entra ufficialmente nell'Albo Consolare delle Associazioni Culturali Italiane nel Regno Unito, consolidando il proprio ruolo istituzionale nella promozione dell'arte e della cultura italiana in Scozia.",
    },
  },
  {
    year: 2024,
    title: {
      en: "Production season — Poor Piero, No Shakespeare Fringe Edition",
      it: "Stagione produttiva — Poor Piero, No Shakespeare Fringe Edition",
    },
    body: {
      en: "Mission-driven production of Poor Piero (after Achille Campanile) and the Fringe Edition of No Shakespeare — both staged in Italian with live English subtitles, with the goal of giving Italian dramaturgy a Scottish stage.",
      it: "Produzione mission-driven di Poor Piero (da Achille Campanile) e della Fringe Edition di No Shakespeare — entrambi in italiano con sottotitoli live in inglese, con l'obiettivo di portare la drammaturgia italiana sui palchi scozzesi.",
    },
  },
  {
    year: 2023,
    title: {
      en: "Founding & charity registration",
      it: "Fondazione e registrazione come charity",
    },
    body: {
      en: "Compagnia Artistica Gaudeamus is founded in Aberdeen in May 2023. In September 2023 it is officially recognised as a Scottish Charitable Incorporated Organisation (SCIO) — becoming the only Scottish charity to stage productions entirely in Italian with live English subtitles. First production: No Shakespeare, November 2023.",
      it: "La Compagnia Artistica Gaudeamus nasce ad Aberdeen nel maggio 2023. Nel settembre 2023 viene ufficialmente riconosciuta come Scottish Charitable Incorporated Organisation (SCIO) — diventando l'unica charity in Scozia a portare in scena spettacoli interamente in italiano con sottotitoli live in inglese. Prima produzione: No Shakespeare, novembre 2023.",
    },
  },
];

export default async function ProgettiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const loc = locale as Locale;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          { name: t("eyebrow"), href: `/${locale}/progetti` },
        ])}
      />

      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
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
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.05rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Founding hero — the 2023 entry as a deep-blue anchor */}
      {(() => {
        const founding = fundedProjects[fundedProjects.length - 1];
        return (
          <section className="bg-[color:var(--color-notte)] py-16 text-[color:var(--color-travertino)] md:py-20">
            <div className="container-site grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <FadeIn>
                  <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
                    {locale === "it" ? "Da dove veniamo" : "Where it started"}
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <span className="mt-6 block bodoni-italic text-[clamp(4rem,8vw+1rem,8rem)] leading-[0.9]">
                    {founding.year}
                  </span>
                </FadeIn>
              </div>
              <div className="md:col-span-8 md:flex md:flex-col md:justify-center">
                <FadeIn delay={0.1}>
                  <h2 className="bodoni-italic text-[clamp(1.75rem,2.6vw+1rem,3rem)] leading-[1.1]">
                    {founding.title[loc]}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-[1.7] opacity-90">
                    {founding.body[loc]}
                  </p>
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })()}

      <section className="container-site py-12 md:py-16">
        <Stagger className="border-t-2 border-[color:var(--color-sepia)]">
          {fundedProjects.slice(0, -1).map((p, i, arr) => {
            const showYear = i === 0 || arr[i - 1].year !== p.year;
            return (
              <StaggerItem key={`${p.year}-${p.title.en}`}>
                <article className="grid gap-6 border-b border-[color:var(--color-sepia)]/25 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                  <div className="md:col-span-3">
                    {showYear ? (
                      <span className="bodoni-italic block text-[clamp(2.5rem,4vw+1rem,3.75rem)] leading-[0.95] text-[color:var(--color-sepia)]">
                        {p.year}
                      </span>
                    ) : null}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="bodoni-italic text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-[1.15] text-[color:var(--color-sepia)]">
                      {p.title[loc]}
                    </h3>
                    <p className="mt-4 max-w-[64ch] text-[1.02rem] leading-[1.7] text-[color:var(--color-sepia-soft)]">
                      {p.body[loc]}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
        <FadeIn delay={0.2}>
          <p className="mt-12 max-w-[58ch] text-[0.95rem] italic leading-[1.7] text-[color:var(--color-sepia-soft)]">
            {locale === "it"
              ? "Stiamo aggiornando questo archivio con la lista completa dei progetti finanziati. Se sei un finanziatore o vuoi proporre una collaborazione, scrivici."
              : "We are updating this archive with the full list of funded projects. If you are a funder or want to propose a collaboration, please get in touch."}
          </p>
        </FadeIn>
      </section>
    </>
  );
}
