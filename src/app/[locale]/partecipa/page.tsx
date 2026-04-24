import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/FadeIn";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { Fregio } from "@/components/brand/Fregio";
import { SubmissionForm } from "./SubmissionForm";
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
  const it = locale === "it";
  return {
    title: it ? "Partecipa" : "Participate",
    description: it
      ? "Invia foto, video (YouTube o upload), articoli o segnalazioni di eventi alla comunità Gaudeamus."
      : "Submit photos, videos (YouTube or upload), articles or event notes to the Gaudeamus community.",
    alternates: {
      canonical: `${siteConfig.url}/${locale}/partecipa`,
      languages: {
        en: `${siteConfig.url}/en/partecipa`,
        it: `${siteConfig.url}/it/partecipa`,
      },
    },
  };
}

export default async function ParticipatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const it = locale === "it";

  const kinds = [
    {
      roman: "01",
      code: "photo",
      label: it ? "FOTO" : "PHOTO",
      note: it ? "Uno o più scatti da un evento o dalle quinte." : "One or more shots from an event or the wings.",
    },
    {
      roman: "02",
      code: "video",
      label: "VIDEO",
      note: it ? "Link YouTube o file caricato." : "YouTube link or uploaded file.",
    },
    {
      roman: "03",
      code: "article",
      label: it ? "ARTICOLO" : "ARTICLE",
      note: it ? "Un testo, una riflessione, una cronaca." : "An essay, a reflection, a dispatch.",
    },
    {
      roman: "04",
      code: "event",
      label: it ? "EVENTO" : "EVENT",
      note: it ? "Segnala un evento della comunità." : "Flag an event from the community.",
    },
  ];

  return (
    <>
      <section className="container-site pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="border-y-2 border-[color:var(--color-sepia)] py-5">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-cartel)] text-[0.75rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
              {it ? "PARTECIPA ALLA COMUNITÀ" : "JOIN THE COMMUNITY"}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia)]">
              {it ? "MODERATO · PUBBLICATO A DISCREZIONE" : "MODERATED · EDITORIAL REVIEW"}
            </span>
          </div>
        </div>

        <FadeIn>
          <h1 className="mt-10 max-w-[20ch] display-mixed text-[clamp(3rem,8vw+1rem,9rem)] leading-[0.94]">
            {it ? (
              <>La comunità <em>scrive</em> con noi.</>
            ) : (
              <>The community <em>writes</em> with us.</>
            )}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.15rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {it
                ? "Se hai scattato una foto a una nostra serata, se hai ripreso uno spettacolo, se hai voglia di scrivere un pezzo sulla comunità italo-scozzese: mandacelo da qui. Ogni proposta passa dal tavolo editoriale prima di essere pubblicata sul sito."
                : "If you took a photo at one of our evenings, filmed a performance, or want to write about the Italo-Scottish community: send it here. Every submission passes our editorial table before it is published."}
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <Fregio width={240} />
          </div>
        </FadeIn>
      </section>

      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <FadeIn>
          <RomanEyebrow n={1} label={it ? "Cosa puoi inviare" : "What you can send"} />
        </FadeIn>
        <div className="mt-10 grid gap-0 border-t-2 border-[color:var(--color-sepia)] sm:grid-cols-2 md:grid-cols-4">
          {kinds.map((k, i) => (
            <FadeIn key={k.code} delay={i * 0.05}>
              <article
                className={
                  "flex h-full flex-col border-b border-[color:var(--color-sepia)]/25 p-6 md:border-b-0 md:p-8 " +
                  (i < 3 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
                }
              >
                <span className="bodoni-italic text-[2.25rem] leading-none text-[color:var(--color-terracotta)]">
                  {k.roman}
                </span>
                <span className="mt-4 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-sepia)]">
                  {k.label}
                </span>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
                  {k.note}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <RomanEyebrow n={2} label={it ? "Il modulo" : "The form"} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 max-w-[18ch] display-mixed text-[clamp(2rem,3vw+1rem,3rem)] leading-[1.05]">
                {it ? (
                  <>Proponi <em>qualcosa</em>.</>
                ) : (
                  <>Propose <em>something</em>.</>
                )}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-[40ch] font-[family-name:var(--font-body)] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
                {it
                  ? "Per inviare hai bisogno di un account. Serve solo email e una password — lo usiamo per ricontattarti se il tuo contenuto viene pubblicato."
                  : "To submit you need an account. Just an email and password — we use it to reach you when your content gets published."}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <SubmissionForm />
          </div>
        </div>
      </section>

      <div className="container-site py-14">
        <div className="flex justify-center">
          <Fregio width={200} tone="terracotta" />
        </div>
      </div>
    </>
  );
}
