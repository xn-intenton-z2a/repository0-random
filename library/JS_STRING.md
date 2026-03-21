Title: JS_STRING

Table of contents
- JS string internal representation (UTF-16 code units)
- Code units vs code points
- APIs that expose code points (Array.from, for...of, spread, codePointAt)
- Correct iteration and length measurement for Unicode-aware algorithms
- Exact usage patterns for Hamming-distance string comparison
- Pitfalls and troubleshooting
- Digest and attribution

JS string internal representation
- ECMAScript stores strings as sequences of UTF-16 code units. String.length returns code unit count, not Unicode code points. Characters outside BMP (U+10000 and above) are represented as surrogate pairs occupying two code units.

Code units vs code points
- Code unit: 16-bit unit used by UTF-16. Code point: Unicode scalar value.
- For Unicode-correct position-wise comparison, operate on code points.

APIs exposing code points
- Array.from(string) returns an array of strings, each a Unicode code point (correctly handles surrogate pairs).
- for (const ch of string) iterates by code point.
- Spread [...string] yields code point strings, equivalent to Array.from.
- String.prototype.codePointAt(pos) returns the numeric code point at a given code-unit index; use cautiously because pos indexes code units.

Exact usage pattern for Hamming-distance string comparison
- Normalize if desired: a = a.normalize('NFC'); b = b.normalize('NFC');
- Use A = Array.from(a); B = Array.from(b); if A.length !== B.length throw RangeError; count differences by direct equality A[i] !== B[i].
- Alternative (memory-efficient): use iterators ai = a[Symbol.iterator](), bi = b[Symbol.iterator]() and compare next().value pairs until both done.

Pitfalls and troubleshooting
- Do not rely on string.length for length comparisons when Unicode matters.
- codePointAt takes a code-unit index; to get the nth code point value, convert with Array.from or iterate.
- Normalization differences produce false differences; decide whether to normalize before comparison.

Digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 197349

Attribution
MDN Web Docs: String reference material, retrieved 2026-03-21; size 197349 bytes.
