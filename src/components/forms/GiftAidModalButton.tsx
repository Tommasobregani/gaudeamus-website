"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ArrowUpRight } from "lucide-react";
import { GiftAidForm } from "./GiftAidForm";

/**
 * Gift Aid CTA + modal.
 *
 * Per Eva's 12 May 2026 brief: the Gift Aid declaration must surface inline
 * when the donor clicks "Aggiungi Gift Aid" — not as a separate page nav.
 * We use the native <dialog> for focus trap + Escape handling; the
 * /sostienici/gift-aid route stays available as a no-JS fallback and for
 * SEO/email links.
 */
export function GiftAidModalButton({
  ctaLabel,
  size = "lg",
}: {
  ctaLabel: string;
  size?: "md" | "lg";
}) {
  const t = useTranslations("giftAid");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lockedScrollY = useRef(0);
  const [open, setOpen] = useState(false);

  function openModal() {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
    setOpen(true);
  }

  function closeModal() {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (typeof dlg.close === "function") {
      dlg.close();
    } else {
      dlg.removeAttribute("open");
    }
    setOpen(false);
  }

  // Lock body scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    lockedScrollY.current = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, lockedScrollY.current);
    };
  }, [open]);

  const pad = size === "lg" ? "h-12 px-6 text-[0.84rem]" : "h-10 px-5 text-[0.78rem]";

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`group inline-flex ${pad} items-center justify-center gap-2 rounded-full bg-[color:var(--color-pompeiano)] font-[family-name:var(--font-cartel)] tracking-[0.26em] uppercase text-[color:var(--color-travertino)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-rosso)]`}
      >
        {ctaLabel}
        <ArrowUpRight
          size={16}
          strokeWidth={1.6}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Click on the backdrop (the dialog element itself, not its child) closes it.
          if (e.target === dialogRef.current) closeModal();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden border-0 bg-transparent p-0 backdrop:bg-[color:var(--color-notte)]/72 backdrop:backdrop-blur-sm"
        style={{ inset: 0, margin: "auto" }}
        aria-labelledby="gift-aid-modal-title"
      >
        <div
          data-lenis-prevent
          className="relative max-h-[90dvh] touch-pan-y overflow-y-auto overscroll-contain bg-[color:var(--color-travertino)] p-6 [-webkit-overflow-scrolling:touch] md:p-10"
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label={t("back")}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-sepia)]/20 text-[color:var(--color-sepia)] transition-colors hover:border-[color:var(--color-pompeiano)] hover:bg-[color:var(--color-pompeiano)] hover:text-[color:var(--color-travertino)]"
          >
            <X size={16} strokeWidth={1.8} />
          </button>

          <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] text-[color:var(--color-pompeiano)]">
            {t("eyebrow")}
          </p>
          <h2
            id="gift-aid-modal-title"
            className="mt-4 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.4vw+0.5rem,2.4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[color:var(--color-sepia)]"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-[1.6] text-[color:var(--color-sepia-soft)]">
            {t("lead")}
          </p>

          <div className="mt-8 border-t border-[color:var(--color-sepia)]/20 pt-6">
            <GiftAidForm />
          </div>
        </div>
      </dialog>
    </>
  );
}
