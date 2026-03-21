# STRING_HAMMING

Summary

Provide a clear, well-tested implementation of Hamming distance for two strings of equal length. The implementation must compare at the Unicode code point level (not UTF-16 code units) and validate inputs according to the mission: throw TypeError for non-string arguments and RangeError for unequal-length strings.

Behavior

- Export a named function hammingString(a, b) from src/lib/main.js.
- If a or b is not a string, throw a TypeError describing the expected types.
- If a and b have different numbers of Unicode code points, throw a RangeError describing the length mismatch.
- Correctly handle Unicode by iterating code points (for example using the string iterator or codePointAt semantics) and counting differing code points.
- The function must run in O(n) time and O(1) additional space beyond iterator state.

Acceptance criteria

- Given "karolin" and "kathrin" the function returns 3.
- Given "" and "" the function returns 0.
- Passing strings of different lengths throws RangeError.
- Passing a non-string (number, object, undefined) for either argument throws TypeError.
- Unit tests exist in tests/unit/main-string.test.js covering normal, edge and error cases.

Notes

- Do not alter other functions; make this a named export and keep behaviour explicit and well-documented in README examples.