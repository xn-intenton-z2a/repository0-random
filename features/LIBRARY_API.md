# LIBRARY_API

Summary

Ensure the library exports a clear, minimal API and supply README examples that demonstrate both string and bit Hamming distance usage. The feature ties the string and bit implementations together and specifies tests and README examples to meet mission acceptance criteria.

Behavior

- src/lib/main.js must export named functions: hammingString and hammingBits.
- Provide small usage examples in README.md showing both functions with expected outputs (karolin/kathrin and 1/4 examples).
- Add unit tests that import named exports and verify acceptance criteria; tests must be placed under tests/unit/ and named main.*.test.js.
- Update package.json scripts if necessary to run tests; avoid adding new dependencies.

Acceptance criteria

- src/lib/main.js contains named exports hammingString and hammingBits.
- README.md includes short usage examples demonstrating: hammingString("karolin","kathrin") -> 3 and hammingBits(1, 4) -> 2.
- Unit tests for both features exist and cover the acceptance criteria.
- All new feature files are concise, testable, and reference the mission requirements.

Notes

- This feature coordinates implementation and documentation; implementation remains small and confined to src/lib/main.js and tests under tests/unit/.