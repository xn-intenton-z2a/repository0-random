// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { nextRun } from "../../src/lib/main.js";

describe("Next Run Calculation", () => {
  test("returns next Monday at 09:00 UTC after given date", () => {
    const from = new Date('2026-03-21T00:00:00Z');
    const next = nextRun('0 9 * * 1', from);
    expect(next.getUTCHours()).toBe(9);
    expect(next.getUTCDay()).toBe(1);
    expect(next.getTime()).toBeGreaterThan(from.getTime());
  });

  test("next run for feb29 from 2023-01-01 is 2024-02-29", () => {
    const next = nextRun('0 0 29 2 *', new Date('2023-01-01T00:00:00Z'));
    expect(next.toISOString()).toBe('2024-02-29T00:00:00.000Z');
  });

  test("next run respects seconds when provided (6-field)", () => {
    const from = new Date('2026-03-21T00:00:00Z');
    const next = nextRun('5 * * * * *', from);
    expect(next.getUTCSeconds()).toBe(5);
    expect(next.getTime()).toBeGreaterThan(from.getTime());
  });
});
