# UNIT_TESTS

Summary

Add unit tests under tests/unit/main.test.js using Vitest that verify all functional and edge behaviours of the FizzBuzz library.

Specification

- Test core behaviour:
  - fizzBuzz(15) returns expected array of length 15 with last element FizzBuzz
  - fizzBuzzSingle returns Fizz, Buzz, FizzBuzz and the number-as-string for representative inputs
- Test edge cases:
  - fizzBuzz(0) returns empty array
  - Negative inputs throw RangeError
  - Non-integer and non-number inputs throw TypeError
- Test exports:
  - Import named exports from src/lib/main.js and ensure they are functions callable as expected
- Keep tests deterministic and isolated without relying on environment or network

# Acceptance Criteria

- A tests/unit/main.test.js file exists implementing the above tests
- Running npm test exits successfully and all tests pass
- Tests cover the specified edge cases and core scenarios
