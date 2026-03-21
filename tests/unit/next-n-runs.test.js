// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { nextRuns } from "../../src/lib/main.js";

describe("Next N Runs", () => {
  test("@daily returns consecutive daily dates in UTC", () => {
    const arr = nextRuns('@daily', 7, new Date('2026-01-01T00:00:00Z'));
    expect(arr).toHaveLength(7);
    expect(arr[0].getUTCHours()).toBe(0);
    expect(arr[0].getUTCMinutes()).toBe(0);
    expect(arr[1].getTime() - arr[0].getTime()).toBe(24*60*60*1000);
  });

  test("month-end behavior for day 31", () => {
    const runs = nextRuns('0 0 31 * *', 3, new Date('2025-01-01T00:00:00Z'));
    expect(runs.map(d => d.toISOString())).toEqual([
      '2025-01-31T00:00:00.000Z',
      '2025-03-31T00:00:00.000Z',
      '2025-05-31T00:00:00.000Z'
    ]);
  });
});
