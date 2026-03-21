WIKIPEDIA_UTF-16

Normalised extract

Table of contents
1. UTF-16 basics (code units and code points)
2. Surrogate pairs and ranges
3. How JavaScript strings map to UTF-16
4. Practical guidance for iterating code points in JS

1. UTF-16 basics (code units and code points)
UTF-16 encodes Unicode code points using one or two 16-bit code units. Code points in the Basic Multilingual Plane (U+0000..U+FFFF) fit in one 16-bit unit; code points above U+FFFF are encoded as a surrogate pair (two 16-bit units).

2. Surrogate pairs and ranges
High (lead) surrogates: U+D800..U+DBFF. Low (trail) surrogates: U+DC00..U+DFFF. A valid surrogate pair is a high surrogate followed by a low surrogate and encodes a single code point in the supplementary planes.

3. How JavaScript strings map to UTF-16
JavaScript strings are sequences of UTF-16 code units. String.length reports the number of code units, not code points. Direct indexing like str[i] yields a single code unit; supplementary-plane characters are represented as two code units (two slots). Comparing or counting code points requires iterating over code points rather than code units.

4. Practical guidance for iterating code points in JS
- Use for (const ch of str) to iterate Unicode code points (the string iterator yields full code points, handling surrogate pairs correctly).
- Use String.prototype.codePointAt(index) to obtain code points by code unit index; combine with proper surrogate handling.

Supplementary details
- When implementing Hamming distance over strings: treat strings as sequences of Unicode code points. Use the string iterator (for..of) or codePointAt based iteration to ensure surrogate pairs are handled as single code points.

Reference details
- Key facts: JS strings are UTF-16 code unit sequences; surrogate-pair handling is required for correct code point iteration; for..of yields code points.

Detailed digest
Source: https://en.wikipedia.org/wiki/UTF-16
Retrieved: 2026-03-21
Bytes fetched: 238631
Key technical facts taken from the source: UTF-16 is a variable-length encoding using 16-bit code units; surrogate pair ranges are explicit; JavaScript uses UTF-16 code units internally and requires surrogate-aware iteration to operate on code points.

Attribution
URL: https://en.wikipedia.org/wiki/UTF-16
Bytes fetched: 238631
