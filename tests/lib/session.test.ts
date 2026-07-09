import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { isAdminEmail } from "@/lib/auth/session";

const ORIGINAL_ADMIN_EMAILS = process.env.ADMIN_EMAILS;

describe("isAdminEmail", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAILS = "owner@example.com, second-admin@example.com";
  });

  afterEach(() => {
    process.env.ADMIN_EMAILS = ORIGINAL_ADMIN_EMAILS;
  });

  it("matches an exact email in the allowlist", () => {
    expect(isAdminEmail("owner@example.com")).toBe(true);
  });

  it("matches case-insensitively", () => {
    expect(isAdminEmail("Owner@Example.com")).toBe(true);
  });

  it("tolerates whitespace around entries in the allowlist", () => {
    expect(isAdminEmail("second-admin@example.com")).toBe(true);
  });

  it("rejects an email not in the allowlist", () => {
    expect(isAdminEmail("someone-else@example.com")).toBe(false);
  });

  it("rejects null", () => {
    expect(isAdminEmail(null)).toBe(false);
  });

  it("rejects everything when the allowlist is empty", () => {
    process.env.ADMIN_EMAILS = "";
    expect(isAdminEmail("owner@example.com")).toBe(false);
  });

  it("rejects everything when the allowlist is unset", () => {
    delete process.env.ADMIN_EMAILS;
    expect(isAdminEmail("owner@example.com")).toBe(false);
  });
});
