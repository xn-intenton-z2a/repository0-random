Title: STRING_NORMALIZE

Source: MDN — String.prototype.normalize()
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src3.html)

Table of contents:
- Purpose of normalization
- Forms: NFC, NFD, NFKC, NFKD
- When to normalize (search, comparison, slugify)
- Implementation notes and JS API

Normalised extract (technical points):
Purpose of normalization
Unicode normalization transforms strings into a canonical composed or decomposed form so that equivalent sequences compare equal. Crucial when operating on Unicode combining marks.

Forms
- NFC: Normalization Form Canonical Composition — composed form; preferred for storage and display.
- NFD: Canonical Decomposition — decomposed form (base char + combining marks).
- NFKC / NFKD: Compatibility forms; perform compatibility decomposition/composition which may change character semantics (e.g., superscripts to normal digits).

When to normalize
- Normalize before slugifying, lowercasing, or comparing Unicode strings to avoid mismatches from visually identical but binary-different sequences.
- For accent stripping, normalize to NFD then remove combining diacritics (Unicode class \p{M}) and recombine (optional) to NFC.

Implementation notes and JS API
- API: str.normalize([form]) where form is one of 'NFC','NFD','NFKC','NFKD'; default 'NFC'.
- To strip diacritics: str.normalize('NFD').replace(/\p{M}/gu, '')
- Use the 'u' flag in regex when matching Unicode properties and code points.

Reference details (implementation-ready):
- Function signatures:
  - stripDiacritics(input: string): string {
      if (!input) return '';
      return input.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
    }
- Use-case: slugify should call normalize('NFD'), strip diacritics, toLowerCase(), then replace non-alphanum with hyphens.

Detailed digest:
- Extracted normalization forms and canonical implementation snippet for diacritic stripping from MDN (retrieved 2026-03-24). HTML saved to /tmp/src3.html.

Attribution:
MDN Web Docs — String.prototype.normalize(). URL as above. Data fetched on 2026-03-24.
