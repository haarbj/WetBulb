import { describe, expect, it } from "vitest";
import { activityLocalDate, isRunningActivity, mapToWorkoutCompletion } from "@/lib/strava/map-activity";
import type { StravaActivity } from "@/lib/strava/types";

function activity(overrides: Partial<StravaActivity> = {}): StravaActivity {
  return {
    id: 12345678,
    name: "Morning Run",
    distance: 8046.7,
    moving_time: 2580,
    type: "Run",
    sport_type: "Run",
    start_date_local: "2026-07-08T06:15:00Z",
    average_heartrate: 152.3,
    ...overrides,
  };
}

describe("isRunningActivity", () => {
  it("accepts Run, TrailRun, and VirtualRun", () => {
    expect(isRunningActivity(activity({ sport_type: "Run" }))).toBe(true);
    expect(isRunningActivity(activity({ sport_type: "TrailRun" }))).toBe(true);
    expect(isRunningActivity(activity({ sport_type: "VirtualRun" }))).toBe(true);
  });

  it("rejects non-running activities", () => {
    expect(isRunningActivity(activity({ sport_type: "Ride" }))).toBe(false);
    expect(isRunningActivity(activity({ sport_type: "Swim" }))).toBe(false);
    expect(isRunningActivity(activity({ sport_type: "Walk" }))).toBe(false);
  });

  it("falls back to the legacy type field if sport_type is empty", () => {
    expect(isRunningActivity(activity({ sport_type: "", type: "Run" }))).toBe(true);
  });
});

describe("activityLocalDate", () => {
  it("takes the calendar date directly from start_date_local, no timezone conversion", () => {
    expect(activityLocalDate(activity({ start_date_local: "2026-07-08T06:15:00Z" }))).toBe("2026-07-08");
    expect(activityLocalDate(activity({ start_date_local: "2026-12-31T23:59:00Z" }))).toBe("2026-12-31");
  });
});

describe("mapToWorkoutCompletion", () => {
  it("rounds distance and time to whole numbers", () => {
    const result = mapToWorkoutCompletion(activity({ distance: 8046.72, moving_time: 2580.4 }));
    expect(result.actual_distance_m).toBe(8047);
    expect(result.actual_time_s).toBe(2580);
    expect(Number.isInteger(result.actual_distance_m)).toBe(true);
    expect(Number.isInteger(result.actual_time_s)).toBe(true);
  });

  it("rounds average heart rate when present", () => {
    const result = mapToWorkoutCompletion(activity({ average_heartrate: 152.3 }));
    expect(result.avg_hr).toBe(152);
  });

  it("is null for heart rate when the activity has none", () => {
    const result = mapToWorkoutCompletion(activity({ average_heartrate: undefined }));
    expect(result.avg_hr).toBeNull();
  });

  it("carries the Strava activity ID through for dedup", () => {
    const result = mapToWorkoutCompletion(activity({ id: 999888777 }));
    expect(result.strava_activity_id).toBe(999888777);
  });
});
