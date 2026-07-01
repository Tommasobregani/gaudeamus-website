"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Wordmark } from "@/components/brand/Wordmark";
import { LanguageToggle } from "./LanguageToggle";
import { cn, siteConfig } from "@/lib/utils";

// Match the same guard used in Footer: only render social chips when the URL
// has a real path, never the bare host placeholder.
function isRealSocialUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.pathname !== "/" && u.pathname.length > 1;
  } catch {
    return false;
  }
}

const navLinks = [
  { href: "/chi-siamo", key: "about" },
  { href: "/teatro", key: "theatre" },
  { href: "/eventi", key: "events" },
  { href: "/news", key: "news" },
  { href: "/progetti", key: "projects" },
  { href: "/contatti", key: "contact" },
] as const;

/**
 * Header — sticky, ink-on-light. Glass-strong + hairline once scrolled.
 * Mobile menu is portalled to body so fixed positioning stays viewport-bound.
 */
export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lockedScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
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
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    if (open) {
      lockedScrollY.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      if (open) {
        window.scrollTo(0, lockedScrollY.current);
      }
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

  const mobileMenu = (
    <div
      id="mobile-nav"
      className={cn(
        "fixed inset-0 z-[9999] h-screen h-[100dvh] min-h-screen min-h-[100dvh] w-screen overflow-y-auto overscroll-contain bg-[color:var(--color-travertino)] shadow-[0_24px_80px_rgba(15,42,74,0.28)] transition-[transform,opacity] duration-400 lg:hidden",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="container-site sticky top-0 z-10 flex h-[60px] items-center justify-between bg-[color:var(--color-travertino)]/95 backdrop-blur-md">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          <Wordmark tone="ink" />
        </Link>
        <button
          type="button"
          className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-sepia)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-notte)]"
          aria-label={t("close")}
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

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
              onClick={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-notte)] px-6 py-3.5 font-[family-name:var(--font-inter)] text-[0.78rem] font-medium uppercase tracking-[0.2em] text-white"
        >
          {t("support")}
          <ArrowUpRight size={14} strokeWidth={1.8} />
        </Link>

        <div className="mt-6 flex items-center gap-3">
          {(() => {
            const fb = isRealSocialUrl(siteConfig.social.facebook) ? siteConfig.social.facebook : null;
            const ig = isRealSocialUrl(siteConfig.social.instagram) ? siteConfig.social.instagram : null;
            return (
              <>
                {fb ? (
                  <a
                    href={fb}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-notte)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-notte)] hover:text-white"
                  >
                    <Facebook size={18} strokeWidth={1.6} />
                  </a>
                ) : null}
                {ig ? (
                  <a
                    href={ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-notte)]/8 text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-notte)] hover:text-white"
                  >
                    <Instagram size={18} strokeWidth={1.6} />
                  </a>
                ) : null}
              </>
            );
          })()}
          <div className="ml-auto">
            <LanguageToggle onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]",
        open && "z-[90]",
        scrolled
          ? "glass-strong border-b border-black/5 shadow-[0_1px_0_rgba(15,42,74,0.04)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site relative z-[90] flex h-[60px] items-center justify-between gap-4 md:h-[68px]">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Wordmark tone="ink" />
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
                  isActive
                    ? "text-[color:var(--color-notte)]"
                    : "text-[color:var(--color-sepia)]/72 hover:text-[color:var(--color-sepia)]",
                )}
              >
                {t(l.key)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]",
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
          {(() => {
            const fb = isRealSocialUrl(siteConfig.social.facebook) ? siteConfig.social.facebook : null;
            const ig = isRealSocialUrl(siteConfig.social.instagram) ? siteConfig.social.instagram : null;
            if (!fb && !ig) return null;
            return (
              <div className="hidden items-center gap-0.5 md:flex">
                {fb ? (
                  <a
                    href={fb}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--color-sepia)]/65 transition-all duration-300 hover:bg-[color:var(--color-notte)]/8 hover:text-[color:var(--color-notte)]"
                  >
                    <Facebook size={14} strokeWidth={1.7} />
                  </a>
                ) : null}
                {ig ? (
                  <a
                    href={ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--color-sepia)]/65 transition-all duration-300 hover:bg-[color:var(--color-notte)]/8 hover:text-[color:var(--color-notte)]"
                  >
                    <Instagram size={14} strokeWidth={1.7} />
                  </a>
                ) : null}
              </div>
            );
          })()}

          <span aria-hidden className="hidden h-4 w-px bg-[color:var(--color-sepia)]/12 md:block" />

          <LanguageToggle tone="dark" className="hidden md:block" />

          <Link
            href="/sostienici"
            className="group hidden items-center gap-1.5 rounded-full bg-[color:var(--color-notte)] px-4 py-2 font-[family-name:var(--font-inter)] text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--color-notte-deep)] md:inline-flex"
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
            className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-[color:var(--color-sepia)] transition-colors hover:bg-[color:var(--color-sepia)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-notte)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </header>
  );
}
