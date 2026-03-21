# HAMMING_STRINGS

Summary
A feature to implement Unicode-aware Hamming distance for equal-length strings by comparing code points (not UTF-16 code units). This provides a stable API for string comparisons that correctly handles surrogate pairs and extended Unicode characters.

Motivation
Using code-unit-based comparisons causes incorrect results for characters outside the BMP; the library must compare strings by Unicode code points to meet correctness requirements in internationalised contexts.

Specification
- Export a named function hammingDistanceStrings(a, b) from src/lib/main.js.
- Inputs: both arguments must be of type string.
- Behavior:
  - If either argument is not a string, throw TypeError.
  - Convert both strings to sequences of Unicode code points (Array.from or iterator). If the code-point lengths differ, throw RangeError.
  - Count positions i where codePointA[i] !== codePointB[i] and return the integer count.
  - Do not perform Unicode normalization by default; document that callers may normalise inputs first if desired.
- Performance: O(n) time where n is the number of code points; avoid unnecessary intermediate allocations when possible.

Acceptance criteria
- Hamming distance between karolin and kathrin is 3.
- Hamming distance between empty strings is 0.
- Comparing strings with differing code-point lengths throws RangeError.
- Surrogate pairs are treated as single positions: a single astral character compared to itself yields distance 0.

Notes
- The function name hammingDistanceStrings is a recommendation; other names are acceptable provided they are exported as a named export and documented in README.md.