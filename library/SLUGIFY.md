SLUGIFY

TABLE OF CONTENTS
1. Goals and desired output
2. Recommended algorithm (exact steps)
3. Options and their meanings
4. Implementation notes and Unicode handling
5. Reference details
6. Detailed digest
7. Attribution

NORMALISED EXTRACT:
Goal: produce a URL-friendly slug from arbitrary input: lowercased (optionally), ASCII-friendly, words separated by single '-' characters, no leading/trailing separators, non-alphanumeric removed or transliterated.

RECOMMENDED ALGORITHM (step-by-step):
1) Coerce input: s = String(input || '')
2) Normalize Unicode: s = s.normalize('NFKD') to decompose compatibility and diacritic marks
3) Remove combining marks: s = s.replace(/\p{M}/gu, '') OR s.replace(/[\u0300-\u036f]/g, '')
4) Transliterate common accented characters to ASCII equivalents using a small char map (e.g., 'ä' -> 'a', 'ß' -> 'ss'); for full coverage consider a charMap table.
5) Convert to lower case if requested (default yes)
6) Replace runs of non-alphanumeric characters with the replacement character (default '-')
7) Collapse multiple replacement characters into single instances
8) Trim leading/trailing replacement characters
9) Optionally remove characters matching user-provided remove regex
Result: slug string, empty string for null/undefined input.

OPTIONS (from canonical implementations):
- replacement: string | character used to separate words (default '-')
- remove: RegExp | undefined — characters to remove after transliteration
- lower: boolean (default true) — convert to lower-case
- strict: boolean (default false) — strip special characters except replacement
- locale: string (affects locale-specific transliterations)
- trim: boolean (default true)

IMPLEMENTATION NOTES:
- Use a charMap for transliteration for best results; keep locale-specific overrides when required.
- Normalizing to NFKD and stripping combining marks handles many diacritics without a huge charMap.
- Ensure output is limited to ASCII letters, digits and the replacement character for maximum compatibility.

REFERENCE DETAILS:
- Suggested helper: slugify(input: string | null | undefined, options?: {replacement?: string, remove?: RegExp, lower?: boolean, strict?: boolean, locale?: string, trim?: boolean}) -> string
- Default options: {replacement: '-', remove: undefined, lower: true, strict: false, trim: true}

DETAILED DIGEST (retrieved 2026-03-23):
- Algorithm, option names and recommended behaviours were taken from simov/slugify README and canonical slug-generation patterns. Bytes retrieved during crawl: fetched README content from slugify project on GitHub (raw). Retrieval date: 2026-03-23.

ATTRIBUTION:
simov/slugify — README and charMap
URL: https://github.com/simov/slugify

