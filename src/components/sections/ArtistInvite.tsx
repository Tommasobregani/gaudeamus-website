"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig, type Locale } from "@/lib/utils";

/**
 * ArtistInvite per Eva's directive: explicit channel for external artists to
 * pitch projects to the company. Lives on the homepage and points directly to
 * Eva's artistic mailbox - the contact page has a matching channel.
 *
 * "Continuare a ricevere contatti da nuovi artisti per ampliare la scuderia
 *  di produzioni" - Eva.
 */
export function ArtistInvite() {
  const locale = useLocale() as Locale;
  const it = locale === "it";
  const subject = encodeURIComponent(
    it ? "Proposta artistica - Compagnia Gaudeamus" : "Artist project pitch - Compagnia Gaudeamus",
  );
  const mailto = `mailto:${siteConfig.email.artistic}?subject=${subject}`;

  return (
    <section className="relative overflow-hidden bg-[color:var(--color-notte)] text-[color:var(--color-travertino)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-site relative grid gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}
          className="md:col-span-7"
        >
          <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-oro-soft)]">
            {it ? "Sei un artista?" : "Are you an artist?"}
          </p>
          <h2 className="mt-6 max-w-[20ch] font-[family-name:var(--font-display)] font-medium leading-[1.02] tracking-[-0.025em] text-[clamp(1.85rem,3vw+0.6rem,3.4rem)]">
            {it ? (
              <>
                Presentaci il tuo progetto.{" "}
                <span className="italic text-[color:var(--color-oro-soft)]">Ascoltiamo.</span>
              </>
            ) : (
              <>
                Pitch your project.{" "}
                <span className="italic text-[color:var(--color-oro-soft)]">We listen.</span>
              </>
            )}
          </h2>
          <p className="mt-7 max-w-[58ch] text-[1.02rem] leading-[1.65] text-[color:var(--color-travertino)]/85">
            {it
              ? "Gaudeamus non produce solo spettacoli propri: ospitiamo e facciamo circolare progetti di artisti italiani in Scozia e nel Regno Unito. Se hai uno spettacolo, un laboratorio o un'idea, scrivici alla direzione artistica."
              : "Gaudeamus is not only a producing company - we also host and circulate work by Italian artists in Scotland and the UK. If you have a show, a workshop or an idea, write to artistic direction."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.1, 1] }}
          className="md:col-span-5 md:flex md:flex-col md:justify-end md:items-end"
        >
          <a
            href={mailto}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.26em] text-[color:var(--color-oro-soft)] hover:text-[color:var(--color-travertino)]"
          >
            {siteConfig.email.artistic}
            <ArrowUpRight size={14} strokeWidth={1.7} />
          </a>
          <div className="mt-5">
            <ButtonLink
              href={mailto}
              variant="primary"
              size="lg"
              withArrow
            >
              {it ? "Scrivi alla direzione artistica" : "Write to artistic direction"}
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
