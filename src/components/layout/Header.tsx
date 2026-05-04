"use client";

import { useEffect, useState } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
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
        "sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500",
        scrolled ? "glass-strong" : "glass-light",
      )}
    >
      <div className="container-site flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {navLinks.map((l) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative font-[family-name:var(--font-cartel)] text-[0.76rem] uppercase tracking-[0.22em] transition-colors duration-300",
                  "text-[color:var(--color-sepia)]",
                  isActive
                    ? "opacity-100 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[color:var(--color-pompeiano)]"
                    : "opacity-72 hover:opacity-100",
                )}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Social icons - per Eva: add Facebook + Instagram */}
          <div className="hidden items-center gap-1 md:flex">
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full text-[color:var(--color-sepia)]/70 transition-all duration-300 hover:bg-[color:var(--color-sepia)]/8 hover:text-[color:var(--color-pompeiano)]"
            >
              <Facebook size={16} strokeWidth={1.6} />
            </a>
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full text-[color:var(--color-sepia)]/70 transition-all duration-300 hover:bg-[color:var(--color-sepia)]/8 hover:text-[color:var(--color-pompeiano)]"
            >
              <Instagram size={16} strokeWidth={1.6} />
            </a>
          </div>
          <span className="hidden h-5 w-px bg-[color:var(--color-sepia)]/15 md:block" aria-hidden />
          <LanguageToggle className="hidden md:block" />

          <button
            type="button"
            className="-mr-1 grid h-11 w-11 place-items-center rounded-full text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-sepia)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-pompeiano)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-[68px] z-20 bg-[color:var(--color-sepia)]/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 z-30 overflow-y-auto glass-strong transition-[transform,opacity] duration-400 lg:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="container-site flex flex-col gap-0 pb-10 pt-4">
          {navLinks.map((l, i) => {
            const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-[color:var(--color-sepia)]/12 py-4 transition-opacity",
                  isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                )}
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-mono)] text-[0.78rem] tabular-nums tracking-widest",
                    isActive
                      ? "text-[color:var(--color-pompeiano)]"
                      : "text-[color:var(--color-pompeiano)]/55",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-[family-name:var(--font-cartel)] text-[1.5rem] leading-none uppercase tracking-[0.16em] text-[color:var(--color-sepia)]",
                    isActive &&
                      "border-b-2 border-[color:var(--color-pompeiano)] pb-1",
                  )}
                >
                  {t(l.key)}
                </span>
              </Link>
            );
          })}

          <div className="mt-8 flex items-center gap-3">
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-sepia)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-pompeiano)] hover:text-white"
            >
              <Facebook size={18} strokeWidth={1.6} />
            </a>
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-sepia)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-pompeiano)] hover:text-white"
            >
              <Instagram size={18} strokeWidth={1.6} />
            </a>
            <div className="ml-auto">
              <LanguageToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
