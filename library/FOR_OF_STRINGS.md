Normalised extract

Table of contents:
- for...of iteration over strings
- Behavior: yields code-point strings
- Use cases for code-point-safe processing

for...of iteration over strings
- The for...of statement iterates over iterable objects. For strings, each iteration yields a substring representing a single Unicode code point (not a UTF-16 code unit), so surrogate pairs are presented as a single iteration value.

Behavior: yields code-point strings
- Example behavior: for (const ch of str) { /* ch is one code point */ }
- This guarantees that comparing two strings by iterating with for...of compares full code points at corresponding logical positions.

Use cases for code-point-safe processing
- Character-by-character comparison, normalization, counting of glyphs (not grapheme clusters), measuring length in code points, and safe substring operations when code points may be beyond BMP.

Detailed digest
- Source: MDN for...of - iterating over strings (retrieved: 2026-03-21)

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#iterating_over_strings
- Retrieved: 2026-03-21
