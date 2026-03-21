# UNIT_TESTS

Summary

Define the unit test plan and required test cases that verify correctness, input validation, Unicode handling, and edge cases for the Hamming distance library.

Specification

- Create tests in tests/unit/hamming.test.js that import named exports hammingString and hammingBits from src/lib/main.js.
- String tests must include: karolin vs kathrin equals 3, empty vs empty equals 0, unequal-length strings throw RangeError, non-string arguments throw TypeError, and Unicode examples verifying surrogate pairs and emoji are compared as code points.
- Integer tests must include: 1 vs 4 equals 2, 0 vs 0 equals 0, negative integers throw RangeError, non-integer numbers throw TypeError, and a large-integer case using Number-range values (e.g., 2**40 + 3) to validate behaviour.
- Add a small test that ensures the module exports the functions as named exports and that the README contains usage examples.

Acceptance Criteria

- Tests cover normal cases, edge cases, and error cases described above.
- Tests are written to be deterministic and fast; they rely on Node >=24 for BigInt support used internally.
- Passing tests will serve as the verification step for acceptance criteria in the mission.

Implementation Notes

- Use the existing test runner and conventions in package.json and vitest configuration.
- Keep tests focused on API semantics rather than internal implementation details so refactors do not break the test contract.