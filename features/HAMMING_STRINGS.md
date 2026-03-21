# HAMMING_STRINGS

Summary
A feature specifying Unicode-aware Hamming distance for equal-length strings. The repository exposes this as the named export hammingString from src/lib/main.js and it must compare Unicode code points (not UTF-16 code units).

Motivation
Code-unit comparisons break for characters outside the BMP (surrogate pairs). Comparing by code points ensures correct results for internationalised text.

Specification
- Export a named function hammingString(a, b) from src/lib/main.js.
- Inputs: both arguments must be of type string.
- Validation: if either argument is not a string, throw TypeError.
- Behavior:
  - Convert both strings to sequences of Unicode code points (for example using Array.from or a code point iterator).
  - If the code-point lengths differ, throw RangeError.
  - Count positions i where codePointA[i] !== codePointB[i] and return the integer count.
  - Do not perform Unicode normalization by default; document that callers may normalize inputs beforehand.

Acceptance criteria
- Hamming distance between "karolin" and "kathrin" is 3.
- Hamming distance between "" and "" is 0.
- Comparing strings with differing code-point lengths throws RangeError.
- Surrogate pairs are treated as single positions: an astral character compared to itself yields distance 0.

Notes
- The function name hammingString must be exported as a named export and documented in README.md.
