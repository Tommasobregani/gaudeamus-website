"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onNavigate?: () => void;
  /** Color mode — defaults to dark text. "light" inverts for use over dark photos. */
  tone?: "dark" | "light";
};

export function LanguageToggle({ className, onNavigate, tone = "dark" }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: "en" | "it") {
    if (next === locale) return;
    onNavigate?.();
    startTransition(() => {
      router.replace(
        // @ts-expect-error — next-intl allows params-less replace for dynamic paths
        { pathname, params },
        { locale: next },
      );
    });
  }

  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0 font-[family-name:var(--font-inter)] text-[0.74rem] font-medium tracking-[0.24em]",
        isLight ? "text-white" : "text-[color:var(--color-sepia)]",
        className,
      )}
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-current={locale === "en" ? "true" : undefined}
        disabled={isPending}
        className={cn(
          "px-2 py-1 transition-opacity",
          locale === "en"
            ? isLight
              ? "text-[color:var(--color-cielo)]"
              : "text-[color:var(--color-notte)]"
            : "opacity-60 hover:opacity-100",
        )}
      >
        EN
      </button>
      <span aria-hidden className="opacity-25">
        ·
      </span>
      <button
        type="button"
        onClick={() => switchTo("it")}
        aria-current={locale === "it" ? "true" : undefined}
        disabled={isPending}
        className={cn(
          "px-2 py-1 transition-opacity",
          locale === "it"
            ? isLight
              ? "text-[color:var(--color-cielo)]"
              : "text-[color:var(--color-notte)]"
            : "opacity-60 hover:opacity-100",
        )}
      >
        IT
      </button>
    </div>
  );
}
