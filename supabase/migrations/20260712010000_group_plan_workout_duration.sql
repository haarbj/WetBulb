-- A coach almost always knows how long a session should take, separate
-- from the clock time practice starts (time_of_day, optional, blank for
-- OYO/remote days) -- distance/pace stays the opt-in alternative it
-- already was.
alter table public.group_plan_workouts add column duration_min int;
