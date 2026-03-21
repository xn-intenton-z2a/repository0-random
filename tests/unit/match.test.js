// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { matches } from "../../src/lib/main.js";

describe("Match Check", () => {
  test("matches exact UTC instant", () => {
    expect(matches('0 0 25 12 *', new Date('2025-12-25T00:00:00Z'))).toBe(true);
    expect(matches('0 0 25 12 *', new Date('2025-12-25T00:00:01Z'))).toBe(false);
  });

  test("leap year feb29 match", () => {
    expect(matches('0 0 29 2 *', new Date('2024-02-29T00:00:00Z'))).toBe(true);
  });
});
