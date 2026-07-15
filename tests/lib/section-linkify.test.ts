import { describe, expect, it } from "vitest";

import { findSectionReferences } from "@/lib/section-linkify";

describe("findSectionReferences", () => {
  it("links a heading cross-reference to its anchor on the target page", () => {
    const text =
      "The practical guideline that follows: pursue performance and body-composition goals through training and food that supports the work, not by eating less than the training demands — see Whole Food Most of the Time, Fast Fuel When It Matters in Nutrition & Fueling for what adequate fueling actually looks like at high training volumes.";
    const matches = findSectionReferences(text, "recovery");
    expect(matches).toHaveLength(1);
    expect(matches[0].phrase).toBe("Whole Food Most of the Time, Fast Fuel When It Matters");
    expect(matches[0].href).toBe("/nutrition-and-fueling#whole-food-most-of-the-time-fast-fuel-when-it-matters");
  });

  it("links a whole-section reference (no specific heading) to the bare page", () => {
    const text = "the same stress-hormone system covered in Relative Energy Deficiency in Sport (RED-S) below";
    // No "in <Section>" suffix here, so this particular phrase shouldn't match on its own --
    // covered by the dedicated "in Recovery" cases below instead.
    expect(findSectionReferences(text, "some-other-page")).toEqual([]);
  });

  it("handles an inserted article ('in the X') as well as a bare section title", () => {
    const text = "see VO2 Max Doesn't Decide Who Wins in the Research Library for more.";
    const matches = findSectionReferences(text, "exercise-physiology");
    expect(matches).toHaveLength(1);
    expect(matches[0].phrase).toBe("VO2 Max Doesn't Decide Who Wins");
    expect(matches[0].href).toContain("/research-library#");
  });

  it("does not link a page's cross-reference back to itself", () => {
    const text =
      "see Whole Food Most of the Time, Fast Fuel When It Matters in Nutrition & Fueling for what adequate fueling looks like.";
    expect(findSectionReferences(text, "nutrition-and-fueling")).toEqual([]);
  });

  it("does not produce a false-positive match for ordinary text that isn't a real cross-reference", () => {
    const text = "The muscles heal in recovery over the following days, nothing more specific than that.";
    expect(findSectionReferences(text, "some-other-page")).toEqual([]);
  });

  it("finds multiple distinct cross-references in the same text", () => {
    const text =
      "See Carb Loading Before a Long Race in Nutrition & Fueling first, then Strength Training Actually Needs a Schedule in Recovery.";
    const matches = findSectionReferences(text, "some-other-page");
    expect(matches.map((m) => m.phrase)).toEqual([
      "Carb Loading Before a Long Race",
      "Strength Training Actually Needs a Schedule",
    ]);
  });
});
