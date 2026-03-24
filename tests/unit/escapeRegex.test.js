import { describe, test, expect } from "vitest";
import { escapeRegex } from "../../src/lib/main.js";

describe("escapeRegex", () => {
  test("escapes special regex characters", () => {
    expect(escapeRegex("^test.$")).toBe("\\^test\\.\\$");
  });

  test("null/undefined returns empty string", () => {
    expect(escapeRegex(null)).toBe("");
  });
});