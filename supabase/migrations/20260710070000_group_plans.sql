-- The core of the redesign: a coach-authored, group-shared weekly
-- schedule, matching how a real HS team's plan actually looks (one shared
-- entry per group per session -- time, location, free-text description,
-- optional distance/pace) rather than an individually-generated
-- distance/pace prescription per athlete. Deliberately a new, parallel
-- structure alongside (not a modification of) the existing individual
-- training_plans/mesocycles/workouts tables, which keep serving non-team
-- self-serve athletes completely unchanged.

create table public.group_plans (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  season_plan_id uuid not null references public.season_plans (id) on delete cascade,
  group_id uuid not null references public.groups (id) on delete cascade,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (season_plan_id, group_id)
);

create table public.group_plan_workouts (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  group_plan_id uuid not null references public.group_plans (id) on delete cascade,
  season_phase_id uuid references public.season_phases (id) on delete set null,
  scheduled_date date not null,
  time_of_day text,
  location text,
  description text not null,
  secondary_activity text,
  workout_type public.workout_type,
  -- Both opt-in, null by default -- shown to athletes only when the coach
  -- actually fills them in, never assumed or computed.
  distance_m int,
  pace_fast_sec_per_km int,
  pace_slow_sec_per_km int,
  is_race boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_group_plans_season_plan_id on public.group_plans (season_plan_id);
create index idx_group_plans_group_id on public.group_plans (group_id);
create index idx_group_plan_workouts_group_plan_id on public.group_plan_workouts (group_plan_id);
create index idx_group_plan_workouts_scheduled_date on public.group_plan_workouts (scheduled_date);

alter table public.group_plans enable row level security;
alter table public.group_plan_workouts enable row level security;

-- Coach of the team: full CRUD on both.
create policy "group_plans_all_coach" on public.group_plans
  for all to authenticated using (team_id = public.my_coach_team_id()) with check (team_id = public.my_coach_team_id());
create policy "group_plan_workouts_all_coach" on public.group_plan_workouts
  for all to authenticated using (team_id = public.my_coach_team_id()) with check (team_id = public.my_coach_team_id());

-- Athlete: select-only, scoped to PUBLISHED plans for groups they belong to.
-- Reuses is_member_of_group() from the groups-recursion fix migration.
create policy "group_plans_select_member" on public.group_plans
  for select to authenticated using (published_at is not null and public.is_member_of_group(group_id));

create policy "group_plan_workouts_select_member" on public.group_plan_workouts
  for select to authenticated using (
    group_plan_id in (
      select id from public.group_plans
      where published_at is not null and public.is_member_of_group(group_id)
    )
  );
