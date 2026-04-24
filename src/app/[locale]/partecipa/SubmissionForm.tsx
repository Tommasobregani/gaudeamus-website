"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, ButtonLink } from "@/components/ui/Button";

type Kind = "photo" | "video" | "article" | "event";

const kinds: { code: Kind; label: string }[] = [
  { code: "photo", label: "Photo" },
  { code: "video", label: "Video" },
  { code: "article", label: "Article" },
  { code: "event", label: "Event" },
];

function isYouTubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url.trim());
}

export function SubmissionForm() {
  const [kind, setKind] = useState<Kind>("photo");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setError("Supabase is not configured yet. Submissions go live once the environment keys are set.");
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setNeedsAuth(true);
        return;
      }

      const mediaUrls: string[] = [];
      if (kind === "video" && videoUrl.trim()) {
        if (!isYouTubeUrl(videoUrl) && !videoUrl.startsWith("https://")) {
          throw new Error("Please use a YouTube URL or a secure https video link.");
        }
        mediaUrls.push(videoUrl.trim());
      }
      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
          const path = `submissions/${user.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
          const { error: upErr } = await supabase.storage
            .from("community")
            .upload(path, file, { upsert: false });
          if (upErr) throw upErr;
          const { data } = supabase.storage.from("community").getPublicUrl(path);
          mediaUrls.push(data.publicUrl);
        }
      }

      const { error: insErr } = await supabase.from("submissions").insert({
        author_id: user.id,
        kind,
        title,
        body,
        media_urls: mediaUrls,
      });
      if (insErr) throw insErr;

      setDone(true);
      setTitle("");
      setBody("");
      setVideoUrl("");
      setFiles(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="border-2 border-[color:var(--color-salvia)] bg-[color:var(--color-salvia)]/8 p-8">
        <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-salvia)]">
          RICEVUTO · THANK YOU
        </p>
        <h3 className="mt-4 bodoni-italic text-[1.75rem] leading-[1.1] text-[color:var(--color-sepia)]">
          Your submission is with our editors.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-sepia-soft)]">
          You will hear from us if we publish it. Grazie.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-terracotta)] hover:underline"
        >
          Send another →
        </button>
      </div>
    );
  }

  if (needsAuth) {
    return (
      <div className="border-2 border-[color:var(--color-sepia)] bg-[color:var(--color-carta)] p-8">
        <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-terracotta)]">
          SERVE UN ACCOUNT
        </p>
        <h3 className="mt-4 bodoni-italic text-[1.75rem] leading-[1.1] text-[color:var(--color-sepia)]">
          Sign in, or create an account first.
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-sepia-soft)]">
          We use your email only to contact you about the content you propose.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/auth/signup" withArrow>Create account</ButtonLink>
          <ButtonLink href="/auth/login" variant="outline">I have one</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div>
        <label className="mb-3 block font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
          KIND
        </label>
        <div className="flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k.code}
              type="button"
              onClick={() => setKind(k.code)}
              aria-pressed={kind === k.code}
              className={
                "border px-4 py-2 font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.24em] transition-colors " +
                (kind === k.code
                  ? "border-[color:var(--color-sepia)] bg-[color:var(--color-sepia)] text-[color:var(--color-travertino)]"
                  : "border-[color:var(--color-sepia)]/30 text-[color:var(--color-sepia)] hover:border-[color:var(--color-sepia)]")
              }
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <Field label="Title">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldCls}
          placeholder={kind === "event" ? "What is the event?" : "Give it a title"}
        />
      </Field>

      <Field label={kind === "article" ? "Your article" : "Description"}>
        <textarea
          rows={kind === "article" ? 10 : 5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={fieldCls}
          placeholder={
            kind === "article"
              ? "Paragraphs separated by a blank line."
              : "A sentence or two to help the editors."
          }
        />
      </Field>

      {kind === "video" && (
        <Field label="YouTube URL (recommended)">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className={fieldCls}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-sepia-soft)]">
            YouTube keeps videos free and fast. We embed them directly.
          </p>
        </Field>
      )}

      {(kind === "photo" || kind === "video" || kind === "event") && (
        <Field
          label={
            kind === "video"
              ? "Or upload a video file"
              : kind === "photo"
              ? "Photos"
              : "Photos (optional)"
          }
        >
          <input
            type="file"
            multiple={kind !== "video"}
            accept={kind === "video" ? "video/*" : "image/*"}
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full border border-dashed border-[color:var(--color-sepia)]/40 bg-[color:var(--color-travertino)] p-4 text-sm file:mr-4 file:border-0 file:bg-[color:var(--color-sepia)] file:px-3 file:py-2 file:font-[family-name:var(--font-cartel)] file:text-[0.72rem] file:tracking-[0.24em] file:text-[color:var(--color-travertino)]"
          />
          {files && files.length > 0 && (
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-terracotta)]">
              {files.length} {files.length === 1 ? "file" : "files"} ready.
            </p>
          )}
        </Field>
      )}

      {error && (
        <p className="border border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)]/6 p-4 text-sm text-[color:var(--color-terracotta-deep)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--color-sepia)]/20 pt-6">
        <Button type="submit" disabled={loading} withArrow>
          {loading ? "Submitting…" : "Submit to editors"}
        </Button>
        <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-sepia-soft)]">
          Moderated before publication.
        </p>
      </div>
    </form>
  );
}

const fieldCls =
  "w-full border border-[color:var(--color-sepia)]/30 bg-[color:var(--color-travertino)] px-3 py-2.5 font-[family-name:var(--font-body)] text-[1rem] outline-none focus:border-[color:var(--color-sepia)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.26em] text-[color:var(--color-sepia-soft)]">
        {label}
      </span>
      {children}
    </label>
  );
}
