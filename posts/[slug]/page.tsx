import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";
import { PostEditor } from "@/components/admin/PostEditor";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Modifica articolo" };
export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const it = locale === "it";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) notFound();

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

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) notFound();

  return (
    <section className="container-site py-16 md:py-20">
      <div className="border-y-2 border-[color:var(--color-sepia)] py-4">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
            GAUDEAMUS · AMMINISTRAZIONE
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
            /{post.slug}
          </span>
        </div>
      </div>

      <div className="mt-10 max-w-4xl">
        <RomanEyebrow label={it ? "Modifica articolo" : "Edit article"} />
        <h1 className="mt-6 bodoni-italic text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] text-[color:var(--color-sepia)]">
          {it ? post.title_it : post.title_en}
        </h1>

        <div className="mt-12">
          <PostEditor
            mode="edit"
            locale={locale as "en" | "it"}
            initial={{
              slug: post.slug,
              status: post.status,
              titleEn: post.title_en ?? "",
              titleIt: post.title_it ?? "",
              excerptEn: post.excerpt_en ?? "",
              excerptIt: post.excerpt_it ?? "",
              bodyEn: post.body_en ?? "",
              bodyIt: post.body_it ?? "",
              categoryEn: post.category_en ?? "Journal",
              categoryIt: post.category_it ?? "Diario",
              coverUrl: post.cover_url ?? "",
            }}
          />
        </div>
      </div>
    </section>
  );
}
