"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  tone?: "light" | "dark";
};

export function NewsletterForm({ tone = "light" }: Props) {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const isDark = tone === "dark";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={cn(
          "flex items-end gap-3 border-b pb-3",
          isDark ? "border-[color:var(--color-travertino)]/40" : "border-[color:var(--color-sepia)]/35",
        )}
      >
        <label className="sr-only" htmlFor={`nl-${tone}`}>
          Email
        </label>
        <input
          id={`nl-${tone}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className={cn(
            "flex-1 bg-transparent font-[family-name:var(--font-body)] text-lg outline-none placeholder:opacity-55",
            isDark ? "text-[color:var(--color-travertino)]" : "text-[color:var(--color-sepia)]",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label={t("submit")}
          className={cn(
            "group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.25em] transition-colors",
            isDark
              ? "text-[color:var(--color-travertino)] hover:border-[color:var(--color-travertino)]"
              : "text-[color:var(--color-sepia)] hover:border-[color:var(--color-terracotta)] hover:text-[color:var(--color-terracotta)]",
          )}
        >
          {t("submit")}
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-[1.2em] font-[family-name:var(--font-mono)] text-xs tracking-[0.1em]",
          isDark ? "text-[color:var(--color-travertino)]/70" : "text-[color:var(--color-muted)]",
        )}
      >
        {status === "loading" && t("submitting")}
        {status === "ok" && t("success")}
        {status === "error" && t("error")}
      </p>
    </form>
  );
}
