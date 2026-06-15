"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export function GiftAidForm() {
  const t = useTranslations("giftAid");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const payload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      homeAddress: String(fd.get("homeAddress") ?? "").trim(),
      postcode: String(fd.get("postcode") ?? "").trim(),
      donationAmount: String(fd.get("donationAmount") ?? "").trim() || undefined,
      donationReference: String(fd.get("donationReference") ?? "").trim() || undefined,
      ukTaxpayerDeclaration: fd.get("ukTaxpayerDeclaration") === "on",
      giftAidDeclaration: fd.get("giftAidDeclaration") === "on",
      taxResponsibilityDeclaration: fd.get("taxResponsibilityDeclaration") === "on",
    };

    try {
      const res = await fetch("/api/gift-aid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      formEl.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] p-8 md:p-10"
      >
        <p className="bodoni-italic text-[clamp(1.5rem,2vw+0.5rem,2rem)] leading-[1.2] text-[color:var(--color-sepia)]">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field name="fullName" label={t("fullName")} required autoComplete="name" />
      <Field name="email" label={t("email")} required type="email" autoComplete="email" />
      <TextAreaField
        name="homeAddress"
        label={t("homeAddress")}
        required
        autoComplete="street-address"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="postcode" label={t("postcode")} required autoComplete="postal-code" />
        <Field
          name="donationAmount"
          label={t("donationAmount")}
          type="number"
          step="0.01"
          min="0"
        />
      </div>
      <TextAreaField name="donationReference" label={t("donationReference")} />

      <CheckboxField name="ukTaxpayerDeclaration" label={t("ukTaxpayerDeclaration")} />
      <CheckboxField name="giftAidDeclaration" label={t("giftAidDeclaration")} />
      <CheckboxField
        name="taxResponsibilityDeclaration"
        label={t("taxResponsibilityDeclaration")}
      />

      {status === "error" && (
        <p
          role="alert"
          className="border-l-2 border-[color:var(--color-pompeiano)] bg-[color:var(--color-carta)] p-4 text-[0.9rem] text-[color:var(--color-sepia)]"
        >
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-11 items-center justify-center bg-[color:var(--color-pompeiano)] px-6 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.26em] text-[color:var(--color-travertino)] transition-opacity disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  defaultValue,
  step,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  step?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        step={step}
        min={min}
        className="mt-2 block w-full border border-[color:var(--color-sepia)]/25 bg-white px-3 py-2.5 font-[family-name:var(--font-body)] text-[0.95rem] text-[color:var(--color-sepia)] outline-none transition-colors focus:border-[color:var(--color-pompeiano)]"
      />
    </label>
  );
}

function TextAreaField({
  name,
  label,
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        name={name}
        required={required}
        autoComplete={autoComplete}
        rows={4}
        className="mt-2 block w-full resize-y border border-[color:var(--color-sepia)]/25 bg-white px-3 py-2.5 font-[family-name:var(--font-body)] text-[0.95rem] text-[color:var(--color-sepia)] outline-none transition-colors focus:border-[color:var(--color-pompeiano)]"
      />
    </label>
  );
}

function CheckboxField({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-start gap-3 border border-[color:var(--color-sepia)]/25 bg-[color:var(--color-carta)] p-4 text-[0.9rem] leading-[1.55] text-[color:var(--color-sepia)]">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-1 size-4 shrink-0 accent-[color:var(--color-pompeiano)]"
      />
      <span>{label}</span>
    </label>
  );
}
