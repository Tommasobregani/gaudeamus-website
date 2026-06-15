-- Ensure the public Gift Aid declaration form can insert every field it sends.
-- All additions are idempotent so this can be run safely on existing projects.

alter table public.gift_aid_declarations
  add column if not exists full_name text,
  add column if not exists home_address text,
  add column if not exists donation_reference text,
  add column if not exists submitted_at timestamptz not null default now(),
  add column if not exists is_uk_taxpayer boolean not null default false,
  add column if not exists uk_taxpayer_confirmed boolean not null default false,
  add column if not exists gift_aid_confirmed boolean not null default false,
  add column if not exists tax_responsibility_confirmed boolean not null default false,
  add column if not exists notification_sent_at timestamptz,
  add column if not exists notification_error text,
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists address_line1 text,
  add column if not exists city text,
  add column if not exists country text default 'United Kingdom',
  add column if not exists donation_amount numeric(10, 2),
  add column if not exists consent_at timestamptz default now(),
  add column if not exists ip_hash text,
  add column if not exists user_agent text,
  add column if not exists created_at timestamptz not null default now();

create index if not exists gift_aid_submitted_at_idx
  on public.gift_aid_declarations (submitted_at desc);
