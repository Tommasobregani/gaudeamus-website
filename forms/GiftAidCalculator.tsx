"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const PRESETS = [10, 25, 50, 100];

function formatGBP(n: number, loc: "en" | "it") {
  return new Intl.NumberFormat(loc === "it" ? "it-IT" : "en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(n);
}

export function GiftAidCalculator() {
  const t = useTranslations("support");
  const locale = useLocale() as "en" | "it";
  const [amount, setAmount] = useState<number>(50);

  const safe = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const giftAid = +(safe * 0.25).toFixed(2);
  const total = +(safe + giftAid).toFixed(2);

  return (
    <div className="border-2 border-[color:var(--color-accent)] bg-[color:var(--color-accent)] p-6 text-[color:var(--color-on-accent)] md:p-8">
      <p className="font-[family-name:var(--font-cartel)] text-[0.74rem] uppercase tracking-[0.28em] opacity-90">
        {t("calculatorTitle")}
      </p>
      <p className="mt-3 text-[0.95rem] opacity-90">{t("calculatorBody")}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setAmount(p)}
            className={
              "h-10 min-w-[3.25rem] border px-3 font-[family-name:var(--font-cartel)] text-[0.8rem] tracking-[0.18em] transition-colors " +
              (amount === p
                ? "border-[color:var(--color-on-accent)] bg-[color:var(--color-on-accent)] text-[color:var(--color-accent)]"
                : "border-[color:var(--color-on-accent)]/40 hover:border-[color:var(--color-on-accent)]")
            }
          >
            £{p}
          </button>
        ))}
        <label className="flex items-center gap-2 border border-[color:var(--color-on-accent)]/40 px-3">
          <span className="font-[family-name:var(--font-mono)] text-[0.85rem] opacity-80">£</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            step={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-20 bg-transparent py-1 font-[family-name:var(--font-mono)] text-[0.95rem] text-[color:var(--color-on-accent)] outline-none placeholder:opacity-50"
            aria-label={t("calculatorAmountLabel")}
          />
        </label>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-[color:var(--color-on-accent)]/30 pt-6">
        <div>
          <dt className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
            {t("calculatorYouGive")}
          </dt>
          <dd className="bodoni-italic mt-1 text-[clamp(1.5rem,2.5vw+0.5rem,2.5rem)] leading-none">
            {formatGBP(safe, locale)}
          </dd>
        </div>
        <div>
          <dt className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
            {t("calculatorGiftAid")}
          </dt>
          <dd className="bodoni-italic mt-1 text-[clamp(1.5rem,2.5vw+0.5rem,2.5rem)] leading-none opacity-90">
            +{formatGBP(giftAid, locale)}
          </dd>
        </div>
        <div>
          <dt className="font-[family-name:var(--font-cartel)] text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
            {t("calculatorWeReceive")}
          </dt>
          <dd className="bodoni-italic mt-1 text-[clamp(1.75rem,3vw+0.5rem,3rem)] leading-none">
            {formatGBP(total, locale)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-[0.85rem] italic opacity-85">{t("calculatorFootnote")}</p>
    </div>
  );
}
