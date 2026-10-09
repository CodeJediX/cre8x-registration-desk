-- Cre8x 3.0 secure judges' panel.
-- Judge identities live in Supabase Auth. Only authenticated users whose
-- immutable app_metadata.role is "judge" can read the panel tables.

create schema if not exists private;

create table if not exists public.judge_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  judge_code text not null unique check (judge_code in ('hiran', 'pasindu')),
  display_name text not null check (char_length(display_name) between 2 and 120),
  title text not null check (char_length(title) between 2 and 160),
  photo_path text not null check (photo_path ~ '^assets/judge-[a-z-]+\.png$'),
  created_at timestamptz not null default now()
);

create table if not exists public.judge_scores (
  judge_id uuid not null references public.judge_profiles(user_id) on delete restrict,
  team_id text not null check (team_id in ('TM-01','TM-03','TM-05','TM-06','TM-07','TM-13','TM-17','TM-27','TM-51','TM-53')),
  research_score smallint check (research_score between 0 and 15),
  usability_score smallint check (usability_score between 0 and 25),
  visual_score smallint check (visual_score between 0 and 20),
  innovation_score smallint check (innovation_score between 0 and 15),
  technical_score smallint check (technical_score between 0 and 15),
  presentation_score smallint check (presentation_score between 0 and 10),
  notes text not null default '' check (char_length(notes) <= 3000),
  status text not null default 'draft' check (status in ('draft','submitted')),
  total_score smallint generated always as (
    coalesce(research_score,0) + coalesce(usability_score,0) +
    coalesce(visual_score,0) + coalesce(innovation_score,0) +
    coalesce(technical_score,0) + coalesce(presentation_score,0)
  ) stored,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (judge_id, team_id),
  check (
    status = 'draft' or (
      research_score is not null and usability_score is not null and
      visual_score is not null and innovation_score is not null and
      technical_score is not null and presentation_score is not null and
      submitted_at is not null
    )
  )
);

create table if not exists private.judge_score_audit (
  event_id bigint generated always as identity primary key,
  judge_id uuid not null,
  team_id text not null,
  action text not null check (action in ('INSERT','UPDATE')),
  changed_by uuid,
  changed_at timestamptz not null default now(),
  snapshot jsonb not null
);

create index if not exists judge_scores_team_status_idx on public.judge_scores (team_id, status);
create index if not exists judge_scores_updated_at_idx on public.judge_scores (updated_at desc);
create index if not exists judge_score_audit_lookup_idx on private.judge_score_audit (team_id, changed_at desc);

create or replace function public.set_judge_score_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.audit_judge_score_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into private.judge_score_audit (judge_id, team_id, action, changed_by, snapshot)
  values (new.judge_id, new.team_id, tg_op, auth.uid(), to_jsonb(new));
  return new;
end;
$$;

drop trigger if exists set_judge_score_updated_at on public.judge_scores;
create trigger set_judge_score_updated_at
before update on public.judge_scores
for each row execute function public.set_judge_score_updated_at();

drop trigger if exists audit_judge_score_change on public.judge_scores;
create trigger audit_judge_score_change
after insert or update on public.judge_scores
for each row execute function private.audit_judge_score_change();

alter table public.judge_profiles enable row level security;
alter table public.judge_profiles force row level security;
alter table public.judge_scores enable row level security;
alter table public.judge_scores force row level security;
alter table private.judge_score_audit enable row level security;
alter table private.judge_score_audit force row level security;

revoke all on table public.judge_profiles from anon, authenticated;
revoke all on table public.judge_scores from anon, authenticated;
revoke all on table private.judge_score_audit from public, anon, authenticated;
revoke all on function private.audit_judge_score_change() from public, anon, authenticated;
grant select on table public.judge_profiles to authenticated;
grant select, insert, update on table public.judge_scores to authenticated;

drop policy if exists "Verified judges read panel profiles" on public.judge_profiles;
create policy "Verified judges read panel profiles"
on public.judge_profiles for select
to authenticated
using (
  (select auth.uid()) is not null and
  (select auth.jwt()) -> 'app_metadata' ->> 'role' = 'judge'
);

drop policy if exists "Verified judges read panel scores" on public.judge_scores;
create policy "Verified judges read panel scores"
on public.judge_scores for select
to authenticated
using (
  (select auth.uid()) is not null and
  (select auth.jwt()) -> 'app_metadata' ->> 'role' = 'judge'
);

drop policy if exists "Judges create only their scorecards" on public.judge_scores;
create policy "Judges create only their scorecards"
on public.judge_scores for insert
to authenticated
with check (
  judge_id = (select auth.uid()) and
  (select auth.jwt()) -> 'app_metadata' ->> 'role' = 'judge'
);

drop policy if exists "Judges update only their scorecards" on public.judge_scores;
create policy "Judges update only their scorecards"
on public.judge_scores for update
to authenticated
using (
  judge_id = (select auth.uid()) and
  (select auth.jwt()) -> 'app_metadata' ->> 'role' = 'judge'
)
with check (
  judge_id = (select auth.uid()) and
  (select auth.jwt()) -> 'app_metadata' ->> 'role' = 'judge'
);

drop policy if exists "Client access denied" on private.judge_score_audit;
create policy "Client access denied"
on private.judge_score_audit for all
to authenticated
using (false)
with check (false);

comment on table public.judge_profiles is 'Authenticated Cre8x 3.0 final judging panel identities.';
comment on table public.judge_scores is 'RLS-protected per-judge finalist scorecards. Anonymous access is denied.';
comment on table private.judge_score_audit is 'Append-only private audit snapshots for judging score changes.';
