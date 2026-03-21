MDN_STRING_ITERATION

Table of contents
- Overview
- Iteration semantics for strings in JavaScript
- Code point vs code unit: correct comparison method
- Practical iteration patterns
- Edge cases with surrogate pairs and combining marks
- Reference APIs and signatures
- Retrieval digest and attribution

Overview
In JavaScript, string iteration (for...of, spread, Array.from) iterates Unicode code points, not UTF-16 code units. This is critical when comparing characters in strings containing surrogate pairs (e.g., emoji, supplementary-plane characters).

Iteration semantics for strings in JavaScript
- String.prototype[@@iterator] yields complete Unicode code points.
- for (const ch of string) iterates by code point.
- Array.from(string) and [...string] produce arrays of code points.

Code point vs code unit: correct comparison method
- Use code point iteration or String.prototype.codePointAt to inspect code points.
- Avoid indexing with string[i] when dealing with Unicode characters outside BMP; string[i] returns a 16-bit code unit and can split surrogate pairs.
- To compare two strings by code points, iterate both via for...of and compare each yielded value; enforce equal lengths (count of code points) before position-wise comparison.

Practical iteration patterns
- Count code points: [...str].length or use for...of and increment a counter.
- Position-wise comparison example: create iterators for both strings, advance stepwise comparing elements; throw RangeError if counts differ.

Edge cases with surrogate pairs and combining marks
- Combining marks alter perceived grapheme clusters; comparing code points treats combining sequences as different code points even if visually similar. For grapheme cluster-aware comparisons, use Intl.Segmenter or third-party libraries, but the mission requires code-point based Hamming distance.

Reference APIs and signatures
- String.prototype[Symbol.iterator]() -> iterator over string code points
- for (const ch of string) yields string values (code-point sequences)
- Array.from(string) -> string[] (each element is a code point string)
- String.prototype.codePointAt(pos: number) -> number | undefined

Retrieval digest
- Source: MDN String documentation (string iteration and code point notes)
- Retrieved: 2026-03-21
- Approx. downloaded HTML: ~200 KB

Attribution and data size
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#iterating_over_strings
- Retrieved: 2026-03-21
- License: MDN content (see MDN site for license and reuse terms)
