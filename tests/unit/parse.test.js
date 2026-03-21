// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron } from "../../src/lib/main.js";

describe("Cron Parser", () => {
  test("parses step tokens like */15", () => {
    const parsed = parseCron('*/15 * * * *');
    expect(parsed.minutes).toEqual([0,15,30,45]);
    expect(parsed.hours.length).toBe(24);
    // seconds default to [0]
    expect(parsed.seconds).toEqual([0]);
  });

  test("parses 6-field cron with seconds", () => {
    const parsed = parseCron('5 */15 * * * *');
    expect(parsed.seconds).toEqual([5]);
    expect(parsed.minutes).toEqual([0,15,30,45]);
  });

  test("throws on invalid numeric ranges", () => {
    expect(() => parseCron('61 * * * *')).toThrow(SyntaxError);
    expect(() => parseCron('*/-5 * * * *')).toThrow(SyntaxError);
    expect(() => parseCron('not-a-cron')).toThrow(SyntaxError);
  });

  test("throws on invalid seconds in 6-field cron", () => {
    expect(() => parseCron('61 * * * * *')).toThrow(SyntaxError);
    expect(() => parseCron('*/-5 * * * * *')).toThrow(SyntaxError);
  });
});
