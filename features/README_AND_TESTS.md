# README_AND_TESTS

Purpose

Add documentation and tests that demonstrate and validate the library API and acceptance criteria from the mission.

Behavior

- README must document the library API with usage examples for string and bit Hamming distance functions and show expected results for the canonical examples (karolin vs kathrin, 1 vs 4, empty strings).
- Tests must be added or updated under tests/unit to cover normal cases, edge cases (empty strings, zero, large integers), and error cases (unequal-length strings, negative integers, wrong types).
- Ensure src/lib/main.js exports all public API as named exports so the examples work when imported.

Acceptance criteria

- README contains usage examples for both string and bit Hamming distance and shows the expected outputs described in the mission.
- Unit tests cover the acceptance criteria listed in the mission and pass when run.
- The public API is exported as named exports from src/lib/main.js and referenced by the README examples.

Notes

- Keep README examples concise and match the test cases exactly so they serve as living documentation.