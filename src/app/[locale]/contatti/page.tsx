import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero } from "@/components/layout/PageHero";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { siteConfig } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

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

  // Per Eva's brief: two physical inboxes, two physical forms.
  // General → info@; Artistic → her personal director email.
  // Finance email intentionally excluded.
  const formCopy = {
    name: it ? "Nome" : "Name",
    email: it ? "Email" : "Email",
    subject: it ? "Oggetto" : "Subject",
    message: it ? "Messaggio" : "Message",
    submit: it ? "Invia" : "Send",
    submitting: it ? "Invio in corso…" : "Sending…",
    success: it
      ? "Grazie. Ti risponderemo entro qualche giorno lavorativo."
      : "Thanks. We'll be in touch within a few working days.",
    error: it
      ? "Qualcosa è andato storto. Riprova o scrivici direttamente."
      : "Something went wrong. Please try again or email us directly.",
    required: "*",
  };


  return (
    <>
      <PageHero
        eyebrow={it ? "Contatti" : "Contact"}
        title={it ? "Parliamone." : "Let's talk."}
        lead={t("lead")}
        image="/events/talk-and-toast/talk-and-toast-02.jpg"
        imageAlt="Compagnia Gaudeamus, Talk and Toast"
        imagePosition="center 35%"
        size="compact"
      />

      {/* Two physical channels — General + Artistic. Each owns its own form. */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
        <FadeIn>
          <RomanEyebrow n={1} label={it ? "Scrivici" : "Write to us"} />
        </FadeIn>

        <div className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-2">
          {/* 01 — General */}
          <FadeIn className="border-b border-[color:var(--color-sepia)]/25 md:border-b-0 md:border-r md:border-r-[color:var(--color-sepia)]/25" id="general">
            <article className="flex h-full flex-col p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="bodoni-italic text-[2.5rem] leading-none text-[color:var(--color-rosso)]">
                  01
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                  {t("writeTo")}
                </span>
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-serif-display)] font-light text-[1.95rem] leading-[1.12] tracking-[-0.018em] text-[color:var(--color-sepia)]">
                {t("generalTitle")}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {it
                  ? "Informazioni generali, workshop, eventi, stampa e domande della comunità."
                  : "General enquiries, workshops, events, press and community questions."}
              </p>
              <a
                href={`mailto:${siteConfig.email.general}`}
                className="mt-3 inline-flex items-center font-[family-name:var(--font-mono)] text-[0.74rem] tracking-[0.08em] text-[color:var(--color-notte)] underline-offset-4 hover:text-[color:var(--color-rosso)] hover:underline"
              >
                {siteConfig.email.general}
              </a>
              <div className="mt-7">
                <ContactForm kind="general" copy={formCopy} />
              </div>
            </article>
          </FadeIn>

          {/* 02 — Artistic */}
          <FadeIn delay={0.08} id="artistic">
            <article className="flex h-full flex-col p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="bodoni-italic text-[2.5rem] leading-none text-[color:var(--color-rosso)]">
                  02
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
                  {t("writeTo")}
                </span>
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-serif-display)] font-light text-[1.95rem] leading-[1.12] tracking-[-0.018em] text-[color:var(--color-sepia)]">
                {t("artisticTitle")}
              </h3>
              <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {it
                  ? "Proposte artistiche, coproduzioni, inviti a festival, artisti che vogliono presentare un progetto."
                  : "Artistic proposals, co-productions, festival invitations, artists pitching a project."}
              </p>
              <a
                href={`mailto:${siteConfig.email.artistic}`}
                className="mt-3 inline-flex items-center font-[family-name:var(--font-mono)] text-[0.74rem] tracking-[0.08em] text-[color:var(--color-notte)] underline-offset-4 hover:text-[color:var(--color-rosso)] hover:underline"
              >
                {siteConfig.email.artistic}
              </a>
              <div className="mt-7">
                <ContactForm kind="artistic" copy={formCopy} />
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      {/* Registered office — single Pompeii-red panel, no empty 2-col grid */}
      <section className="relative bg-[color:var(--color-pompeiano)] text-[color:var(--color-travertino)]">
        <div className="container-site grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] opacity-80">
                {it ? "Dove siamo" : "Where we are"}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] opacity-70">
                {it ? "SEDE LEGALE" : "REGISTERED OFFICE"}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8 md:flex md:flex-col md:justify-center">
            <FadeIn delay={0.1}>
              <h2 className="bodoni-italic text-[clamp(4rem,10vw+1rem,9rem)] leading-[0.92]">
                Aberdeen
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-[44ch] bodoni-italic text-[clamp(1.25rem,1.6vw+0.5rem,1.65rem)] leading-[1.3] opacity-95">
                {it
                  ? "Sede legale della charity. Operiamo in tutta la Scozia."
                  : "Registered charity office. We operate across Scotland."}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.22em] opacity-80">
                Scotland · United Kingdom
              </p>
            </FadeIn>
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
