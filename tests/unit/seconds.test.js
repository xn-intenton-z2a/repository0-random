// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron, nextRun, nextRuns, matches } from "../../src/lib/main.js";

describe("6-field cron (seconds) support", () => {
  test("parses seconds as first field and preserves minute steps", () => {
    const p = parseCron('0 */15 * * * *');
    expect(p.seconds).toEqual([0]);
    expect(p.minutes).toEqual([0,15,30,45]);
  });

  test("matches respects seconds field", () => {
    expect(matches('0 0 0 25 12 *', new Date('2025-12-25T00:00:00Z'))).toBe(true);
    expect(matches('5 0 9 * * *', new Date('2026-03-21T09:00:05Z'))).toBe(true);
    expect(matches('5 0 9 * * *', new Date('2026-03-21T09:00:06Z'))).toBe(false);
  });

  test("nextRun uses seconds when present", () => {
    const from = new Date('2026-03-21T09:00:04Z');
    const next = nextRun('5 0 9 * * *', from);
    expect(next.toISOString()).toBe('2026-03-21T09:00:05.000Z');
  });

  test("*/10 seconds returns expected sequence", () => {
    const runs = nextRuns('*/10 * * * * *', 3, new Date('2026-01-01T00:00:00Z'));
    expect(runs.map(d => d.toISOString())).toEqual([
      '2026-01-01T00:00:10.000Z',
      '2026-01-01T00:00:20.000Z',
      '2026-01-01T00:00:30.000Z'
    ]);
  });

  test("invalid second token throws SyntaxError", () => {
    expect(() => parseCron('60 * * * * *')).toThrow(SyntaxError);
  });
});
