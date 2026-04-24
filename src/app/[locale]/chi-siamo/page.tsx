import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { MottoBanner } from "@/components/brand/MottoBanner";
import { PullQuote } from "@/components/brand/PullQuote";
import { Timeline } from "@/components/brand/Timeline";
import { staff } from "@/content/staff";
import { gaudeamusIgitur } from "@/content/mottos";
import { timelineEntries } from "@/content/timeline";
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
  const t = await getTranslations({ locale, namespace: "about" });
  const path = "chi-siamo";
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${path}`,
      languages: {
        en: `${siteConfig.url}/en/chi-siamo`,
        it: `${siteConfig.url}/it/chi-siamo`,
      },
    },
  };
}

export default async function ChiSiamoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = locale as Locale;

  const articles = [
    {
      n: "I",
      title: locale === "it" ? "L'arte prima di tutto" : "Art first",
      body:
        locale === "it"
          ? "Il teatro, la lingua e la performance dal vivo vengono prima. Il mestiere è la nostra cornice. Ciò che portiamo in scena non è una dimostrazione culturale: è un atto artistico."
          : "Theatre, language and live performance come before everything else. Craft is our frame. What we bring to the stage is not a cultural demonstration — it is an artistic act.",
    },
    {
      n: "II",
      title: locale === "it" ? "Sempre comunità" : "Community always",
      body:
        locale === "it"
          ? "Costruiamo stanze dove voci italiane e scozzesi si incontrano davvero. Non organizziamo eventi per una diaspora: organizziamo incontri fra due culture che hanno ancora cose da dirsi."
          : "We build rooms where Italian and Scottish voices actually meet. We don't host events for a diaspora: we host encounters between two cultures that still have things to tell each other.",
    },
    {
      n: "III",
      title: locale === "it" ? "Porta aperta" : "Open door",
      body:
        locale === "it"
          ? "Bilingue dove possiamo, sempre accoglienti. Non serve parlare italiano per sentirsi a casa da Gaudeamus — serve solo voler ascoltare."
          : "Bilingual where we can, welcoming always. You do not need to speak Italian to belong here — you only need to want to listen.",
    },
    {
      n: "IV",
      title: locale === "it" ? "Senza fretta" : "Unhurried",
      body:
        locale === "it"
          ? "Non inseguiamo la settimana. Lavoriamo per stagioni. Una produzione che vale la pena richiede tempo, e la cultura italiana non ha bisogno di essere consumata — ha bisogno di essere abitata."
          : "We do not chase the week. We work in seasons. Work worth making takes time, and Italian culture does not need to be consumed — it needs to be inhabited.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: `/${locale}` },
          {
            name: t("eyebrow"),
            href: `/${locale}/${"chi-siamo"}`,
          },
        ])}
      />

      {/* Opening — motto + title */}
      <section className="container-site pt-16 pb-20 md:pt-20 md:pb-28">
        <FadeIn>
          <RomanEyebrow label={t("eyebrow")} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-8 max-w-[18ch] display-mixed text-[clamp(3rem,8vw+1rem,9rem)] leading-[0.94]">
            {locale === "it" ? (
              <>Una charity <em>per la cultura italiana</em>, costruita in <em>Scozia</em>.</>
            ) : (
              <>A charity <em>for Italian culture</em>, built in <em>Scotland</em>.</>
            )}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.2rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* MOTTO — Gaudeamus igitur */}
      <section className="relative border-y border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)] py-24 md:py-32">
        <div className="container-prose">
          <FadeIn>
            <p className="text-center font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-terracotta)]">
              {locale === "it" ? "Il nome" : "The name"}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <MottoBanner
              className="mt-10"
              latin={gaudeamusIgitur.latin}
              translation={gaudeamusIgitur.translation[loc]}
              attribution={gaudeamusIgitur.attribution}
            />
          </FadeIn>
        </div>
      </section>

      {/* Mission — opening big statement */}
      <section className="container-site py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <RomanEyebrow n={1} label={t("missionTitle")} />
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <p className="bodoni-italic text-[clamp(1.95rem,3vw+1rem,3.25rem)] leading-[1.12] text-[color:var(--color-sepia)]">
                {t("missionBody")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Articoli del manifesto — numbered articles */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-24 md:py-32">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <RomanEyebrow n={2} label={locale === "it" ? "Articoli del manifesto" : "Articles of the manifesto"} />
              <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                {locale === "it" ? "Art. I — IV" : "Art. I — IV"}
              </span>
            </div>
          </FadeIn>

          <Stagger className="mt-14 grid gap-0 md:grid-cols-2">
            {articles.map((a, i) => (
              <StaggerItem
                key={a.n}
                className={
                  "border-t-2 border-[color:var(--color-sepia)] p-8 md:p-10 " +
                  (i % 2 === 0
                    ? "md:border-r md:border-r-[color:var(--color-sepia)]/25"
                    : "")
                }
              >
                <div className="flex items-baseline gap-5">
                  <span className="bodoni-italic text-[3rem] leading-none text-[color:var(--color-terracotta)]">
                    {a.n}
                  </span>
                  <span className="font-[family-name:var(--font-cartel)] text-[0.8rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
                    {locale === "it" ? "Articolo" : "Article"} {a.n}
                  </span>
                </div>
                <h3 className="mt-6 bodoni-italic text-[clamp(1.75rem,2.25vw+1rem,2.5rem)] leading-[1.1] text-[color:var(--color-sepia)]">
                  {a.title}
                </h3>
                <p className="mt-5 max-w-[52ch] font-[family-name:var(--font-body)] text-[1.05rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                  {a.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.2}>
            <div className="mt-16 flex justify-center">
              <Fregio width={240} tone="terracotta" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pull quote breaker */}
      <section className="container-site py-24 md:py-32">
        <FadeIn>
          <PullQuote
            quote={
              locale === "it"
                ? "Non organizziamo eventi per una diaspora. Organizziamo incontri fra due culture."
                : "We do not stage events for a diaspora. We stage encounters between two cultures."
            }
            attribution={locale === "it" ? "Gaudeamus — Compagnia Artistica" : "Gaudeamus — Compagnia Artistica"}
          />
        </FadeIn>
      </section>

      {/* Annali — Timeline */}
      <section className="relative border-y border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <FadeIn>
                <RomanEyebrow n={3} label={locale === "it" ? "Annali" : "Annals"} />
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="mt-6 bodoni-italic text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.02] text-[color:var(--color-sepia)]">
                  {locale === "it" ? "Anno per anno." : "Year by year."}
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 max-w-[36ch] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                  {locale === "it"
                    ? "Una breve cronologia di ciò che abbiamo messo in scena, chi abbiamo invitato e dove siamo stati."
                    : "A short chronicle of what we have staged, whom we have invited and where we have been."}
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <Timeline entries={timelineEntries[loc]} />
            </div>
          </div>
        </div>
      </section>

      {/* Le persone — Staff as playbill cast */}
      <section className="container-site py-24 md:py-32">
        <FadeIn>
          <RomanEyebrow n={4} label={t("staffTitle")} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 max-w-[22ch] bodoni-italic text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.05] text-[color:var(--color-sepia)]">
            {locale === "it" ? "Chi fa Gaudeamus." : "The people behind Gaudeamus."}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-[58ch] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
            {t("staffBody")}
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid grid-cols-1 gap-0 border-t-2 border-[color:var(--color-sepia)] sm:grid-cols-2">
          {staff.map((p, i) => (
            <StaggerItem key={p.name}>
              <article
                className={
                  "flex flex-col border-b border-[color:var(--color-sepia)]/25 p-8 " +
                  (i % 2 === 0 ? "sm:border-r sm:border-r-[color:var(--color-sepia)]/25" : "")
                }
              >
                <div className="flex items-baseline justify-between">
                  <span className="bodoni-italic text-[2rem] leading-none text-[color:var(--color-terracotta)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia)]">
                    {p.city.toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-5 bodoni-italic text-[1.85rem] leading-[1.05] text-[color:var(--color-sepia)]">
                  {p.name}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-body)] italic text-[1rem] text-[color:var(--color-sepia-soft)]">
                  {p.role[loc]}
                </p>
                <p className="mt-5 text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
                  {p.bio[loc]}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Dicono di noi — press strip */}
      <section className="relative border-t border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)]">
        <div className="container-site py-24 md:py-32">
          <FadeIn>
            <RomanEyebrow n={5} label={t("pressTitle")} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 max-w-[28ch] bodoni-italic text-[clamp(2.25rem,3.5vw+1rem,3.75rem)] leading-[1.08] text-[color:var(--color-sepia)]">
              {t("pressBody")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative mt-16 aspect-[21/9] w-full overflow-hidden bg-[color:var(--color-terracotta-deep)] duotone">
              <Image
                src="/events/no-shakespeare/no-shakespeare-07.jpg"
                alt="Gaudeamus — pubblico"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Fregio width={200} tone="terracotta" />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
