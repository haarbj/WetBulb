-- Coach-athlete access control (Stage 1 of the Brophy Broncos XC pivot).
-- Reuses the team_role/teams/team_memberships stubs from the very first
-- migration (deliberately left unused until this point -- see that
-- migration's own comment) as the single source of truth for "is this
-- account approved, and as what role": a user with no team_memberships row
-- is unapproved, caught by the (protected) layout and sent to /pending.
--
-- One team for v1 -- seeded at a fixed id so the trigger below can
-- reference it without a runtime name lookup.
insert into public.teams (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Brophy Broncos XC')
on conflict (id) do nothing;

-- Coach access is invite-gated by exact email, not just domain: an
-- @brophyprep.org address alone does not grant coach access, only a
-- specific, admin-issued invite for that exact email does. The token
-- exists to build a shareable one-time signup URL; the actual security
-- boundary is the email match performed inside the trigger below.
create table public.coach_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  token uuid not null default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  redeemed_at timestamptz,
  redeemed_by uuid references public.profiles (id)
);
create unique index coach_invites_email_unique_idx on public.coach_invites (lower(email));
create index idx_coach_invites_team_id on public.coach_invites (team_id);

alter table public.coach_invites enable row level security;
-- Zero policies for `authenticated`/`anon` -- deny-all by default, same
-- convention this schema already used for `teams` before this migration.
-- Only the security-definer trigger below and the service-role admin
-- Server Actions (src/lib/db/service-role.ts) can ever touch this table.

create policy "teams_select_member" on public.teams
  for select to authenticated using (
    id in (select team_id from public.team_memberships where user_id = (select auth.uid()))
  );

create policy "team_memberships_select_team_coach" on public.team_memberships
  for select to authenticated using (
    team_id in (
      select team_id from public.team_memberships
      where user_id = (select auth.uid()) and role = 'coach'
    )
  );

-- Extends the existing handle_new_user() (see
-- 20260708141509_update_handle_new_user_oauth.sql) rather than adding
-- separate checks in the signUp Server Action or the OAuth callback: this
-- trigger is the only code that unconditionally fires for both
-- email/password and Google OAuth signups (OAuth creates the auth.users
-- row via GoTrue before any app route runs), so it's the single choke
-- point that can't be bypassed by either signup path.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_broncos_team_id constant uuid := '00000000-0000-0000-0000-000000000001';
  v_invite public.coach_invites%rowtype;
begin
  insert into public.profiles (id, display_name, avatar_url, timezone, units)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Runner'
    ),
    new.raw_user_meta_data ->> 'avatar_url',
    'UTC',
    'mi'
  );

  -- Athletes auto-join the one team by domain -- no per-athlete invite.
  if lower(split_part(new.email, '@', 2)) = 'brophybroncos.org' then
    insert into public.team_memberships (team_id, user_id, role)
    values (v_broncos_team_id, new.id, 'athlete')
    on conflict (team_id, user_id) do nothing;
    return new;
  end if;

  -- Coaches only get in via an exact-email invite redemption.
  select * into v_invite from public.coach_invites
    where lower(email) = lower(new.email) and redeemed_at is null
    limit 1;

  if found then
    insert into public.team_memberships (team_id, user_id, role)
    values (v_invite.team_id, new.id, 'coach')
    on conflict (team_id, user_id) do nothing;
    update public.coach_invites set redeemed_at = now(), redeemed_by = new.id where id = v_invite.id;
  end if;

  return new; -- no team_memberships row = the "pending" state, caught at the app layer
end;
$$;
