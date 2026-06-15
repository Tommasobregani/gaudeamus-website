-- Extend Gift Aid declarations for the public declaration form.
-- Existing split-name/address columns are kept for compatibility.

alter table public.gift_aid_declarations
  add column if not exists full_name text,
  add column if not exists home_address text,
  add column if not exists donation_reference text,
  add column if not exists submitted_at timestamptz not null default now(),
  add column if not exists uk_taxpayer_confirmed boolean not null default false,
  add column if not exists gift_aid_confirmed boolean not null default false,
  add column if not exists tax_responsibility_confirmed boolean not null default false,
  add column if not exists notification_sent_at timestamptz,
  add column if not exists notification_error text;

create index if not exists gift_aid_submitted_at_idx
  on public.gift_aid_declarations (submitted_at desc);
