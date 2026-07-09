-- Fixes a real bug in the previous migration: team_memberships_select_team_coach's
-- own policy subquery reads from team_memberships itself, which Postgres
-- correctly rejects as infinite recursion (42P17) -- confirmed live: it
-- silently broke every getAppSession() approval check, not just coaches',
-- since the query errors out and getAppSession() treats a failed read as
-- "no membership found" rather than surfacing the error.
--
-- Fix: route the self-referencing lookup through a security-definer
-- function, which bypasses RLS for its own internal query and breaks the
-- cycle. This is also exactly the helper Stage 2 (coach-athlete RLS) needs,
-- so it's introduced here rather than duplicated later.
create or replace function public.my_coach_team_id()
returns uuid
language sql
security definer
stable
set search_path = ''
as $$
  select team_id from public.team_memberships
  where user_id = (select auth.uid()) and role = 'coach'
  limit 1;
$$;

drop policy if exists "team_memberships_select_team_coach" on public.team_memberships;
create policy "team_memberships_select_team_coach" on public.team_memberships
  for select to authenticated using (team_id = public.my_coach_team_id());
