# Gaudeamus — Website

An Italo-Scottish charity promoting Italian culture and heritage in Scotland.
Next.js 15 App Router + Supabase + Resend, bilingual (EN / IT), editorial, SEO-first.

---

## Stack

- **Next.js 15** (App Router, React 19, Node ≥20)
- **Tailwind CSS v4** (`@theme` token system)
- **Motion for React** (`motion/react`, restrained editorial animations)
- **next-intl 3** — `/en` + `/it` localized routes, cookie-persistent toggle, hreflang alternates
- **Supabase** — auth, Postgres, storage (community submissions)
- **Resend** — newsletter + transactional email
- **next/font** — Fraunces, Inter, JetBrains Mono (self-hosted)
- **TypeScript strict**, ESLint, Prettier + Tailwind plugin

## Design

Direction in one line: *editorial, discreet, Italian typography × Scottish space*.

- Palette: cream `#F4EFE6`, ink `#1A1713`, oxblood `#6B2B2B`, bottle green `#2F4A3A`, aged gold `#B08A3E`, Scottish slate-blue `#27374A`.
- Typography: **Fraunces** (display serif, italics carry the brand), **Inter** (body), **JetBrains Mono** (labels/eyebrows).
- Texture: subtle dot-grid background, optional paper-grain on accent sections.
- Motion: fade + stagger on scroll, letter reveals on heroes, parallax on hero imagery. Respects `prefers-reduced-motion`.

## Pages

| Route (EN) | Route (IT) | Purpose |
|---|---|---|
| `/en` | `/it` | Home — hero, manifesto, featured projects, latest news, newsletter, closing CTA |
| `/en/about` | `/it/chi-siamo` | Mission, values, staff, press |
| `/en/projects` | `/it/progetti` | Current + past productions |
| `/en/projects/[slug]` | `/it/progetti/[slug]` | Single event — lightbox gallery, bilingual body, event JSON-LD |
| `/en/events` | `/it/eventi` | Upcoming + past events |
| `/en/news` | `/it/news` | Journal index + `/news/[slug]` article pages |
| `/en/support` | `/it/sostienici` | Donation info (coming-soon placeholder), volunteer, attend |
| `/en/contact` | `/it/contatti` | Three emails, two locations (Aberdeen HQ, Glasgow), registered-as |
| `/en/auth/login` · `/signup` | same | Supabase auth (hidden from main nav) |
| `/en/partecipa` | same | Community submission form (hidden from main nav until activated) |
| `/en/admin` | same | Role-gated moderation dashboard |

`/sitemap.xml` · `/robots.txt` · `/feed.xml` · `/opengraph-image` · `/manifest.webmanifest` · `/icon.svg` are all generated.

## Setup

```bash
# Install
pnpm install

# Development
cp .env.example .env.local
# fill in Supabase + Resend keys (both optional in dev; app degrades gracefully)
pnpm dev   # → http://localhost:3000/en

# Production build
pnpm build && pnpm start
```

### Environment

```
NEXT_PUBLIC_SITE_URL            https://www.italiandramauk.org
NEXT_PUBLIC_SUPABASE_URL        (Supabase project URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY   (Supabase anon key)
SUPABASE_SERVICE_ROLE_KEY       (server-side only)
RESEND_API_KEY                  (Resend API key)
RESEND_FROM_EMAIL               Gaudeamus <hello@italiandramauk.org>
RESEND_NEWSLETTER_AUDIENCE_ID   (Resend audience ID)
```

### Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/0001_init.sql` in the SQL editor.
3. Create a public Storage bucket named **`community`** for user submissions.
4. To promote a user to admin:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@italiandramauk.org';
   ```

### Resend

1. Verify the `italiandramauk.org` domain.
2. Create an **Audience** for the newsletter. Copy its ID into `RESEND_NEWSLETTER_AUDIENCE_ID`.
3. The `/api/newsletter` route will create contacts in that audience.

## Content

Seed content lives in `src/content/`:
- `events.ts` — 6 productions/events, bilingual
- `news.ts` — 3 seed articles, bilingual
- `staff.ts` — placeholder bios

When the CMS lands, swap these files for Supabase fetches.

## SEO

- Per-page `generateMetadata` with bilingual title/description, canonical, hreflang (en + it + x-default).
- JSON-LD: `Organization` (NGO + PerformingGroup), `WebSite`, `TheaterEvent`/`Event`, `Article`, `BreadcrumbList`.
- Dynamic OG image at `/opengraph-image` (edge runtime, 1200×630).
- Sitemap includes every `en`/`it` URL pair with `<xhtml:link rel="alternate" hreflang="…">`.
- `/feed.xml` RSS for journal.

## Media

- Event photos live in `public/events/<slug>/`. Add more photos by dropping them in and referencing them in `src/content/events.ts`.
- Uploaded community media (via `/partecipa`) goes to the Supabase `community` bucket.

## Deployment (Vercel)

1. Push to GitHub.
2. Import repo on Vercel.
3. Add env vars (above).
4. Deploy. Node runtime = 20+.

## Handoff notes

- The community layer (auth, `/partecipa`, `/admin`) is **wired but hidden from the public nav** per the client brief ("semplice ed essenziale, potrà essere ampliato in futuro"). Link to `/partecipa` from the footer or add a "Community" nav item when the client is ready.
- The logo is a typographic placeholder (`src/components/brand/Wordmark.tsx`). Replace with the official Gaudeamus logo file when received — single-file swap.
- `favicon.ico` / Apple touch icon are covered by `src/app/icon.svg` (monogram). Replace with branded files when available.

---

Designed and built with care in Scotland and Italy.
