MDN_UNICODE

Normalised extract

Table of contents
1. Unicode fundamentals: code point, scalar value, grapheme cluster
2. Interplay with JavaScript strings
3. Normalization and canonical equivalence
4. Best practices for string comparisons

1. Unicode fundamentals
A Unicode code point is an integer in the range U+0000..U+10FFFF. A grapheme cluster is a user-perceived character that may consist of multiple code points (base character + combining marks). Canonical equivalence means different sequences of code points can represent the same user-perceived character.

2. Interplay with JavaScript strings
JavaScript exposes strings as UTF-16 code unit sequences; high-level string operations (for..of, codePointAt) provide ways to work with code points. Grapheme cluster segmentation is not provided by default; libraries or Intl.Segmenter may be used when you need cluster-aware processing.

3. Normalization and canonical equivalence
Normalization forms (NFC/NFD/NFKC/NFKD) are used to canonicalize strings so that canonically-equivalent sequences compare identically. Normalization is orthogonal to code point iteration but necessary when callers expect canonically-equivalent inputs to be treated as equal.

4. Best practices for string comparisons
- For Hamming distance over code points: iterate using code points (for..of) and compare code point by code point.
- If canonical equivalence matters (composed vs decomposed sequences), normalize both strings to the same form (NFC recommended) before iterating.
- If user-perceived characters are required, use grapheme cluster segmentation (Intl.Segmenter) and document behavior.

Supplementary details
- Intl.Segmenter can be used for grapheme clusters when comparisons should be user-visible characters.
- Normalization transforms affect code point sequences and therefore Hamming counts; document whether normalization is applied.

Reference details
- Unicode code point range: U+0000..U+10FFFF
- Normalization forms: NFC, NFD, NFKC, NFKD
- JavaScript helpers: for..of (code point iteration), String.prototype.codePointAt, String.prototype.normalize, Intl.Segmenter for grapheme clusters.

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Glossary/Unicode
Retrieved: 2026-03-21
Bytes fetched: 174959
Key technical facts taken from the source: Unicode distinguishes code points and grapheme clusters; normalization forms exist for canonical/compatibility equivalence; JavaScript operates on UTF-16 code units internally, but provides code point iteration and normalization utilities.

Attribution
URL: https://developer.mozilla.org/en-US/docs/Glossary/Unicode
Bytes fetched: 174959
