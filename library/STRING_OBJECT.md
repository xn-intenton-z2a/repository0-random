STRING_OBJECT

TABLE OF CONTENTS
- Unicode normalization (String.prototype.normalize)
- Removing diacritics (NFKD + combining mark removal)
- Case mapping guidance and locale considerations
- Useful String methods for implementation
- Reference details and examples

NORMALISED EXTRACT
- String.prototype.normalize(form) where form ∈ {"NFC", "NFD", "NFKC", "NFKD"} performs Unicode normalization on the string.
- Removing diacritics (decomposing accents) pattern: normalize to NFKD or NFD then remove combining marks (Unicode category M). In implementations that support Unicode property escapes, the removal can be applied with a Unicode-aware regex that matches combining marks.
- Practical procedure to strip diacritics (description):
  1. s = s.normalize('NFKD')
  2. s = remove characters in Unicode category Mn (mark, nonspacing). After removal, re-normalise to NFC if needed.

SUPPLEMENTARY DETAILS
- Regex for matching combining marks (if runtime supports Unicode property escapes): \p{M} with the u flag. Example description: use pattern /\p{M}+/u to remove combining marks after decomposition.
- Case mapping: default toLowerCase()/toUpperCase() use Unicode case mappings; some locales (Turkish, Azeri) have special mappings (dotted/dotless I) — for locale-sensitive conversions use toLocaleLowerCase('tr') or pass a locale list.
- Beware that some case mappings produce multi-character expansions (e.g., German ß -> SS on uppercase). For operations relying on character counts, treat results as strings, not single character transforms.

REFERENCE DETAILS
- String.prototype.normalize([form]) where form defaults to 'NFC'. Valid values: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'.
- Use String.fromCodePoint and String.codePointAt when manipulating characters beyond BMP.

DIGEST (excerpt from MDN; retrieved 2026-03-24)
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- Excerpt (start): "The String object is used to represent and manipulate a sequence of characters."

ATTRIBUTION
- Source: MDN Web Docs — String object and normalization
- Retrieved: 2026-03-24
- Bytes downloaded: 197349
