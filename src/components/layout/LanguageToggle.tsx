"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: "en" | "it") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error — next-intl allows params-less replace for dynamic paths
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.3em] text-[color:var(--color-sepia)]",
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
          "px-2 py-1 transition-colors",
          locale === "en" ? "text-[color:var(--color-pompeiano)]" : "opacity-65 hover:opacity-100",
        )}
      >
        EN
      </button>
      <span aria-hidden className="opacity-30">
        ·
      </span>
      <button
        type="button"
        onClick={() => switchTo("it")}
        aria-current={locale === "it" ? "true" : undefined}
        disabled={isPending}
        className={cn(
          "px-2 py-1 transition-colors",
          locale === "it" ? "text-[color:var(--color-pompeiano)]" : "opacity-65 hover:opacity-100",
        )}
      >
        IT
      </button>
    </div>
  );
}
