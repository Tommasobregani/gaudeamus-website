-- Gaudeamus — initial schema
-- Create from Supabase SQL editor or `supabase db push`.
-- Auth is managed by Supabase; we store profiles + community data on top.

-- Profiles -----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles admin read" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

-- Posts (news/journal) -----------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  title_en text not null,
  title_it text not null,
  excerpt_en text,
  excerpt_it text,
  body_en text,
  body_it text,
  cover_url text,
  category_en text,
  category_it text,
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "posts public read" on public.posts
  for select using (status = 'published');

create policy "posts admin all" on public.posts
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('editor', 'admin'))
  );

-- Events -------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'past' check (status in ('past', 'current', 'upcoming')),
  kind text not null check (kind in ('production', 'gathering', 'workshop')),
  year int not null,
  start_date date,
  title_en text not null,
  title_it text not null,
  summary_en text,
  summary_it text,
  description_en text[],
  description_it text[],
  venues text[],
  cover_url text,
  gallery text[] default '{}',
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events public read" on public.events
  for select using (true);

create policy "events admin all" on public.events
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('editor', 'admin'))
  );

-- Community submissions (moderation queue) ---------------------------
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  kind text not null check (kind in ('photo', 'video', 'article', 'event')),
  title text not null,
  body text,
  media_urls text[] default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderator_note text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

create policy "submissions self read" on public.submissions
  for select using (author_id = auth.uid());

create policy "submissions self insert" on public.submissions
  for insert with check (author_id = auth.uid());

create policy "submissions admin all" on public.submissions
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('editor', 'admin'))
  );

-- Newsletter subscribers (local mirror of Resend audience) -----------
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'en' check (locale in ('en', 'it')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  resend_contact_id text,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

create policy "subscribers admin all" on public.subscribers
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('editor', 'admin'))
  );

-- Auto-create profile on signup --------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
