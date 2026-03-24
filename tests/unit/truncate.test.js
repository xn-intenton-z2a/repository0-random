import { describe, test, expect } from "vitest";
import { truncate } from "../../src/lib/main.js";

describe("truncate", () => {
  test("truncates without breaking word when possible", () => {
    expect(truncate("Hello World", 8)).toBe("Hello…");
  });

  test("returns empty string for null/undefined", () => {
    expect(truncate(null, 5)).toBe("");
    expect(truncate(undefined, 5)).toBe("");
  });

  test("hard-cut when first word longer than allowed", () => {
    expect(truncate("Longword", 4)).toBe("Lon…");
  });
});