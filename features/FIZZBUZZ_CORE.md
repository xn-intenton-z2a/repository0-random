# FIZZBUZZ_CORE

Summary

Implement the core FizzBuzz library in src/lib/main.js as two named ESM exports: fizzBuzz(n) and fizzBuzzSingle(n). Both functions must validate inputs and follow the canonical FizzBuzz rules.

Specification

- fizzBuzz(n)
  - If n is 0 return an empty array.
  - If n is a negative integer, throw RangeError.
  - If n is not a number or not an integer, throw TypeError.
  - For n > 0 return an array of length n where element i-1 is the result of fizzBuzzSingle(i) for i from 1 to n.
- fizzBuzzSingle(n)
  - Validate n similarly: TypeError for non-integers or non-number; RangeError for negative.
  - For positive integers return:
    - FizzBuzz when divisible by both 3 and 5
    - Fizz when divisible by 3
    - Buzz when divisible by 5
    - otherwise the decimal string of n
- Exports: both functions must be named exports in src/lib/main.js

Notes

- Use Number.isInteger to check integerness.
- Prefer a simple for-loop implementation for predictability and O(n) time.

# Acceptance Criteria

- fizzBuzz(15) returns a 15-element array ending with FizzBuzz
- fizzBuzzSingle(3) returns Fizz
- fizzBuzzSingle(5) returns Buzz
- fizzBuzzSingle(15) returns FizzBuzz
- fizzBuzzSingle(7) returns 7 (as a string)
- fizzBuzz(0) returns an empty array
- Both functions throw RangeError for negative input
- Both functions throw TypeError for non-integer or non-number input
- Both functions are exported as named ESM exports from src/lib/main.js
