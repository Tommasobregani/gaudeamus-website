import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Wordmark } from "@/components/brand/Wordmark";
import { Fregio } from "@/components/brand/Fregio";
import { siteConfig } from "@/lib/utils";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t-2 border-[color:var(--color-sepia)] bg-[color:var(--color-sepia)] text-[color:var(--color-travertino)]">
      {/* top fregio spanning the footer */}
      <div className="container-site pt-14">
        <Fregio width={320} tone="cream" />
      </div>

      <div className="container-site grid gap-14 pb-14 pt-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Wordmark tone="cream" variant="stacked" />
          <p className="mt-8 max-w-md bodoni-italic text-[1.75rem] leading-[1.1] text-[color:var(--color-travertino)]">
            {t("footer.tagline")}
          </p>
          <p className="mt-8 max-w-md font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[color:var(--color-travertino)]/70">
            {t("newsletter.privacy")}
          </p>
        </div>

        <div className="md:col-span-4">
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-oro-soft)]">
            {t("home.newsletterEyebrow")}
          </p>
          <h3 className="mt-4 bodoni-italic text-[1.75rem] leading-[1.1]">
            {t("home.newsletterTitle")}
          </h3>
          <div className="mt-6">
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-oro-soft)]">
            {t("footer.contact")}
          </p>
          <ul className="mt-4 space-y-1 font-[family-name:var(--font-body)] text-sm">
            <li>
              <a className="hover-underline" href={`mailto:${siteConfig.email.general}`}>
                {siteConfig.email.general}
              </a>
            </li>
            <li>
              <a className="hover-underline" href={`mailto:${siteConfig.email.artistic}`}>
                {siteConfig.email.artistic}
              </a>
            </li>
            <li>
              <a className="hover-underline" href={`mailto:${siteConfig.email.finance}`}>
                {siteConfig.email.finance}
              </a>
            </li>
          </ul>

          <p className="mt-10 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-oro-soft)]">
            {t("contact.locationsTitle")}
          </p>
          <p className="mt-4 text-sm">
            <span className="bodoni-italic text-[1.15rem] text-[color:var(--color-travertino)]">
              {siteConfig.registeredOffice.city}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[color:var(--color-travertino)]/55">
              {" · "}
              {siteConfig.registeredOffice.country}
            </span>
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.18em] text-[color:var(--color-travertino)]/55">
            {t("footer.coverage")}
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.18em] text-[color:var(--color-travertino)]/55">
            SCIO No. {siteConfig.charityNumber}
          </p>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-travertino)]/18">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.1em] text-[color:var(--color-travertino)]/60 md:flex-row md:items-center">
          <span>
            © {year} {siteConfig.legalName} · Registered Scottish charity, No. {siteConfig.charityNumber}
          </span>
        </div>
      </div>
    </footer>
  );
}
