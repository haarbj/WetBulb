-- The group-schedule athlete view never explained why a session looks the
-- way it does -- the self-serve side's "why this workout" concept never
-- made it into the coach-authored group model. This is coach-curated,
-- static content (generated once via a button, then editable/removable),
-- not a live per-view AI call, so it's just a text column.
alter table public.group_plan_workouts add column explanation text;
