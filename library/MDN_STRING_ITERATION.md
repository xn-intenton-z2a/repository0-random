MDN_STRING_ITERATION

Table of contents
1. Purpose and problem statement
2. Code points vs UTF-16 code units
3. String iterator (for...of and Symbol.iterator)
4. Array.from and spread operator behavior
5. Practical patterns for code-point iteration
6. Caveats and normalization
7. API/details summary
8. Reference digest and attribution

1. Purpose and problem statement
This document extracts the MDN technical points needed to iterate JavaScript strings correctly by Unicode code points rather than by UTF-16 code units.

2. Code points vs UTF-16 code units
- JavaScript strings internally are sequences of UTF-16 code units. Surrogate pairs represent code points outside the Basic Multilingual Plane and require two code units.
- s.length reports UTF-16 code units, not Unicode code points; this is not suitable for code-point-sensitive operations.

3. String iterator (for...of and Symbol.iterator)
- The string iterator (String.prototype[Symbol.iterator]) yields string values that correspond to full Unicode code points (surrogate pairs are combined). Using for...of over a string iterates code points, not code units.
- Behavior: for (const cp of s) { /* cp is a string containing a single code point (which may be two UTF-16 code units) */ }
- This iterator is the canonical, efficient way to walk code points without allocating a full array.

4. Array.from and spread operator behavior
- Array.from(s) and [...s] both create arrays of Unicode code point strings (same semantics as for...of), suitable when random access or length checking is required.
- These methods allocate memory proportional to the number of code points.

5. Practical patterns for code-point iteration
- To compare code points in two strings in parallel without allocating arrays: use their iterators (a[Symbol.iterator](), b[Symbol.iterator]()) and advance both in lockstep, checking for combined completion.
- To obtain numeric code point values at an index, use String.prototype.codePointAt(index) which returns the numeric code point for position index (see MDN_CODEPOINTAT document).

6. Caveats and normalization
- Combining marks and grapheme clusters: code-point iteration does not equal human-perceived characters. If consumers require grapheme clusters, use Intl.Segmenter or a third-party library to segment before comparison.
- Normalization: canonical equivalence (NFC/NFD) affects code point sequences; normalise when required.

7. API/details summary
- String.prototype[Symbol.iterator]() -> Iterator<string>
  - Each yielded string corresponds to one Unicode code point (a sequence of one or two code units when surrogate pairs are present).
- Array.from(string) -> Array<string> (array of code point strings)

8. Reference digest and attribution
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#iterating_over_strings
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 197,349
- Attribution: MDN Web Docs (Mozilla)
