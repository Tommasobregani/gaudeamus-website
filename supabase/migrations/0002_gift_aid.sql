-- Gift Aid declarations submitted from /sostienici/gift-aid.
-- Stored in Supabase so the accountant can pull them as a CSV at year-end.

create table if not exists public.gift_aid_declarations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  address_line1 text not null,
  city text not null,
  postcode text not null,
  country text not null default 'United Kingdom',
  donation_amount numeric(10, 2),
  donation_date date,
  consent_at timestamptz not null default now(),
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.gift_aid_declarations enable row level security;

-- No public read. Admins only.
create policy "gift_aid admin read" on public.gift_aid_declarations
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Insert via the API route using the service-role key (bypasses RLS).
-- We deliberately do NOT add a public insert policy: writes must go through the server.

create index if not exists gift_aid_created_at_idx
  on public.gift_aid_declarations (created_at desc);
