MDN_CODEPOINTAT

Table of contents
1. Purpose
2. Method signature and return values
3. Surrogate-pair behavior
4. Usage guidance
5. Edge cases and errors
6. Reference digest and attribution

1. Purpose
Describe the behavior and exact return semantics of String.prototype.codePointAt for use in code-point-aware algorithms.

2. Method signature and return values
- String.prototype.codePointAt(position)
  - Parameters: position — integer index (0-based) into the string's UTF-16 code units
  - Returns: number (non-negative integer) representing the code point value at that position, or undefined if position is out of range

3. Surrogate-pair behavior
- If the code unit at position is a high surrogate and the following code unit is a low surrogate, codePointAt returns the single combined Unicode code point value (a number > 0xFFFF).
- If there is no valid low surrogate following a high surrogate, codePointAt returns the value of the single code unit at position.

4. Usage guidance
- Prefer for...of or Array.from for iteration to obtain code-point strings; use codePointAt when a numeric code point value is needed at a particular index.
- When indexing code points by visual position, be aware that codePointAt requires a UTF-16 code unit index, not a code-point index. Convert by iterating when necessary.

5. Edge cases and errors
- codePointAt coerces position to integer-like behavior; out-of-range returns undefined rather than throwing.

6. Reference digest and attribution
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 162,097
- Attribution: MDN Web Docs (Mozilla)
