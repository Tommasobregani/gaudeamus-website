-- Contact form messages ------------------------------------------------
-- Saved before best-effort email delivery so enquiries are not lost if
-- Resend cannot send while the domain is unverified.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  recipient text not null check (recipient in ('general', 'artistic')),
  email_status text not null default 'pending' check (email_status in ('pending', 'sent')),
  resend_id text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "contact messages admin read" on public.contact_messages
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('editor', 'admin'))
  );
