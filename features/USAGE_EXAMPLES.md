# USAGE_EXAMPLES

Summary
Examples and recommended README content showing the public API usage for both string and integer Hamming distance functions; these examples are intended to be small, copy-paste friendly lines that will be included in README.md.

Examples to include in README (plain lines)
- Compute Unicode-aware string hamming distance: hammingDistanceStrings('karolin', 'kathrin') -> 3
- Compute empty-string distance: hammingDistanceStrings('', '') -> 0
- Compute bit-level distance (Numbers): hammingDistanceIntegers(1, 4) -> 2
- Compute bit-level distance (BigInt): hammingDistanceIntegers(9007199254740993n, 9007199254740995n) -> 2

Acceptance criteria
- README contains at least the four examples above demonstrating the API for strings and integers.
- Examples are plain, use the public named exports, and show expected return values.

Notes
- The examples should be added to README.md during implementation work; this feature file defines the canonical examples to be used.