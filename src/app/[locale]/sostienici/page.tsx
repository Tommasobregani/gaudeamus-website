import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { BenefactorTier } from "@/components/brand/BenefactorTier";
import { PullQuote } from "@/components/brand/PullQuote";
import { ButtonLink } from "@/components/ui/Button";
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
  const t = await getTranslations({ locale, namespace: "support" });
  const path = "sostienici";
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
      languages: {
        en: `${siteConfig.url}/en/sostienici`,
        it: `${siteConfig.url}/it/sostienici`,
      },
    },
  };
}

export default async function SostieniciPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "support" });
  const it = locale === "it";

  const tiers = [
    {
      roman: "I",
      label: it ? "AMICO" : "FRIEND",
      subtitle: it ? "Amici di Gaudeamus" : "Friends of Gaudeamus",
      amount: it ? "da £20 / anno" : "from £20 / year",
      featured: false,
      perks: it
        ? [
            "Newsletter dedicata con le nostre note di regia",
            "Accesso in anteprima alle date della stagione",
            "Ringraziamento in calce alla locandina annuale",
          ]
        : [
            "A dedicated newsletter with our director's notes",
            "Early access to season dates",
            "A thank-you at the foot of our annual playbill",
          ],
    },
    {
      roman: "II",
      label: it ? "SOSTENITORE" : "SUPPORTER",
      subtitle: it ? "Sostenitori" : "Supporters",
      amount: it ? "da £80 / anno" : "from £80 / year",
      featured: true,
      perks: it
        ? [
            "Tutto quanto offerto agli Amici",
            "Invito alle prove generali riservate ai sostenitori",
            "Un biglietto in omaggio per una produzione a scelta",
            "Nome inserito fra i Sostenitori della stagione",
          ]
        : [
            "Everything offered to Friends",
            "Invitation to supporter-only dress rehearsals",
            "One complimentary ticket to a production of your choice",
            "Your name among the season's Supporters",
          ],
    },
    {
      roman: "III",
      label: it ? "MECENATE" : "PATRON",
      subtitle: it ? "Mecenati della compagnia" : "Patrons of the company",
      amount: it ? "da £300 / anno" : "from £300 / year",
      featured: false,
      perks: it
        ? [
            "Tutto quanto offerto ai Sostenitori",
            "Incontro annuale con la direzione artistica",
            "Possibilità di dedicare una serata a una persona cara",
            "Ringraziamento visibile nel programma di ogni produzione",
          ]
        : [
            "Everything offered to Supporters",
            "Annual meeting with the artistic direction",
            "Option to dedicate an evening to someone you love",
            "A visible thank-you in the programme of every production",
          ],
    },
  ];

  const otherWays = [
    {
      roman: "IV",
      title: it ? "Fai volontariato" : "Volunteer",
      body: it
        ? "Accogli, traduci, allestisci, costruisci. Le nostre produzioni si fanno in molti — se hai mani e tempo da offrire, ti aspettiamo."
        : "Welcome, translate, steward, build. Our productions are made by many hands — if you have hands and time to give, we are waiting for you.",
    },
    {
      roman: "V",
      title: it ? "Porta un amico" : "Bring a friend",
      body: it
        ? "Il passaparola resta il nostro miglior teatro. Vieni a un evento, porta qualcuno, scrivi di noi, taggaci. È semplice e funziona."
        : "Word of mouth is still our best theatre. Come to an event, bring someone, write about us, tag us. It is simple and it works.",
    },
    {
      roman: "VI",
      title: it ? "Collabora" : "Collaborate",
      body: it
        ? "Sei una compagnia, una scuola, un'università, un luogo? Parliamone. Le coproduzioni tengono viva una charity piccola come la nostra."
        : "Are you a company, a school, a university, a venue? Let's talk. Co-productions keep a charity as small as ours alive.",
    },
  ];

  return (
    <>
      {/* Cartello */}
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="border-y-2 border-[color:var(--color-sepia)] py-5">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              {it ? "SOSTIENICI" : "SUPPORT US"}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
              CHARITY · SCIO · SCOTLAND
            </span>
          </div>
        </div>

        <FadeIn>
          <h1 className="mt-10 max-w-[16ch] display-mixed text-[clamp(3rem,8vw+1rem,9rem)] leading-[0.94]">
            {it ? (
              <>Tieni viva <em>l'italianità</em>.</>
            ) : (
              <>Keep alive <em>italian culture</em>.</>
            )}
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

      {/* Benefactor tiers */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-20 md:py-28">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <RomanEyebrow n={1} label={it ? "Come sostenerci" : "Ways to give"} />
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-terracotta)]">
              {t("comingSoon")}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 max-w-[22ch] bodoni-italic text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.05] text-[color:var(--color-sepia)]">
            {it ? "Tre modi di far parte di Gaudeamus." : "Three ways to be part of Gaudeamus."}
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {tiers.map((tier) => (
            <StaggerItem key={tier.roman}>
              <BenefactorTier
                roman={tier.roman}
                label={tier.label}
                subtitle={tier.subtitle}
                amount={tier.amount}
                perks={tier.perks}
                featured={tier.featured}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-[48ch] font-[family-name:var(--font-body)] italic text-[0.95rem] text-[color:var(--color-sepia-soft)]">
            {it
              ? "Il canale sicuro per le donazioni online sarà aperto a breve. Nel frattempo, scrivi al nostro team finance — ti guideremo passo passo."
              : "Our secure online donation channel will open shortly. In the meantime, write to our finance team — we will walk you through it."}
          </p>
        </FadeIn>
      </section>

      {/* Grazie — testimonial pull-quote */}
      <section className="relative border-y border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-24 md:py-32">
          <FadeIn>
            <RomanEyebrow n={2} label={it ? "Il nostro grazie" : "Our thanks"} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <PullQuote
              quote={
                it
                  ? "Senza chi crede in noi, il sipario resta chiuso. Grazie a ogni amico, sostenitore e mecenate che ci permette di aprirlo."
                  : "Without the people who believe in us, the curtain stays closed. Thank you to every friend, supporter and patron who lets us open it."
              }
              attribution={it ? "La direzione artistica" : "The artistic direction"}
            />
          </FadeIn>
        </div>
      </section>

      {/* Other ways to help */}
      <section className="container-site py-20 md:py-28">
        <FadeIn>
          <RomanEyebrow n={3} label={it ? "Non solo donazioni" : "Not only donations"} />
        </FadeIn>
        <div className="mt-12 grid gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-3">
          {otherWays.map((w, i) => (
            <FadeIn key={w.roman} delay={i * 0.08}>
              <article
                className={
                  "flex h-full flex-col border-b border-[color:var(--color-sepia)]/25 p-8 md:p-10 md:border-b-0 " +
                  (i < otherWays.length - 1 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
                }
              >
                <span className="bodoni-italic text-[3rem] leading-none text-[color:var(--color-terracotta)]">
                  {w.roman}
                </span>
                <h3 className="mt-6 bodoni-italic text-[1.85rem] leading-[1.1] text-[color:var(--color-sepia)]">
                  {w.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                  {w.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-terracotta)]">
        <div className="container-site grid gap-10 py-20 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-travertino)]/80">
              {it ? "FATTI SENTIRE" : "GET IN TOUCH"}
            </p>
            <h2 className="mt-6 max-w-[22ch] bodoni-italic text-[clamp(2.25rem,4vw+1rem,4rem)] leading-[1.04] text-[color:var(--color-travertino)]">
              {it ? "Ogni contributo scrive la prossima stagione." : "Every contribution writes the next season."}
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:items-end">
            <div className="flex flex-wrap items-center gap-5">
              <ButtonLink
                href="/contatti"
                className="!bg-[color:var(--color-travertino)] !text-[color:var(--color-sepia)] hover:!bg-[color:var(--color-travertino)]/90"
                withArrow
              >
                {t("contactCta")}
              </ButtonLink>
              <a
                className="hover-underline font-[family-name:var(--font-body)] italic text-[1.1rem] text-[color:var(--color-travertino)]"
                href={`mailto:${siteConfig.email.finance}`}
              >
                {siteConfig.email.finance}
              </a>
            </div>
          </div>
        </div>
        <div className="grano" aria-hidden />
      </section>

      <div className="container-site py-16">
        <div className="flex justify-center">
          <Fregio width={240} tone="terracotta" />
        </div>
      </div>
    </>
  );
}
