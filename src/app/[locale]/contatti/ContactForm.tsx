"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormCopy = {
  name: string;
  email: string;
  subject: string;
  recipient: string;
  recipientArtistic: string;
  recipientGeneral: string;
  message: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  required: string;
};

type Props = {
  copy: FormCopy;
};

export function ContactForm({ copy }: Props) {
  const params = useSearchParams();
  const [recipient, setRecipient] = useState<"artistic" | "general">("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const botFieldRef = useRef<HTMLInputElement | null>(null);

  // Pre-fill recipient from ?recipient=artistic (used by the homepage strip).
  useEffect(() => {
    const r = params.get("recipient");
    if (r === "artistic" || r === "general") setRecipient(r);
  }, [params]);

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
          recipient,
          botField: botFieldRef.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)] p-8 md:p-10">
        <p className="font-[family-name:var(--font-inter)] text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia)]">
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="border border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)] p-8 md:p-10"
    >
      {/* Honeypot — hidden from real users, must stay empty. */}
      <input
        ref={botFieldRef}
        type="text"
        name="bot_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
            {copy.name} {copy.required}
          </span>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
            {copy.email} {copy.required}
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
          />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.subject} {copy.required}
        </span>
        <input
          type="text"
          name="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <fieldset className="mt-6 border border-[color:var(--color-sepia)]/20 p-4">
        <legend className="px-2 font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.recipient} {copy.required}
        </legend>
        <div className="mt-2 grid gap-3">
          <label className="inline-flex items-start gap-3 text-[0.96rem] leading-[1.5] text-[color:var(--color-sepia)]">
            <input
              type="radio"
              name="recipient"
              value="artistic"
              checked={recipient === "artistic"}
              onChange={() => setRecipient("artistic")}
              required
              className="mt-1 accent-[color:var(--color-rosso)]"
            />
            <span>{copy.recipientArtistic}</span>
          </label>
          <label className="inline-flex items-start gap-3 text-[0.96rem] leading-[1.5] text-[color:var(--color-sepia)]">
            <input
              type="radio"
              name="recipient"
              value="general"
              checked={recipient === "general"}
              onChange={() => setRecipient("general")}
              required
              className="mt-1 accent-[color:var(--color-rosso)]"
            />
            <span>{copy.recipientGeneral}</span>
          </label>
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-2 block font-[family-name:var(--font-inter)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.message} {copy.required}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-rosso)]"
        />
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4">
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
            className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.08em] text-[color:var(--color-rosso)]"
          >
            {copy.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
