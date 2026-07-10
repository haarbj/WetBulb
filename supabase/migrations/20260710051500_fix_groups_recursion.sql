-- Fixes a real bug in the previous migration: groups_select_member's own
-- subquery reads group_memberships, whose own coach policy reads groups,
-- which evaluates groups_select_member again -- infinite recursion
-- (Postgres 42P17), same class of bug as the earlier
-- team_memberships_select_team_coach fix. Breaking the cycle the same way:
-- a security-definer helper that reads group_memberships directly,
-- bypassing its RLS (and therefore never re-entering groups' own policy).

create or replace function public.is_member_of_group(check_group_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.group_memberships
    where group_id = check_group_id and user_id = (select auth.uid())
  );
$$;

drop policy if exists "groups_select_member" on public.groups;
create policy "groups_select_member" on public.groups
  for select to authenticated using (public.is_member_of_group(id));
