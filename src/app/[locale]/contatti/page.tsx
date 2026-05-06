import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
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

  // Per Eva's brief: only Artistic + General are public. Finance email
  // intentionally excluded (privacy of financial inbox).
  const channels = [
    {
      roman: "01",
      title: t("generalTitle"),
      email: siteConfig.email.general,
      body: it
        ? "Informazioni generali, workshop, eventi, stampa e domande della comunità."
        : "General enquiries, workshops, events, press and community questions.",
    },
    {
      roman: "02",
      title: t("artisticTitle"),
      email: siteConfig.email.artistic,
      body: it
        ? "Proposte artistiche, coproduzioni, inviti a festival, artisti che vogliono presentare un progetto."
        : "Artistic proposals, co-productions, festival invitations, artists pitching a project.",
    },
  ];


  return (
    <>
      {/* Typographic dark-sepia masthead, matching the pattern */}
      <section className="relative bg-[color:var(--color-nero)] text-[color:var(--color-travertino)]">
        <div className="container-site grid gap-10 py-20 md:grid-cols-12 md:gap-x-14 md:gap-y-12 md:py-28">
          <div className="min-w-0 md:col-span-7">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-oro-soft)]">
                {it ? "Contatti" : "Contact"}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="mt-6 font-[family-name:var(--font-display)] font-medium leading-[0.96] tracking-[-0.025em] text-[clamp(2.6rem,5.6vw+1rem,5.25rem)]"
                style={{ overflowWrap: "break-word" }}
              >
                {it ? "Parliamone." : "Let's talk."}
              </h1>
            </FadeIn>
          </div>
          <div className="min-w-0 md:col-span-5 md:flex md:items-end">
            <FadeIn delay={0.2}>
              <p className="max-w-[44ch] text-[1.02rem] leading-[1.65] opacity-90">
                {t("lead")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Channels — three big address cards */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-24">
        <FadeIn>
          <RomanEyebrow n={1} label={it ? "Indirizzi" : "Addresses"} />
        </FadeIn>
        <Stagger className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-2">
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
                <h3 className="mt-6 font-[family-name:var(--font-display)] font-medium text-[1.85rem] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-sepia)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
                  {c.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.12}>
          <div className="mt-12">
            <ContactForm
              copy={{
                name: it ? "Nome" : "Name",
                email: it ? "Email" : "Email",
                subject: it ? "Oggetto" : "Subject",
                recipient: it ? "Destinatario" : "Recipient",
                recipientArtistic: it
                  ? "Proposta artistica — sono un artista e presento un progetto"
                  : "Artistic proposal — I'm an artist pitching a project",
                recipientGeneral: it
                  ? "Richiesta generale — laboratori, eventi, stampa, comunità"
                  : "General enquiry — workshops, events, press, community",
                message: it ? "Messaggio" : "Message",
                submit: it ? "Invia" : "Send",
                success: it
                  ? "Grazie — ti risponderemo entro qualche giorno lavorativo."
                  : "Thanks — we'll be in touch within a few working days.",
                required: "*",
              }}
            />
          </div>
        </FadeIn>
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
