# HAMMING_STRING

Summary

A Unicode-aware Hamming distance function for strings that counts differing code points at the same positions.

Specification

- Provide a named export function hammingString(a, b) in src/lib/main.js.
- Inputs a and b must be strings. If either argument is not a string, the function must throw TypeError.
- Measure length in Unicode code points (not UTF-16 code units). If the two strings have different code point lengths, the function must throw RangeError.
- Compute the number of positions at which the corresponding code points differ. The algorithm must operate in linear time and use minimal auxiliary space.
- Empty strings are valid and must return 0.

API

- Named export: hammingString
- Signature: hammingString(a, b) -> number
- Behavior: compares code points in order using a code point iterator to ensure surrogate pairs and astral symbols are treated as single code points.

Acceptance Criteria

- Hamming distance between karolin and kathrin is 3.
- Hamming distance between an empty string and an empty string is 0.
- Calling hammingString on strings of different code point lengths throws RangeError.
- Calling hammingString with a non-string argument throws TypeError.
- Unicode correctness: surrogate pairs and emoji must be treated as single code points; tests include an emoji example where differing emoji at the same index count as one difference.

Implementation Notes

- Use String iteration (for..of or Array.from) or explicit code point iteration to obtain code points.
- Keep the implementation small and well documented so unit tests can assert exact behaviour for edge cases such as surrogate pairs and combining sequences.