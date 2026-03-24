Title: SLUGIFY

Source: transloadit/slugify (GitHub)
URL: https://github.com/transloadit/slugify
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src6.html)

Table of contents:
- Purpose and definition
- Steps for slug generation
- Handling Unicode and diacritics
- Allowed characters and separators
- Edge cases

Normalised extract (technical points):
Purpose and definition
Slugify converts text into URL-friendly slugs: lowercased, words separated by hyphens, non-alphanumeric characters removed or mapped where appropriate.

Steps for slug generation (canonical pipeline)
1. Normalize Unicode to NFD to separate base characters and diacritics.
2. Optionally map/transliterate Unicode characters to ASCII equivalents (e.g., æ -> ae) using a mapping table if available; otherwise strip diacritics.
3. Lowercase the string (toLowerCase with locale-insensitive behavior preferred).
4. Replace any non-alphanumeric characters (after diacritic removal) with a separator, typically '-'.
5. Collapse multiple separators to a single separator.
6. Trim leading and trailing separators.

Handling Unicode and diacritics
- Preferred method: normalize('NFD'), remove code points with Unicode category M (marks), then normalize('NFC') if recomposition desired.
- Transliteration tables improve results but are optional; mission allows basic diacritic stripping.

Allowed characters and separators
- Final allowed characters: ASCII letters a-z, digits 0-9, and separator '-'.
- Enforce lowercasing and ensure resulting slug is not empty (fallback to e.g. '') or a default token.

Edge cases
- Null/undefined -> return empty string
- Strings that reduce to empty after stripping -> return empty string or fallback
- Very long strings -> optionally truncate to a sensible length after slugification

Reference details (implementation-ready):
- slugify(input: string): string
  - if (!input) return ''
  - s = input.normalize('NFD').replace(/\p{M}/gu,'')
  - s = s.toLowerCase()
  - s = s.replace(/[^\p{Alnum}]+/gu, '-')  // or after normalization use [^a-z0-9]+ if ascii ensured
  - s = s.replace(/^-+|-+$/g, '')
  - s = s.replace(/-{2,}/g, '-')
  - return s

Detailed digest:
- Pipeline and trimming/collapsing rules derived from slugify README and common implementations (retrieved 2026-03-24). HTML saved to /tmp/src6.html.

Attribution:
transloadit/slugify (GitHub). URL as above. Data fetched on 2026-03-24.
