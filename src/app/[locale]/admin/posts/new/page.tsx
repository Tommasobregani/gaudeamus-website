import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale, routing } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { PostEditor } from "@/components/admin/PostEditor";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Nuovo articolo" };
export const dynamic = "force-dynamic";

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const it = locale === "it";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <section className="container-site py-20">
        <h1 className="bodoni-italic text-4xl">
          {it ? "Supabase non configurato." : "Supabase not configured."}
        </h1>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/auth/login`);
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (!profile || !["editor", "admin"].includes(profile.role)) redirect(`/${locale}/admin`);

  return (
    <section className="container-site py-16 md:py-20">
      <div className="border-y-2 border-[color:var(--color-sepia)] py-4">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
            GAUDEAMUS · AMMINISTRAZIONE
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
            {it ? "NUOVO ARTICOLO" : "NEW ARTICLE"}
          </span>
        </div>
      </div>

      <div className="mt-10 max-w-4xl">
        <RomanEyebrow label={it ? "Nuovo articolo" : "New article"} />
        <h1 className="mt-6 bodoni-italic text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] text-[color:var(--color-sepia)]">
          {it ? "Scrivi una nuova pubblicazione." : "Write a new publication."}
        </h1>
        <p className="mt-4 max-w-[58ch] font-[family-name:var(--font-body)] text-[1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
          {it
            ? "Scrivi in italiano e in inglese: l'articolo sarà pubblicato in entrambe le lingue."
            : "Write in both English and Italian: the article will be published in both languages."}
        </p>

        <div className="mt-12">
          <PostEditor mode="create" locale={locale as "en" | "it"} />
        </div>
      </div>
    </section>
  );
}
