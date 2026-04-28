import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale, Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import { Fregio } from "@/components/brand/Fregio";
import { RomanEyebrow } from "@/components/ui/RomanEyebrow";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Amministrazione · Gaudeamus",
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
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
        <RomanEyebrow label={it ? "Amministrazione" : "Admin"} />
        <h1 className="mt-6 bodoni-italic text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[color:var(--color-sepia)]">
          {it ? "L'amministrazione non è ancora collegata." : "Admin is not wired yet."}
        </h1>
        <p className="mt-4 max-w-prose text-[color:var(--color-sepia-soft)]">
          {it
            ? "Imposta le variabili Supabase in .env.local e lancia le migrazioni per attivare il pannello."
            : "Set Supabase environment variables in .env.local and run migrations to activate the admin dashboard."}
        </p>
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
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || !["editor", "admin"].includes(profile.role)) {
    return (
      <section className="container-site py-20">
        <RomanEyebrow label={it ? "Accesso" : "Access"} />
        <h1 className="mt-6 bodoni-italic text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[color:var(--color-sepia)]">
          {it ? "Accesso in attesa." : "Access pending."}
        </h1>
        <p className="mt-4 max-w-prose text-[color:var(--color-sepia-soft)]">
          {it
            ? "Il tuo account è registrato, ma non ha ancora i permessi di editor. Contatta un amministratore per abilitare l'accesso."
            : "Your account is signed in, but does not yet have editor permissions. Contact an administrator to enable access."}
        </p>
      </section>
    );
  }

  const [{ data: posts }, { data: submissions }, { data: subscribers }] = await Promise.all([
    supabase
      .from("posts")
      .select("slug, status, title_en, title_it, published_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(25),
    supabase
      .from("submissions")
      .select("id, kind, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("subscribers").select("id, status").limit(1000),
  ]);

  const counts = {
    posts: posts?.length ?? 0,
    drafts: posts?.filter((p) => p.status === "draft").length ?? 0,
    pending: submissions?.filter((s) => s.status === "pending").length ?? 0,
    subscribers: subscribers?.filter((s) => s.status === "confirmed").length ?? 0,
  };

  return (
    <section className="container-site py-16 md:py-20">
      <div className="border-y-2 border-[color:var(--color-sepia)] py-4">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.3em] text-[color:var(--color-sepia)]">
            GAUDEAMUS · AMMINISTRAZIONE
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia)]">
            {new Date().toLocaleDateString(it ? "it-IT" : "en-GB")}
          </span>
        </div>
      </div>

      <h1 className="mt-10 bodoni-italic text-[clamp(2.5rem,5vw+1rem,5rem)] leading-[1] text-[color:var(--color-sepia)]">
        {it ? "Bentornato, " : "Welcome back, "}
        <span className="text-[color:var(--color-terracotta)]">
          {profile.full_name || "editor"}.
        </span>
      </h1>

      <dl className="mt-12 grid grid-cols-2 gap-0 border-t-2 border-[color:var(--color-sepia)] md:grid-cols-4">
        {[
          { label: it ? "Articoli" : "Articles", value: counts.posts },
          { label: it ? "Bozze" : "Drafts", value: counts.drafts },
          { label: it ? "Submission in attesa" : "Pending submissions", value: counts.pending },
          { label: it ? "Iscritti newsletter" : "Newsletter subscribers", value: counts.subscribers },
        ].map((s, i) => (
          <div
            key={s.label}
            className={
              "flex flex-col gap-2 border-b border-[color:var(--color-sepia)]/25 p-6 md:border-b-0 " +
              (i < 3 ? "md:border-r md:border-r-[color:var(--color-sepia)]/25" : "")
            }
          >
            <span className="font-[family-name:var(--font-cartel)] text-[0.72rem] tracking-[0.28em] text-[color:var(--color-sepia-soft)]">
              {s.label}
            </span>
            <span className="bodoni-italic text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-[color:var(--color-terracotta)]">
              {s.value}
            </span>
          </div>
        ))}
      </dl>

      <div className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <RomanEyebrow n={1} label={it ? "Pubblicazioni" : "Publications"} />
        </div>

        {!posts || posts.length === 0 ? (
          <div className="mt-10 border-2 border-dashed border-[color:var(--color-sepia)]/30 p-10 text-center">
            <p className="bodoni-italic text-[clamp(1.5rem,2vw+1rem,2rem)] text-[color:var(--color-sepia)]">
              {it ? "Nessun articolo in archivio." : "No articles in the archive."}
            </p>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-[color:var(--color-sepia)]/20 border-y-2 border-[color:var(--color-sepia)]">
            {posts.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-4 py-5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "border px-2 py-0.5 font-[family-name:var(--font-cartel)] text-[0.68rem] tracking-[0.24em] " +
                        (p.status === "published"
                          ? "border-[color:var(--color-salvia)] text-[color:var(--color-salvia)]"
                          : "border-[color:var(--color-sepia-soft)] text-[color:var(--color-sepia-soft)]")
                      }
                    >
                      {p.status.toUpperCase()}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
                      /{p.slug}
                    </span>
                  </div>
                  <p className="mt-2 bodoni-italic text-[1.3rem] text-[color:var(--color-sepia)]">
                    {it ? p.title_it : p.title_en}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-[0.72rem] text-[color:var(--color-sepia-soft)]">
                    {new Date(p.updated_at).toLocaleDateString(it ? "it-IT" : "en-GB")}
                  </span>
                  <Link
                    href={`/admin/posts/${p.slug}`}
                    className="hover-underline font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.26em] text-[color:var(--color-terracotta)]"
                  >
                    {it ? "Modifica" : "Edit"}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-20">
        <RomanEyebrow n={2} label={it ? "Submission comunità" : "Community submissions"} />
        {!submissions || submissions.length === 0 ? (
          <p className="mt-6 font-[family-name:var(--font-body)] italic text-[color:var(--color-sepia-soft)]">
            {it ? "Ancora nessuna proposta." : "No submissions yet."}
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-[color:var(--color-sepia)]/20 border-y border-[color:var(--color-sepia)]/25">
            {submissions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.22em] text-[color:var(--color-sepia-soft)]">
                    {s.kind} · {new Date(s.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-1 bodoni-italic text-[1.1rem] text-[color:var(--color-sepia)]">
                    {s.title}
                  </p>
                </div>
                <span
                  className={
                    "border px-2 py-0.5 font-[family-name:var(--font-cartel)] text-[0.68rem] tracking-[0.24em] " +
                    (s.status === "approved"
                      ? "border-[color:var(--color-salvia)] text-[color:var(--color-salvia)]"
                      : s.status === "rejected"
                      ? "border-[color:var(--color-terracotta)] text-[color:var(--color-terracotta)]"
                      : "border-[color:var(--color-sepia-soft)] text-[color:var(--color-sepia-soft)]")
                  }
                >
                  {s.status.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-20 flex justify-center">
        <Fregio width={220} tone="terracotta" />
      </div>
    </section>
  );
}
