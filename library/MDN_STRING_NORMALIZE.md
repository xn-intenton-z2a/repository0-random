MDN_STRING_NORMALIZE

Table of contents

1. Purpose
2. Normalization forms
3. Usage patterns
4. Implementation details for comparisons
5. Edge cases and performance
6. Reference signatures
7. Digest and retrieval metadata
8. Attribution

1. Purpose
String.prototype.normalize() returns a Unicode-normalized string using one of four normalization forms to allow canonical equivalence comparisons.

2. Normalization forms
- NFC: Canonical Composition — composes characters where possible (recommended default for comparisons).
- NFD: Canonical Decomposition — decomposes combined characters into base + combining marks.
- NFKC: Compatibility Composition — like NFC but applies compatibility mappings (may change character semantics).
- NFKD: Compatibility Decomposition — like NFD with compatibility mappings.

3. Usage patterns
- Compare Unicode strings by normalizing both sides to the same form, typically NFC: a.normalize('NFC') === b.normalize('NFC').
- Accept optional form parameter: s.normalize() uses 'NFC' by default.

4. Implementation details for comparisons
- Use normalize before code-point iteration when input may contain composed vs decomposed sequences.
- Normalization affects length and code point sequences; always normalize before index-based positions or hashing.

5. Edge cases and performance
- Normalization is relatively expensive; cache normalized results when comparing repeatedly.
- Be careful: normalization alters string shape; tests relying on string length in code units should be avoided when using normalized strings.

6. Reference signatures
- String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') -> string

7. Digest and retrieval metadata
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieved: 2026-03-21
- Bytes downloaded from MDN page: 171989 bytes

8. Attribution
Condensed from MDN Web Docs: String.prototype.normalize() - JavaScript (MDN).