// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { hammingString, hammingBits } from "../../src/lib/main.js";

describe("hammingString", () => {
  test("karolin vs kathrin => 3", () => {
    expect(hammingString("karolin", "kathrin")).toBe(3);
  });

  test('empty strings => 0', () => {
    expect(hammingString("", "")).toBe(0);
  });

  test('astral code points (emoji) handled as single code points', () => {
    const a = 'a😀b';
    const b = 'a😃b';
    expect(a.length).toBeGreaterThan(3); // ensure JS UTF-16 length differs
    // But code points length should be equal
    expect(Array.from(a).length).toBe(Array.from(b).length);
    expect(hammingString(a, b)).toBe(1);
  });

  test('unequal lengths throws RangeError', () => {
    expect(() => hammingString('a', 'ab')).toThrow(RangeError);
  });

  test('non-string args throw TypeError', () => {
    expect(() => hammingString(1, 'a')).toThrow(TypeError);
    expect(() => hammingString('a', null)).toThrow(TypeError);
  });
});

describe('hammingBits', () => {
  test('1 vs 4 => 2', () => {
    expect(hammingBits(1, 4)).toBe(2);
  });

  test('0 vs 0 => 0', () => {
    expect(hammingBits(0, 0)).toBe(0);
  });

  test('large integers work (2**40 + 3 vs 3 => 1)', () => {
    const a = 2 ** 40 + 3;
    expect(Number.isInteger(a)).toBe(true);
    expect(hammingBits(a, 3)).toBe(1);
  });

  test('non-integer throws TypeError', () => {
    expect(() => hammingBits(1.5, 2)).toThrow(TypeError);
    expect(() => hammingBits('1', 2)).toThrow(TypeError);
  });

  test('negative integers throw RangeError', () => {
    expect(() => hammingBits(-1, 2)).toThrow(RangeError);
    expect(() => hammingBits(1, -2)).toThrow(RangeError);
  });
});
