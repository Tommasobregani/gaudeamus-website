"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const POWER3_OUT = [0.215, 0.61, 0.355, 1] as const;

/**
 * ArtistInvite — quiet hairline strip on the homepage.
 * Companies, directors, writers, performers — pitch a project.
 * Links to /contatti with ?recipient=artistic so the contact form
 * pre-selects the artistic radio.
 */
export function ArtistInvite() {
  const t = useTranslations("home");

  return (
    <section className="container-site py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: POWER3_OUT }}
        className="border-t border-b border-[color:var(--color-sepia)]/12 py-9 md:py-12"
      >
        <div className="grid items-center gap-7 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-[color:var(--color-ocra)]" />
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.32em] text-[color:var(--color-notte)]">
                {t("artistInviteEyebrow")}
              </p>
            </div>
          </div>

          <div className="md:col-span-6">
            <p className="font-[family-name:var(--font-serif-display)] text-[clamp(1.5rem,2.4vw+0.5rem,2.4rem)] font-extralight italic leading-[1.18] tracking-[-0.012em] text-[color:var(--color-sepia)]">
              {t("artistInviteTitle")}
            </p>
            <p className="mt-4 max-w-[58ch] font-[family-name:var(--font-inter)] text-[0.98rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
              {t("artistInviteBody")}
            </p>
          </div>

          <div className="md:col-span-3 md:text-right">
            <Link
              href={{ pathname: "/contatti", hash: "artistic" }}
              className="group inline-flex items-center gap-3 font-[family-name:var(--font-inter)] text-[0.78rem] font-medium uppercase tracking-[0.24em] text-[color:var(--color-notte)]"
            >
              <span className="relative">
                {t("artistInviteCta")}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[color:var(--color-rosso)] transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-rosso)]"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
