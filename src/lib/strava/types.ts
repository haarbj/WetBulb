// Only the fields this app actually reads from Strava's activity summary
// object -- the real response has many more, deliberately not modeled here.
export type StravaActivity = {
  id: number;
  name: string;
  distance: number; // meters
  moving_time: number; // seconds
  type: string; // legacy field, e.g. "Run"
  sport_type: string; // current field, e.g. "Run", "TrailRun", "VirtualRun"
  start_date_local: string; // ISO 8601, already in the athlete's local time
  average_heartrate?: number;
};
