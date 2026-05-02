import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { GiftAidForm } from "@/components/forms/GiftAidForm";
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
  const t = await getTranslations({ locale, namespace: "giftAid" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/sostienici/gift-aid`,
      languages: {
        en: `${siteConfig.url}/en/sostienici/gift-aid`,
        it: `${siteConfig.url}/it/sostienici/gift-aid`,
      },
    },
  };
}

export default async function GiftAidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "giftAid" });
  const tS = await getTranslations({ locale, namespace: "support" });

  return (
    <>
      <section className="container-site pt-10 md:pt-14">
        <Link
          href="/sostienici"
          className="hover-underline inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-sepia-soft)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {tS("eyebrow")}
        </Link>
      </section>

      <section className="container-site pt-10 pb-12 md:pt-14 md:pb-16">
        <FadeIn>
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("eyebrow")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1
            className="mt-8 max-w-[20ch] min-w-0 font-[family-name:var(--font-display)] font-medium leading-[0.96] tracking-[-0.025em] text-[clamp(2.4rem,5.4vw+1rem,5.25rem)] text-[color:var(--color-sepia)]"
            style={{ overflowWrap: "break-word" }}
          >
            {t("title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="md:col-span-8 md:col-start-5 text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("lead")}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Per Eva: skip the long explainer (Gift Aid is normal in UK culture and the
          detailed tax math risks confusing international audiences). Show the form. */}
      <section className="container-site border-t border-[color:var(--color-sepia)]/25 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
              {t("formTitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8">
              <GiftAidForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lloyds Bank — donation instructions paired with the Gift Aid declaration */}
      <section className="border-t border-[color:var(--color-sepia)]/15 bg-[color:var(--color-cielo)] py-16 md:py-20">
        <div className="container-site grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
                {locale === "it" ? "Bonifico Lloyds Bank" : "Lloyds Bank transfer"}
              </p>
              <p className="mt-6 max-w-[36ch] bodoni-italic text-[1.1rem] leading-[1.45] text-[color:var(--color-sepia)]">
                {locale === "it"
                  ? "La dichiarazione Gift Aid vale per le donazioni passate, presenti e future. Manda il bonifico al nostro conto charity Lloyds Bank."
                  : "The Gift Aid declaration covers past, present and future donations. Send the transfer to our Lloyds Bank charity account."}
              </p>
            </FadeIn>
          </div>
          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              {siteConfig.bank.accountNumber && siteConfig.bank.sortCode ? (
                <div className="border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] p-6 md:p-8">
                  <dl className="space-y-4 font-[family-name:var(--font-mono)] text-[0.92rem]">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="text-[color:var(--color-sepia-soft)]">
                        {locale === "it" ? "Intestatario" : "Account holder"}
                      </dt>
                      <dd className="text-[color:var(--color-sepia)]">
                        {siteConfig.bank.accountHolder}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="text-[color:var(--color-sepia-soft)]">
                        {locale === "it" ? "Banca" : "Bank"}
                      </dt>
                      <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.name}</dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="text-[color:var(--color-sepia-soft)]">
                        {locale === "it" ? "Numero conto" : "Account number"}
                      </dt>
                      <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.accountNumber}</dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="text-[color:var(--color-sepia-soft)]">
                        {locale === "it" ? "Sort code" : "Sort code"}
                      </dt>
                      <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.sortCode}</dd>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <dt className="text-[color:var(--color-sepia-soft)]">
                        {locale === "it" ? "Causale" : "Reference"}
                      </dt>
                      <dd className="text-[color:var(--color-sepia)]">{siteConfig.bank.reference}</dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[color:var(--color-sepia)]/30 bg-[color:var(--color-carta)] p-6 md:p-8">
                  <p className="bodoni-italic text-[clamp(1.2rem,1.6vw+0.5rem,1.55rem)] leading-[1.3] text-[color:var(--color-sepia)]">
                    {locale === "it"
                      ? "Le coordinate del conto Lloyds Bank sono in fase di preparazione. Nel frattempo scrivi al nostro team finance e ti guideremo passo passo."
                      : "Our Lloyds Bank details are in preparation. In the meantime, write to our finance team and we'll walk you through the steps."}
                  </p>
                  <a
                    className="hover-underline mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-pompeiano)]"
                    href={`mailto:${siteConfig.email.finance}`}
                  >
                    {siteConfig.email.finance}
                  </a>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
