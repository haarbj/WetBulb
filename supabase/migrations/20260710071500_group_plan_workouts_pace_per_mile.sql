-- group_plan_workouts is a standalone structure (nothing else reads these
-- columns the way the self-serve engine's km-based WorkoutPrescription
-- does), and the coach always enters/reads pace in miles -- storing sec/km
-- forced a mile<->km round-trip on every save/display that introduced
-- rounding drift (e.g. 7:30 could redisplay as 7:31). Storing per-mile
-- directly removes the conversion, and therefore the drift, entirely.
alter table public.group_plan_workouts rename column pace_fast_sec_per_km to pace_fast_sec_per_mile;
alter table public.group_plan_workouts rename column pace_slow_sec_per_km to pace_slow_sec_per_mile;
