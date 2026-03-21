// SPDX-License-Identifier: MIT
// Unit tests for FizzBuzz functions
import { describe, test, expect } from "vitest";
import { fizzBuzz, fizzBuzzSingle } from "../../src/lib/main.js";

describe("fizzBuzzSingle - core cases", () => {
  test("fizzBuzzSingle(3) returns 'Fizz'", () => {
    expect(fizzBuzzSingle(3)).toBe("Fizz");
  });

  test("fizzBuzzSingle(5) returns 'Buzz'", () => {
    expect(fizzBuzzSingle(5)).toBe("Buzz");
  });

  test("fizzBuzzSingle(15) returns 'FizzBuzz'", () => {
    expect(fizzBuzzSingle(15)).toBe("FizzBuzz");
  });

  test("fizzBuzzSingle(7) returns '7'", () => {
    expect(fizzBuzzSingle(7)).toBe("7");
  });
});

describe("fizzBuzz - array output and edge cases", () => {
  test("fizzBuzz(15) returns expected 15-element array ending with 'FizzBuzz'", () => {
    const expected = [
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
    ];
    expect(fizzBuzz(15)).toEqual(expected);
  });

  test("fizzBuzz(0) returns []", () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test("fizzBuzz throws RangeError for negative numbers", () => {
    expect(() => fizzBuzz(-1)).toThrow(RangeError);
  });

  test("fizzBuzz throws TypeError for non-integer inputs", () => {
    expect(() => fizzBuzz(2.5)).toThrow(TypeError);
    expect(() => fizzBuzz("10")).toThrow(TypeError);
  });
});

describe("fizzBuzzSingle - input validation", () => {
  test("fizzBuzzSingle throws RangeError for non-positive integers", () => {
    expect(() => fizzBuzzSingle(0)).toThrow(RangeError);
    expect(() => fizzBuzzSingle(-3)).toThrow(RangeError);
  });

  test("fizzBuzzSingle throws TypeError for non-integers", () => {
    expect(() => fizzBuzzSingle(3.14)).toThrow(TypeError);
    expect(() => fizzBuzzSingle("3")).toThrow(TypeError);
  });
});
