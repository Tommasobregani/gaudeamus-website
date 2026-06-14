-- Contact email delivery tracking --------------------------------------
-- Adds fields needed to record Resend delivery attempts for existing DBs.

alter table public.contact_messages
  add column if not exists recipient_email text,
  add column if not exists email_error text;

alter table public.contact_messages
  drop constraint if exists contact_messages_email_status_check;

alter table public.contact_messages
  add constraint contact_messages_email_status_check
  check (email_status in ('pending', 'sent', 'failed'));
