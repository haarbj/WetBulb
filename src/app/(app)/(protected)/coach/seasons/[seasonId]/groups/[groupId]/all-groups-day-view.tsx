"use client";

import { workoutTypeLabel } from "@/app/(app)/(protected)/plan/format-workout";
import { formatDate } from "@/lib/format";
import type { Workout } from "./schedule-builder";

export type GroupDayEntries = {
  groupId: string;
  groupName: string;
  workoutsByDate: Record<string, Workout[]>;
};

// Read-only, cross-group view -- editing still happens from within a
// specific group's own week view (this is for "what's everyone doing
// today," not authoring). Same underlying data the per-group builder
// already fetches, just re-grouped by date first, then by group.
export function AllGroupsDayView({ dates, groups }: { dates: string[]; groups: GroupDayEntries[] }) {
  if (dates.length === 0) {
    return <p className="text-sm text-zinc-600 dark:text-zinc-300">Nothing scheduled yet.</p>;
  }

  return (
    <div className="space-y-6">
      {dates.map((date) => {
        const groupsWithEntries = groups.filter((g) => (g.workoutsByDate[date] ?? []).length > 0);
        if (groupsWithEntries.length === 0) return null;
        return (
          <div key={date} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">{formatDate(date)}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {groupsWithEntries.map((g) => (
                <div key={g.groupId} className="rounded-xl border border-black/10 p-3 dark:border-white/10">
                  <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                    {g.groupName}
                  </p>
                  <div className="mt-1.5 space-y-2">
                    {g.workoutsByDate[date].map((w) => (
                      <div key={w.id}>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {[w.time_of_day, w.location].filter(Boolean).join(" · ") || "—"}
                          {w.workout_type && ` · ${workoutTypeLabel(w.workout_type)}`}
                          {w.is_race && " · Race"}
                        </p>
                        <p className="text-sm text-zinc-900 dark:text-white">{w.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
