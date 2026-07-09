-- coach_invites.created_by/redeemed_by were left without an `on delete`
-- clause, so Postgres defaults to `no action` -- confirmed live: deleting a
-- profiles row that's referenced by either column fails outright instead
-- of cascading, which would block deleting a coach's account later just as
-- much as it blocked cleaning up test accounts during verification. Both
-- are audit-only attribution fields; losing them on profile deletion is the
-- correct behavior, matching this schema's existing on-delete-set-null
-- convention for similar non-essential references (e.g.
-- training_plans.goal_id).
alter table public.coach_invites
  drop constraint coach_invites_created_by_fkey,
  add constraint coach_invites_created_by_fkey
    foreign key (created_by) references public.profiles (id) on delete set null;

alter table public.coach_invites
  drop constraint coach_invites_redeemed_by_fkey,
  add constraint coach_invites_redeemed_by_fkey
    foreign key (redeemed_by) references public.profiles (id) on delete set null;
