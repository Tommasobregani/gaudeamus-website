"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Wordmark } from "@/components/brand/Wordmark";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/chi-siamo", key: "about" },
  { href: "/teatro", key: "teatro" },
  { href: "/eventi", key: "events" },
  { href: "/news", key: "news" },
  { href: "/progetti", key: "projects" },
  { href: "/sostienici", key: "support" },
  { href: "/contatti", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-[color:var(--color-sepia)]/25 bg-[color:var(--color-travertino)]/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6 md:h-20">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.24em] transition-colors",
                  "text-[color:var(--color-sepia)]",
                  isActive
                    ? "opacity-100 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:bg-[color:var(--color-accent)]"
                    : "opacity-75 hover:opacity-100",
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle className="hidden md:block" />
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center text-[color:var(--color-sepia)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-pompeiano)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-[72px] z-20 bg-[color:var(--color-sepia)]/35 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[72px] bottom-0 z-30 overflow-y-auto border-t border-[color:var(--color-sepia)]/15 bg-[color:var(--color-travertino)] transition-[transform,opacity] duration-300 md:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="container-site flex flex-col gap-0 pb-10 pt-2">
          {navLinks.map((l, i) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-[color:var(--color-sepia)]/15 py-4 transition-opacity",
                  isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                )}
              >
                <span
                  className={cn(
                    "bodoni-italic text-[1.2rem] tabular-nums",
                    isActive
                      ? "text-[color:var(--color-pompeiano)]"
                      : "text-[color:var(--color-pompeiano)]/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "bodoni-italic text-[2rem] leading-none text-[color:var(--color-sepia)]",
                    isActive &&
                      "border-b-2 border-[color:var(--color-pompeiano)] pb-1",
                  )}
                >
                  {t(l.key)}
                </span>
              </Link>
            );
          })}
          <div className="mt-8 border-t border-[color:var(--color-sepia)]/15 pt-6">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
