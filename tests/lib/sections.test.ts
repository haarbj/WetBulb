import { describe, expect, it } from "vitest";

import { resolveLinkedSection, sectionMap } from "@/lib/sections";

describe("resolveLinkedSection", () => {
  it("resolves a bare section slug with no anchor", () => {
    const result = resolveLinkedSection("recovery");
    expect(result).not.toBeNull();
    expect(result?.section.slug).toBe("recovery");
    expect(result?.href).toBe("/recovery");
  });

  it("resolves a slug with a heading anchor, preserving the anchor in the href", () => {
    const result = resolveLinkedSection("recovery#jog-through-soreness-don-t-wait-it-out");
    expect(result).not.toBeNull();
    expect(result?.section.slug).toBe("recovery");
    expect(result?.href).toBe("/recovery#jog-through-soreness-don-t-wait-it-out");
  });

  it("returns null for a base slug that doesn't match any real section", () => {
    expect(resolveLinkedSection("not-a-real-slug#some-anchor")).toBeNull();
    expect(resolveLinkedSection("not-a-real-slug")).toBeNull();
  });

  it("returns null for null, undefined, or an empty string", () => {
    expect(resolveLinkedSection(null)).toBeNull();
    expect(resolveLinkedSection(undefined)).toBeNull();
    expect(resolveLinkedSection("")).toBeNull();
  });

  it("only splits on the first '#', treating the rest of the string as the anchor", () => {
    const result = resolveLinkedSection("recovery#one#two");
    expect(result?.href).toBe("/recovery#one#two");
  });

  it("agrees with sectionMap on which base slugs are real", () => {
    for (const slug of sectionMap.keys()) {
      expect(resolveLinkedSection(`${slug}#whatever-anchor`)?.section.slug).toBe(slug);
    }
  });
});
