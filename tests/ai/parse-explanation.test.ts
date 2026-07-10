import { describe, expect, it } from "vitest";
import { parseStructuredExplanation } from "@/lib/ai/parse-explanation";

const WELL_FORMED = `GOAL: Build aerobic durability for race day.
WHY: You're in the base phase, so easy volume comes before anything faster.
FEEL: Comfortable and conversational the whole way.
MISTAKE: Starting too fast and turning it into a tempo run.
RECOVERY: An easy day or full rest tomorrow to absorb the mileage.`;

describe("parseStructuredExplanation", () => {
  it("parses a well-formed response into all five fields", () => {
    const result = parseStructuredExplanation(WELL_FORMED);
    expect(result).toEqual({
      goal: "Build aerobic durability for race day.",
      why: "You're in the base phase, so easy volume comes before anything faster.",
      feel: "Comfortable and conversational the whole way.",
      mistake: "Starting too fast and turning it into a tempo run.",
      recovery: "An easy day or full rest tomorrow to absorb the mileage.",
    });
  });

  it("folds a wrapped continuation line back into the preceding label", () => {
    const wrapped = `GOAL: Build aerobic durability
for race day.
WHY: Base phase reasoning.
FEEL: Easy effort.
MISTAKE: Going out too fast.
RECOVERY: Rest tomorrow.`;
    const result = parseStructuredExplanation(wrapped);
    expect(result?.goal).toBe("Build aerobic durability for race day.");
  });

  it("tolerates leading blank lines and surrounding whitespace", () => {
    const padded = `\n\n  ${WELL_FORMED}  \n\n`;
    expect(parseStructuredExplanation(padded)).not.toBeNull();
  });

  it("returns null when a section is missing", () => {
    const missingRecovery = `GOAL: Build aerobic durability.
WHY: Base phase.
FEEL: Easy.
MISTAKE: Going out too fast.`;
    expect(parseStructuredExplanation(missingRecovery)).toBeNull();
  });

  it("returns null when a labeled section has no content", () => {
    const empty = `GOAL:
WHY: Base phase.
FEEL: Easy.
MISTAKE: Going out too fast.
RECOVERY: Rest.`;
    expect(parseStructuredExplanation(empty)).toBeNull();
  });

  it("returns null for a garbled, unstructured response", () => {
    expect(parseStructuredExplanation("This workout is a tempo run because you're building fitness.")).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(parseStructuredExplanation("")).toBeNull();
  });

  it("is order-independent", () => {
    const reordered = `RECOVERY: Rest tomorrow.
MISTAKE: Going out too fast.
FEEL: Easy effort.
WHY: Base phase reasoning.
GOAL: Build aerobic durability.`;
    const result = parseStructuredExplanation(reordered);
    expect(result?.goal).toBe("Build aerobic durability.");
    expect(result?.recovery).toBe("Rest tomorrow.");
  });
});
