-- Cre8x 3.0 registration desk demo backend.
-- This public-desk access model is intentionally simple for a classroom demo.
-- Add Supabase Auth and staff-only policies before using it for a real event.

create table public.registration_state (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null check (jsonb_typeof(data) = 'object' and data ? 'teams'),
  revision bigint not null default 1 check (revision >= 0),
  updated_at timestamptz not null default now()
);

alter table public.registration_state enable row level security;

grant select, insert, update on public.registration_state to anon, authenticated;

create policy "Public desk can read registration state"
on public.registration_state for select
to anon, authenticated
using (id = 1);

create policy "Public desk can create registration state"
on public.registration_state for insert
to anon, authenticated
with check (id = 1);

create policy "Public desk can update registration state"
on public.registration_state for update
to anon, authenticated
using (id = 1)
with check (id = 1);
