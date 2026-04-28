"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, ButtonLink } from "@/components/ui/Button";

export type PostEditorValue = {
  slug: string;
  status: "draft" | "published";
  titleEn: string;
  titleIt: string;
  excerptEn: string;
  excerptIt: string;
  bodyEn: string;
  bodyIt: string;
  categoryEn: string;
  categoryIt: string;
  coverUrl: string;
};

const empty: PostEditorValue = {
  slug: "",
  status: "draft",
  titleEn: "",
  titleIt: "",
  excerptEn: "",
  excerptIt: "",
  bodyEn: "",
  bodyIt: "",
  categoryEn: "Journal",
  categoryIt: "Diario",
  coverUrl: "",
};

type Props = {
  initial?: Partial<PostEditorValue>;
  locale: "en" | "it";
  mode: "create" | "edit";
};

export function PostEditor({ initial, locale, mode }: Props) {
  const [v, setV] = useState<PostEditorValue>({ ...empty, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);

  const it = locale === "it";

  function update<K extends keyof PostEditorValue>(k: K, val: PostEditorValue[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  function slugify(s: string) {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 120);
  }

  async function uploadCover(file: File) {
    setCoverUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const path = `posts/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: upErr } = await supabase.storage
        .from("community")
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("community").getPublicUrl(path);
      update("coverUrl", data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setCoverUploading(false);
    }
  }

  async function save(publish: boolean) {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...v,
        slug: v.slug || slugify(v.titleEn || v.titleIt),
        status: publish ? "published" : "draft",
        coverUrl: v.coverUrl || null,
      };
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          typeof body?.error === "string" ? body.error : "Save failed",
        );
      }
      window.location.href = `/${locale}/admin`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(false);
      }}
      className="space-y-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label={it ? "Titolo (italiano)" : "Title (Italian)"}>
          <input
            required
            value={v.titleIt}
            onChange={(e) => {
              update("titleIt", e.target.value);
              if (!initial?.slug && mode === "create") update("slug", slugify(v.titleEn || e.target.value));
            }}
            className={fieldCls}
          />
        </Field>
        <Field label={it ? "Titolo (inglese)" : "Title (English)"}>
          <input
            required
            value={v.titleEn}
            onChange={(e) => {
              update("titleEn", e.target.value);
              if (!initial?.slug && mode === "create") update("slug", slugify(e.target.value));
            }}
            className={fieldCls}
          />
        </Field>
      </div>

      <Field label={it ? "Slug (indirizzo URL)" : "Slug (URL)"}>
        <input
          required
          value={v.slug}
          onChange={(e) => update("slug", e.target.value)}
          className={fieldCls}
          placeholder="come-si-chiama-questo-articolo"
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={it ? "Categoria (italiano)" : "Category (Italian)"}>
          <input
            value={v.categoryIt}
            onChange={(e) => update("categoryIt", e.target.value)}
            className={fieldCls}
          />
        </Field>
        <Field label={it ? "Categoria (inglese)" : "Category (English)"}>
          <input
            value={v.categoryEn}
            onChange={(e) => update("categoryEn", e.target.value)}
            className={fieldCls}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={it ? "Sommario (italiano)" : "Excerpt (Italian)"}>
          <textarea
            rows={3}
            value={v.excerptIt}
            onChange={(e) => update("excerptIt", e.target.value)}
            className={fieldCls}
          />
        </Field>
        <Field label={it ? "Sommario (inglese)" : "Excerpt (English)"}>
          <textarea
            rows={3}
            value={v.excerptEn}
            onChange={(e) => update("excerptEn", e.target.value)}
            className={fieldCls}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label={it ? "Testo (italiano)" : "Body (Italian)"}>
          <textarea
            rows={12}
            value={v.bodyIt}
            onChange={(e) => update("bodyIt", e.target.value)}
            className={fieldCls}
            placeholder={it ? "Paragrafi separati da una riga vuota." : "Paragraphs separated by a blank line."}
          />
        </Field>
        <Field label={it ? "Testo (inglese)" : "Body (English)"}>
          <textarea
            rows={12}
            value={v.bodyEn}
            onChange={(e) => update("bodyEn", e.target.value)}
            className={fieldCls}
            placeholder={it ? "Paragrafi separati da una riga vuota." : "Paragraphs separated by a blank line."}
          />
        </Field>
      </div>

      <Field label={it ? "Immagine di copertina" : "Cover image"}>
        <div className="flex flex-wrap items-center gap-4">
          {v.coverUrl && (
            <img
              src={v.coverUrl}
              alt="cover"
              className="h-24 w-36 border border-[color:var(--color-sepia)]/30 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadCover(f);
            }}
            className="text-sm"
            disabled={coverUploading}
          />
          <input
            value={v.coverUrl}
            onChange={(e) => update("coverUrl", e.target.value)}
            className={fieldCls + " flex-1"}
            placeholder={it ? "oppure incolla un URL" : "or paste a URL"}
          />
        </div>
      </Field>

      {error && (
        <p className="border border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)]/5 p-4 text-sm text-[color:var(--color-terracotta)]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--color-sepia)]/25 pt-8">
        <Button type="submit" variant="outline" disabled={saving}>
          {saving ? (it ? "Salvataggio…" : "Saving…") : it ? "Salva come bozza" : "Save as draft"}
        </Button>
        <Button type="button" onClick={() => save(true)} disabled={saving} withArrow>
          {saving ? (it ? "Pubblicazione…" : "Publishing…") : it ? "Pubblica" : "Publish"}
        </Button>
        <ButtonLink href="/admin" variant="ghost">
          {it ? "Annulla" : "Cancel"}
        </ButtonLink>
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
