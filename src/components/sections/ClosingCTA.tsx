"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

const PARTNERS = [
  { src: "/partners/maeci-consolato-edinburgh.png", alt: "Consolato Generale d'Italia, Edimburgo" },
  { src: "/partners/comites.png", alt: "Com.It.Es. Scotland" },
  { src: "/partners/consolato-aberdeen.jpg", alt: "Consolato Onorario di Aberdeen" },
  { src: "/partners/valvona-crolla.png", alt: "Valvona & Crolla, Edimburgo" },
  { src: "/partners/london-one-radio.jpg", alt: "London ONE Radio" },
] as const;

export function ClosingCTA() {
  const t = useTranslations("home");
  const locale = useLocale();
  const it = locale === "it";

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-notte)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_18%_28%,rgba(167,192,224,0.22)_0%,transparent_60%)]"
      />

      <div className="container-site relative py-24 md:py-32">
        {/* ═══ Headline + body + primary CTA ═══ */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-8">
            <FadeIn>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
                <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-cielo)]">
                  {t("closingEyebrow")}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                className="mt-6 max-w-[22ch] font-[family-name:var(--font-inter)] font-light text-[clamp(2.1rem,4.4vw+0.5rem,4.2rem)] leading-[1.05] tracking-[-0.025em] text-white"
                style={{ overflowWrap: "break-word" }}
              >
                {t("closingTitle")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-6 max-w-[58ch] text-[1.02rem] leading-[1.7] text-white/80">
                {it
                  ? "Gaudeamus vive grazie a chi sceglie di sostenere il teatro italiano fuori dall'Italia. Anche piccoli contributi tengono accesa la sala, la lingua, la comunità."
                  : "Gaudeamus is kept alive by people who choose to support Italian theatre outside of Italy. Even small contributions keep the stage, the language and the community lit."}
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-9">
                <ButtonLink
                  href="/contatti"
                  variant="primary"
                  size="lg"
                  withArrow
                  className="!bg-white !text-[color:var(--color-notte)] hover:!bg-[color:var(--color-cielo)]"
                >
                  {t("closingCtaPrimary")}
                </ButtonLink>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ═══ Credentials + inline newsletter ═══ */}
        <FadeIn delay={0.28}>
          <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:mt-20 md:grid-cols-12 md:gap-14">
            {/* Credentials — flat editorial cells, no glass */}
            <div className="md:col-span-7">
              <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
                {it ? "Riconoscimenti" : "Recognised by"}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-2">
                <Credential
                  primary={t("trust.charity")}
                  secondary={t("trust.charityNumber")}
                />
                <Credential
                  primary={t("trust.regulator")}
                  secondary={t("trust.regulatorNote")}
                />
                <Credential
                  primary={t("trust.bank")}
                  secondary={t("trust.bankNote")}
                />
                <Credential
                  primary={t("trust.consolare")}
                  secondary={t("trust.consolareNote")}
                />
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-5">
              <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
                {t("newsletter.eyebrow")}
              </p>
              <p className="mt-4 max-w-[34ch] font-[family-name:var(--font-inter)] text-[1.05rem] font-light leading-[1.3] tracking-[-0.012em] text-white">
                {t("newsletter.title")}
              </p>
              <div className="mt-5">
                <NewsletterForm tone="dark" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ═══ Partners ═══ */}
        <FadeIn delay={0.35}>
          <div className="mt-16 border-t border-white/15 pt-10 md:mt-20">
            <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
              {t("partnersLabel")}
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {PARTNERS.map((p) => (
                <li
                  key={p.src}
                  className="group relative flex aspect-[3/2] items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-cielo)]/30 bg-[color:var(--color-travertino)] p-3.5 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-0.5 hover:border-[color:var(--color-ocra)]/50 hover:shadow-[0_18px_40px_rgba(8,26,49,0.35)]"
                  title={p.alt}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
              <p className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-white/65">
                {t("partnersExtra")}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Credential({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <li className="border-t border-white/15 pt-4">
      <p className="font-[family-name:var(--font-inter)] text-[0.92rem] font-medium leading-[1.25] tracking-[-0.005em] text-white">
        {primary}
      </p>
      <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[0.66rem] tracking-[0.16em] text-white/65">
        {secondary}
      </p>
    </li>
  );
}
