# UNIT_TESTS

Summary

Define the unit test plan and required test cases that verify correctness, input validation, Unicode handling, and edge cases for the Hamming distance library.

Specification

- Create tests in tests/unit/hamming.test.js that import named exports hammingDistanceString and hammingDistanceBits from src/lib/main.js.
- String tests must include: karolin vs kathrin equals 3, empty vs empty equals 0, unequal-length strings throw RangeError, non-string arguments throw TypeError, and Unicode examples verifying surrogate pairs and emoji are compared as code points.
- Integer tests must include: 1 vs 4 equals 2, 0 vs 0 equals 0, negative integers throw RangeError, non-integer numbers throw TypeError, and BigInt or very large integers behave correctly.
- Add a small test that ensures the module exports the functions as named exports.

Acceptance Criteria

- Tests cover normal cases, edge cases, and error cases described above.
- Tests are written to be deterministic and fast; they may rely on Node 24 or later for BigInt support.
- Passing tests will serve as the verification step for acceptance criteria in the mission.

Implementation Notes

- Use the existing test runner and conventions in package.json and vitest configuration.
- Keep tests focused on API semantics rather than internal implementation details so refactors do not break the test contract.