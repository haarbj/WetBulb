-- Training groups (varsity/JV/frosh/etc.) -- free-form, coach-created and
-- named. Athletes are added to zero or more groups by the coach; groups are
-- the unit the redesigned schedule-builder (a later migration) targets
-- instead of the whole roster or one athlete at a time.

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  name text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (team_id, name)
);

create table public.group_memberships (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (group_id, user_id)
);

create index idx_groups_team_id on public.groups (team_id);
create index idx_group_memberships_group_id on public.group_memberships (group_id);
create index idx_group_memberships_user_id on public.group_memberships (user_id);

alter table public.groups enable row level security;
alter table public.group_memberships enable row level security;

-- Coach of the team: full CRUD, reusing the existing my_coach_team_id()
-- helper (added in the Stage 1 recursion fix).
create policy "groups_select_coach" on public.groups
  for select to authenticated using (team_id = public.my_coach_team_id());
create policy "groups_insert_coach" on public.groups
  for insert to authenticated with check (team_id = public.my_coach_team_id());
create policy "groups_update_coach" on public.groups
  for update to authenticated using (team_id = public.my_coach_team_id()) with check (team_id = public.my_coach_team_id());
create policy "groups_delete_coach" on public.groups
  for delete to authenticated using (team_id = public.my_coach_team_id());

-- Athlete: select-only, scoped to groups they're actually a member of (so
-- they can eventually see their own group's name/context) -- membership
-- itself is only ever written by the coach.
create policy "groups_select_member" on public.groups
  for select to authenticated using (
    id in (select group_id from public.group_memberships where user_id = (select auth.uid()))
  );

create policy "group_memberships_select_coach" on public.group_memberships
  for select to authenticated using (
    group_id in (select id from public.groups where team_id = public.my_coach_team_id())
  );
create policy "group_memberships_insert_coach" on public.group_memberships
  for insert to authenticated with check (
    group_id in (select id from public.groups where team_id = public.my_coach_team_id())
  );
create policy "group_memberships_delete_coach" on public.group_memberships
  for delete to authenticated using (
    group_id in (select id from public.groups where team_id = public.my_coach_team_id())
  );

create policy "group_memberships_select_own" on public.group_memberships
  for select to authenticated using (user_id = (select auth.uid()));
