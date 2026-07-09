-- Phase 6's Strava sync needs a way to tell "already imported this activity"
-- from "log this as a new completion" so re-running sync (or an overlapping
-- date range) never creates duplicates. Partial unique index rather than a
-- plain column constraint -- manually-logged completions have no Strava
-- activity behind them at all (null), and shouldn't be constrained by this.
alter table public.workout_completions
  add column strava_activity_id bigint;

create unique index idx_workout_completions_strava_activity_id
  on public.workout_completions (user_id, strava_activity_id)
  where strava_activity_id is not null;

comment on column public.workout_completions.strava_activity_id is
  'Strava''s own activity ID, set only for completions imported via sync; null for manually-logged ones.';
