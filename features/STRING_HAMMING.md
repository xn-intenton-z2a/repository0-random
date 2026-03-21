# STRING_HAMMING

Purpose

Specify a feature that implements Hamming distance for two equal-length strings using Unicode code points.

Behavior

- Export a named function hammingDistanceStrings(a, b).
- Validate that both a and b are strings; otherwise throw TypeError.
- Compare strings by Unicode code points (not UTF-16 code units) using streaming iteration (for...of or equivalent).
- If the code point lengths differ, throw RangeError.
- Return the non-negative integer count of positions where code points differ.

Acceptance criteria

- Hamming distance between karolin and kathrin is 3.
- Hamming distance between empty string and empty string is 0.
- Comparing strings of different lengths throws RangeError.
- Passing non-string arguments throws TypeError.
- Function is exported as a named export from src/lib/main.js and covered by unit tests in tests/unit/.

Notes

- Implementation should avoid allocating large intermediate arrays when possible; streaming iteration is preferred but either approach is acceptable if tests pass.