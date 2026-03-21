Normalised extract

Table of contents:
- String code points vs UTF-16 code units
- APIs to obtain code points
- Iteration and indexing considerations

String code points vs UTF-16 code units
- JavaScript strings are sequences of UTF-16 code units. Characters outside the BMP (U+10000 and above) are encoded as surrogate pairs (two code units). Comparing by code units (string.length and direct indexing) can split a single Unicode symbol into two.

APIs to obtain code points
- String.prototype.codePointAt(pos) returns the numeric code point value at the given position (pos refers to code unit index). To iterate by code point positions, use for...of which yields full code points as strings.
- To get code-point-aware length, iterate with for...of and count iterations or use the spread operator [...str].length.

Iteration and indexing considerations
- Avoid using str[i] when treating characters as Unicode code points; use for...of or Array.from(str) / [...str] to obtain code point sequences.
- When using codePointAt with indices, be careful when indices point inside a surrogate pair; prefer streaming iteration.

Supplementary details
- For comparing strings position-by-position by semantic characters, iterate both strings with for...of and compare each yielded string element (which represents one Unicode code point or extended grapheme cluster depending on normalization; for grapheme clusters use Intl.Segmenter or third-party libraries).

Detailed digest
- Source: MDN String.prototype.codePointAt (retrieved: 2026-03-21)

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
- Retrieved: 2026-03-21
