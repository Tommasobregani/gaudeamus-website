"use client";

import { useEffect, useState } from "react";
import { Menu, X, Facebook, Instagram, ArrowUpRight } from "lucide-react";
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
  { href: "/contatti", key: "contact" },
] as const;

/**
 * Header v3 — dark-aware.
 *  • White text + cream wordmark while sitting on a dark hero (`[data-page-hero="dark"]`).
 *  • Glass-strong + dark text once scrolled past the hero.
 *  • Mobile menu unchanged.
 */
export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const HEADER_H = 60;
    const update = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.querySelector<HTMLElement>('[data-page-hero="dark"]');
      if (!hero) {
        setOverDark(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // Dark mode while the hero still covers the area below the header line.
      setOverDark(rect.bottom > HEADER_H + 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

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

  // Dark mode wins until scrolled past the hero. Glass mode kicks in on scroll.
  const isDark = overDark && !scrolled;

  return (
    <header
      data-dark={isDark || undefined}
      className={cn(
        "sticky top-0 z-40 transition-[background,box-shadow,border-color,color] duration-500",
        scrolled
          ? "glass-strong border-b border-black/5 shadow-[0_1px_0_rgba(15,42,74,0.04)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-[60px] items-center justify-between gap-4 md:h-[68px]">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Wordmark tone={isDark ? "cream" : "ink"} />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((l) => {
            const isActive =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative font-[family-name:var(--font-inter)] text-[0.78rem] font-medium tracking-[-0.005em] transition-colors duration-300",
                  isDark
                    ? isActive
                      ? "text-white"
                      : "text-white/72 hover:text-white"
                    : isActive
                      ? "text-[color:var(--color-notte)]"
                      : "text-[color:var(--color-sepia)]/72 hover:text-[color:var(--color-sepia)]",
                )}
              >
                {t(l.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.1,1)]",
                    isActive
                      ? "scale-x-100 origin-left"
                      : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-0.5 md:flex">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full transition-all duration-300",
                isDark
                  ? "text-white/65 hover:bg-white/10 hover:text-white"
                  : "text-[color:var(--color-sepia)]/65 hover:bg-[color:var(--color-notte)]/8 hover:text-[color:var(--color-notte)]",
              )}
            >
              <Facebook size={14} strokeWidth={1.7} />
            </a>
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full transition-all duration-300",
                isDark
                  ? "text-white/65 hover:bg-white/10 hover:text-white"
                  : "text-[color:var(--color-sepia)]/65 hover:bg-[color:var(--color-notte)]/8 hover:text-[color:var(--color-notte)]",
              )}
            >
              <Instagram size={14} strokeWidth={1.7} />
            </a>
          </div>

          <span
            aria-hidden
            className={cn(
              "hidden h-4 w-px md:block",
              isDark ? "bg-white/20" : "bg-[color:var(--color-sepia)]/12",
            )}
          />

          <LanguageToggle tone={isDark ? "light" : "dark"} className="hidden md:block" />

          <Link
            href="/sostienici"
            className={cn(
              "group hidden items-center gap-1.5 rounded-full px-4 py-2 font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 md:inline-flex",
              isDark
                ? "bg-white text-[color:var(--color-notte)] hover:bg-[color:var(--color-cielo)]"
                : "bg-[color:var(--color-notte)] text-white hover:bg-[color:var(--color-notte-deep)]",
            )}
          >
            {t("support")}
            <ArrowUpRight
              size={13}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            className={cn(
              "-mr-1 grid h-10 w-10 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-notte)] lg:hidden",
              isDark
                ? "text-white hover:bg-white/10"
                : "text-[color:var(--color-sepia)] hover:bg-[color:var(--color-sepia)]/8",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-[60px] z-20 bg-[color:var(--color-notte)]/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[60px] bottom-0 z-30 overflow-y-auto glass-strong transition-[transform,opacity] duration-400 lg:hidden",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="container-site flex flex-col gap-0 pb-10 pt-2"
        >
          {navLinks.map((l, i) => {
            const isActive =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-4 border-b border-[color:var(--color-sepia)]/10 py-5 transition-opacity",
                  isActive ? "opacity-100" : "opacity-90 hover:opacity-100",
                )}
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-mono)] text-[0.72rem] tabular-nums tracking-widest",
                    isActive
                      ? "text-[color:var(--color-notte)]"
                      : "text-[color:var(--color-notte)]/45",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-[family-name:var(--font-inter)] text-[1.45rem] font-light leading-none tracking-[-0.018em] text-[color:var(--color-sepia)]",
                    isActive && "font-medium text-[color:var(--color-notte)]",
                  )}
                >
                  {t(l.key)}
                </span>
              </Link>
            );
          })}

          <Link
            href="/sostienici"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-notte)] px-6 py-3.5 font-[family-name:var(--font-inter)] text-[0.78rem] font-medium uppercase tracking-[0.2em] text-white"
          >
            {t("support")}
            <ArrowUpRight size={14} strokeWidth={1.8} />
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-notte)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-notte)] hover:text-white"
            >
              <Facebook size={18} strokeWidth={1.6} />
            </a>
            {/* TODO: replace with real URL from Eva */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-notte)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-notte)] hover:text-white"
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
