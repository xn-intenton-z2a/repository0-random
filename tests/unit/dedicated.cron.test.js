// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron, matches, nextRun, nextRuns, stringifyCron } from "../../src/lib/main.js";

describe("Dedicated cron tests", () => {
  test("parses step tokens and 6-field seconds", () => {
    const p = parseCron('*/15 * * * *');
    expect(p.minutes).toEqual([0,15,30,45]);
    expect(p.seconds).toEqual([0]);

    const p6 = parseCron('5 */15 * * * *');
    expect(p6.seconds).toEqual([5]);
    expect(p6.minutes).toEqual([0,15,30,45]);
  });

  test("matches specific date (Christmas 2025)", () => {
    expect(matches('0 0 25 12 *', new Date('2025-12-25T00:00:00Z'))).toBe(true);
  });

  test("next run for Monday 09:00 UTC", () => {
    const from = new Date('2026-03-21T00:00:00Z');
    const next = nextRun('0 9 * * 1', from);
    expect(next.getUTCHours()).toBe(9);
    expect(next.getUTCDay()).toBe(1);
    expect(next.getTime()).toBeGreaterThan(from.getTime());
  });

  test("next 7 runs for @daily are consecutive days", () => {
    const arr = nextRuns('@daily', 7, new Date('2026-01-01T00:00:00Z'));
    expect(arr).toHaveLength(7);
    expect(arr[1].getTime() - arr[0].getTime()).toBe(24 * 60 * 60 * 1000);
  });

  test("month-end behavior for day 31 skips months without 31 days", () => {
    const runs = nextRuns('0 0 31 * *', 3, new Date('2025-01-01T00:00:00Z'));
    expect(runs.map(d => d.toISOString())).toEqual([
      '2025-01-31T00:00:00.000Z',
      '2025-03-31T00:00:00.000Z',
      '2025-05-31T00:00:00.000Z'
    ]);
  });

  test("leap year handling for Feb 29", () => {
    const next = nextRun('0 0 29 2 *', new Date('2023-01-01T00:00:00Z'));
    expect(next.toISOString()).toBe('2024-02-29T00:00:00.000Z');
  });

  test("invalid expressions throw descriptive errors", () => {
    expect(() => parseCron('')).toThrow(SyntaxError);
    expect(() => parseCron('not-a-cron')).toThrow(SyntaxError);
  });

  test("stringify returns canonical forms for shortcuts", () => {
    const s = stringifyCron(parseCron('@monthly'));
    expect(s).toBe('0 0 1 * *');
  });
});
