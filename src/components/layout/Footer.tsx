"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { siteConfig } from "@/lib/utils";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

const FOOTER_PARTNERS = [
  { src: "/partners/maeci-consolato-edinburgh.png", alt: "Consolato Generale d'Italia, Edimburgo" },
  { src: "/partners/comites.png", alt: "Com.It.Es. Scotland" },
  { src: "/partners/valvona-crolla.png", alt: "Valvona & Crolla, Edimburgo" },
  { src: "/partners/london-one-radio.jpg", alt: "London ONE Radio" },
  { src: "/partners/italian-scotland.jpg", alt: "Italia Scozia" },
] as const;

// Treat the bare-host placeholders that ship in lib/utils.ts as "not set yet"
// so we don't render dead social chips while the real URLs are pending.
function isRealSocialUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.pathname !== "/" && u.pathname.length > 1;
  } catch {
    return false;
  }
}

/**
 * Footer v2 — deep-blue stage. Inter only.
 * Structure: brand + tagline · newsletter · contacts · locations · legal.
 * Glass-on-blue chips for socials and CTA. Hairline rules between blocks.
 */
export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const fb = isRealSocialUrl(siteConfig.social.facebook) ? siteConfig.social.facebook : null;
  const ig = isRealSocialUrl(siteConfig.social.instagram) ? siteConfig.social.instagram : null;
  const isHomepage = pathname === "/en" || pathname === "/it";

  return (
    <footer className="relative bg-[color:var(--color-notte)] text-white">
      {/* Subtle top luminosity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_0%,rgba(167,192,224,0.12)_0%,transparent_60%)]"
      />

      <div className="container-site relative grid gap-14 pb-12 pt-20 md:grid-cols-12 md:gap-10 md:pt-24">
        {/* Brand + tagline + socials */}
        <div className="md:col-span-5">
          <Wordmark variant="stacked" tone="cream" />
          <p className="mt-7 max-w-md text-[1.02rem] leading-[1.6] text-white/80">
            {t("footer.tagline")}
          </p>

          {fb || ig ? (
            <div className="mt-7 flex items-center gap-2.5">
              {fb ? (
                <a
                  href={fb}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/85 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[color:var(--color-notte)]"
                >
                  <Facebook size={16} strokeWidth={1.6} />
                </a>
              ) : null}
              {ig ? (
                <a
                  href={ig}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/85 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[color:var(--color-notte)]"
                >
                  <Instagram size={16} strokeWidth={1.6} />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
            {t("home.newsletterEyebrow")}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-inter)] text-[1.45rem] font-light leading-[1.18] tracking-[-0.02em] text-white">
            {t("home.newsletterTitle")}
          </h3>
          <div className="mt-5">
            <NewsletterForm tone="dark" />
          </div>
          <p className="mt-4 max-w-xs font-[family-name:var(--font-mono)] text-[0.68rem] leading-[1.6] tracking-[0.02em] text-white/55">
            {t("newsletter.privacy")}
          </p>
        </div>

        {/* Contacts + Locations + Support */}
        <div className="space-y-9 md:col-span-3">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
              {t("footer.contact")}
            </p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              <li>
                <a
                  className="hover-underline inline-flex items-center gap-1.5 text-white/90 hover:text-white"
                  href={`mailto:${siteConfig.email.general}`}
                >
                  {siteConfig.email.general}
                </a>
              </li>
              <li>
                <a
                  className="hover-underline inline-flex items-center gap-1.5 text-white/90 hover:text-white"
                  href={`mailto:${siteConfig.email.artistic}`}
                >
                  {siteConfig.email.artistic}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[color:var(--color-cielo)]">
              {t("contact.locationsTitle")}
            </p>
            <p className="mt-4 text-[0.95rem] text-white">
              <span>{siteConfig.registeredOffice.city}</span>
              <span className="ml-2 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.16em] text-white/55">
                {siteConfig.registeredOffice.country}
              </span>
            </p>
            <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.16em] text-white/55">
              {t("footer.coverage")}
            </p>
          </div>

          <div>
            <Link
              href="/sostienici"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-[family-name:var(--font-inter)] text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:border-white hover:bg-white hover:text-[color:var(--color-notte)]"
            >
              {t("nav.support")}
              <ArrowUpRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>

      {!isHomepage ? (
        <div className="relative border-t border-white/10">
          <div className="container-site py-8">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {FOOTER_PARTNERS.map((p) => (
                <li
                  key={p.src}
                  className="group relative flex aspect-[3/2] items-center justify-center rounded-[var(--radius-md)] border border-white/12 bg-white p-3 transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-0.5 hover:border-[color:var(--color-ocra)]/60"
                  title={p.alt}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 13vw, 40vw"
                      className="object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Bottom bar — legal */}
      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-3 py-6 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.08em] text-white/55 md:flex-row md:items-center">
          <span>
            &copy; {year} {siteConfig.legalName} &middot; Charity No. {siteConfig.charityNumber}
          </span>
          <span className="opacity-90">{t("footer.coverage")}</span>
        </div>
      </div>
    </footer>
  );
}
