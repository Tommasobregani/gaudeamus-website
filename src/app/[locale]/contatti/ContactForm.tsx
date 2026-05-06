"use client";

import { useState } from "react";

type FormCopy = {
  name: string;
  email: string;
  subject: string;
  recipient: string;
  recipientArtistic: string;
  recipientGeneral: string;
  message: string;
  submit: string;
  success: string;
  required: string;
};

type Props = {
  copy: FormCopy;
};

export function ContactForm({ copy }: Props) {
  const [sent, setSent] = useState(false);
  const [recipient, setRecipient] = useState<"artistic" | "general">("general");
  const [userSubject, setUserSubject] = useState("");

  const prefixedSubject = `${recipient === "artistic" ? "[ARTIST]" : "[GENERAL]"} ${userSubject}`.trim();

  if (sent) {
    return (
      <div className="border border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)] p-8 md:p-10">
        <p className="font-[family-name:var(--font-body)] text-[1.05rem] leading-[1.7] text-[color:var(--color-sepia)]">
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="border border-[color:var(--color-sepia)]/20 bg-[color:var(--color-carta)] p-8 md:p-10"
      onSubmit={() => setSent(true)}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      {/* TODO: configure Netlify Forms notifications:
          [ARTIST] -> gaudeamus@italiandramauk.org
          [GENERAL] -> info@italiandramauk.org */}
      <input type="hidden" name="subject" value={prefixedSubject} />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
            {copy.name} {copy.required}
          </span>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-pompeiano)]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
            {copy.email} {copy.required}
          </span>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-pompeiano)]"
          />
        </label>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.subject} {copy.required}
        </span>
        <input
          type="text"
          name="subject_user"
          required
          value={userSubject}
          onChange={(e) => setUserSubject(e.target.value)}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-pompeiano)]"
        />
      </label>

      <fieldset className="mt-6 border border-[color:var(--color-sepia)]/20 p-4">
        <legend className="px-2 font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
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
              className="mt-1"
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
              className="mt-1"
            />
            <span>{copy.recipientGeneral}</span>
          </label>
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-2 block font-[family-name:var(--font-cartel)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
          {copy.message} {copy.required}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={7}
          className="w-full border border-[color:var(--color-sepia)]/25 bg-white px-4 py-3 text-[color:var(--color-sepia)] outline-none transition focus:border-[color:var(--color-pompeiano)]"
        />
      </label>

      <div className="mt-8">
        <button
          type="submit"
          className="inline-flex items-center border border-[color:var(--color-pompeiano)] bg-[color:var(--color-pompeiano)] px-5 py-3 font-[family-name:var(--font-cartel)] text-[0.75rem] uppercase tracking-[0.24em] text-white transition hover:bg-[color:var(--color-pompeiano-deep)]"
        >
          {copy.submit}
        </button>
      </div>
    </form>
  );
}

