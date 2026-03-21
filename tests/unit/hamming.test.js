// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { hammingDistanceStrings, hammingDistanceInts } from '../../src/lib/main.js';

describe('hammingDistanceStrings', () => {
  test('karolin vs kathrin -> 3', () => {
    expect(hammingDistanceStrings('karolin', 'kathrin')).toBe(3);
  });

  test('empty strings -> 0', () => {
    expect(hammingDistanceStrings('', '')).toBe(0);
  });

  test('unequal lengths throws RangeError', () => {
    expect(() => hammingDistanceStrings('a', '')).toThrow(RangeError);
  });

  test('non-strings throw TypeError', () => {
    expect(() => hammingDistanceStrings(1, 2)).toThrow(TypeError);
  });

  test('unicode code points are compared (emoji)', () => {
    expect(hammingDistanceStrings('😀', '😁')).toBe(1);
    // combined emoji vs separated code units: Array.from handles code points
    expect(hammingDistanceStrings('👨‍👩‍👧', '👨‍👩‍👦')).toBe(1);
  });
});

describe('hammingDistanceInts', () => {
  test('1 vs 4 -> 2', () => {
    expect(hammingDistanceInts(1, 4)).toBe(2);
  });

  test('0 vs 0 -> 0', () => {
    expect(hammingDistanceInts(0, 0)).toBe(0);
  });

  test('bigints supported', () => {
    const a = 12345678901234567890n;
    const b = 12345678901234567891n;
    expect(hammingDistanceInts(a, b)).toBeGreaterThanOrEqual(1);
  });

  test('non-integers throw TypeError', () => {
    expect(() => hammingDistanceInts(1.5, 2)).toThrow(TypeError);
  });

  test('negatives throw RangeError', () => {
    expect(() => hammingDistanceInts(-1, 1)).toThrow(RangeError);
  });
});
