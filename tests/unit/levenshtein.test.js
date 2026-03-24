import { describe, test, expect } from "vitest";
import { levenshtein } from "../../src/lib/main.js";

describe("levenshtein", () => {
  test("computes kitten -> sitting = 3", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  test("handles null/undefined as empty strings", () => {
    expect(levenshtein(null, null)).toBe(0);
    expect(levenshtein(null, "abc")).toBe(3);
  });

  test("unicode handling", () => {
    expect(levenshtein("å", "a")).toBe(1);
  });
});