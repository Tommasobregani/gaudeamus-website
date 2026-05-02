import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { siteConfig } from "@/lib/utils";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

/**
 * Footer rebuild per Eva's "vivace ma sobrio" brief and the meeting directives:
 *  - Lighter, paper-tone glass surface (was: heavy charcoal sepia / opera-house formal).
 *  - Newsletter, contact, social, locations, legal in a clear hierarchy.
 *  - Finance email is NOT shown publicly per Eva (artistic + general only).
 *  - Facebook + Instagram icons added per Eva's request.
 */
export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-[color:var(--color-sepia)]/10 bg-[color:var(--color-carta)] text-[color:var(--color-sepia)]">
      {/* hairline rosso accent at top — the only visual splash */}
      <span aria-hidden className="block h-[3px] w-full bg-gradient-to-r from-transparent via-[color:var(--color-pompeiano)]/60 to-transparent" />

      <div className="container-site grid gap-14 pb-12 pt-16 md:grid-cols-12 md:gap-10 md:pt-20">
        {/* Brand + tagline */}
        <div className="md:col-span-5">
          <Wordmark variant="stacked" />
          <p className="mt-8 max-w-md text-[1.05rem] leading-[1.55] text-[color:var(--color-sepia-soft)]">
            {t("footer.tagline")}
          </p>

          {/* Socials */}
          <div className="mt-7 flex items-center gap-2">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-sepia)]/12 bg-[color:var(--color-travertino)] text-[color:var(--color-sepia)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-pompeiano)] hover:bg-[color:var(--color-pompeiano)] hover:text-white"
            >
              <Facebook size={17} strokeWidth={1.6} />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--color-sepia)]/12 bg-[color:var(--color-travertino)] text-[color:var(--color-sepia)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-pompeiano)] hover:bg-[color:var(--color-pompeiano)] hover:text-white"
            >
              <Instagram size={17} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("home.newsletterEyebrow")}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] font-medium leading-[1.15] tracking-[-0.02em] text-[color:var(--color-sepia)]">
            {t("home.newsletterTitle")}
          </h3>
          <div className="mt-5">
            <NewsletterForm tone="light" />
          </div>
          <p className="mt-4 max-w-xs font-[family-name:var(--font-mono)] text-[0.7rem] leading-[1.6] tracking-[0.02em] text-[color:var(--color-muted)]">
            {t("newsletter.privacy")}
          </p>
        </div>

        {/* Contacts + Locations + Legal */}
        <div className="md:col-span-3 space-y-9">
          <div>
            <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
              {t("footer.contact")}
            </p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              <li>
                <a
                  className="hover-underline inline-flex items-center gap-1.5 text-[color:var(--color-sepia)]"
                  href={`mailto:${siteConfig.email.general}`}
                >
                  {siteConfig.email.general}
                </a>
              </li>
              <li>
                <a
                  className="hover-underline inline-flex items-center gap-1.5 text-[color:var(--color-sepia)]"
                  href={`mailto:${siteConfig.email.artistic}`}
                >
                  {siteConfig.email.artistic}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
              {t("contact.locationsTitle")}
            </p>
            <p className="mt-4 text-[0.95rem]">
              <span className="text-[color:var(--color-sepia)]">
                {siteConfig.registeredOffice.city}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.18em] text-[color:var(--color-muted)]">
                {" · "}
                {siteConfig.registeredOffice.country}
              </span>
            </p>
            <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.16em] text-[color:var(--color-muted)]">
              {t("footer.coverage")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/sostienici"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-pompeiano)]/30 bg-transparent px-4 py-2 font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-pompeiano)] transition-all duration-300 hover:bg-[color:var(--color-pompeiano)] hover:text-white"
            >
              {t("nav.support")}
              <ArrowUpRight size={13} strokeWidth={1.8} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar — legal + signature */}
      <div className="border-t border-[color:var(--color-sepia)]/10">
        <div className="container-site flex flex-col items-start justify-between gap-3 py-6 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.08em] text-[color:var(--color-muted)] md:flex-row md:items-center">
          <span>
            &copy; {year} {siteConfig.legalName} &middot; Charity No. {siteConfig.charityNumber}
          </span>
          <span className="opacity-75">
            {t("footer.coverage")}
          </span>
        </div>
      </div>
    </footer>
  );
}
