STRING_NORMALIZE

TABLE OF CONTENTS
1. API signature and normalization forms
2. Use cases: canonical equivalence, comparison, diacritic removal
3. Patterns for removing combining marks
4. Implementation notes
5. Reference details
6. Detailed digest
7. Attribution

NORMALISED EXTRACT:
API: String.prototype.normalize([form]) -> string
Accepted forms: 'NFC' (default), 'NFD', 'NFKC', 'NFKD'.
- NFC: Canonical composition — composed characters where possible.
- NFD: Canonical decomposition — decomposed base + combining marks.
- NFKC / NFKD: Compatibility composition/decomposition (also applies compatibility mappings).
Common pattern to remove diacritics: normalized = str.normalize('NFKD'); stripped = normalized.replace(/\p{M}/gu, ''); (alternatively use range-based regex /[\u0300-\u036f]/g when Unicode property escapes are not supported).

IMPLEMENTATION NOTES:
- Use normalize() before operations that rely on comparing or transforming Unicode strings (slug generation, case-insensitive matching, deduplication).
- Choice of form: use 'NFKD' to separate compatibility characters and combining marks for easier removal; then remove combining marks.
- Edge cases: Some environments may not support Unicode property escapes; fall back to explicit combining-mark ranges.

REFERENCE DETAILS:
- Signature: String.prototype.normalize(form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD') -> string
- Diacritic removal recipe:
  1) s = String(input || '')
  2) s = s.normalize('NFKD')
  3) s = s.replace(/\p{M}/gu, '')  OR s.replace(/[\u0300-\u036f]/g, '')

DETAILED DIGEST (retrieved 2026-03-23):
- MDN guidance on normalization forms, examples, and practical recipes for removing diacritics were extracted and condensed. Bytes retrieved during crawl: 168.0 KB.

ATTRIBUTION:
MDN Web Docs — String.prototype.normalize
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

