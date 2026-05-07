"use client";

import { useRef, useState } from "react";

type FormCopy = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  required: string;
};

type Props = {
  kind: "artistic" | "general";
  copy: FormCopy;
};

/**
 * Single-purpose contact form. Two of these live on /contatti — one per
 * inbox per Eva's directive (artistic → her personal director email,
 * general → info). No more recipient radio; the form's `kind` is fixed.
 */
export function ContactForm({ kind, copy }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const botFieldRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          recipient: kind,
          botField: botFieldRef.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("ok");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)] p-6 md:p-7">
        <p className="font-[family-name:var(--font-inter)] text-[0.98rem] leading-[1.65] text-[color:var(--color-sepia)]">
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="space-y-4"
      aria-label={kind === "artistic" ? "Artistic enquiry form" : "General enquiry form"}
    >
      {/* Honeypot — off-screen, must stay empty. */}
      <input
        ref={botFieldRef}
        type="text"
        name={`bot_field_${kind}`}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="block">
        <span className="mb-1.5 block font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.name} {copy.required}
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.email} {copy.required}
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.subject} {copy.required}
        </span>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-[family-name:var(--font-mono)] text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.message} {copy.required}
        </span>
        <textarea
          required
          minLength={10}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center border border-[color:var(--color-notte)] bg-[color:var(--color-notte)] px-5 py-3 font-[family-name:var(--font-inter)] text-[0.75rem] uppercase tracking-[0.24em] text-white transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:bg-[color:var(--color-rosso)] hover:border-[color:var(--color-rosso)] disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "loading" ? copy.submitting : copy.submit}
        </button>
        {status === "error" ? (
          <p
            role="alert"
            className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.08em] text-[color:var(--color-rosso)]"
          >
            {copy.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
