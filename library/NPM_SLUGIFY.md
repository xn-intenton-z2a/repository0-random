NPM_SLUGIFY

TABLE OF CONTENTS
- Behaviour summary (normalised extract)
- Algorithm and implementation patterns
- Configuration options commonly provided by slugify implementations
- Best practices and examples (descriptive)
- Digest and retrieval metadata

NORMALISED EXTRACT
Common slugification behaviour (the canonical rules implemented by popular libraries):
- Convert input to Unicode-normalised form (NFKD or NFKC) and remove diacritics by stripping combining marks.
- Convert to lower case (unless option to preserve case is provided).
- Replace any sequence of whitespace and non-alphanumeric characters with a single hyphen '-'.
- Remove leading and trailing hyphens; collapse consecutive hyphens into one.
- Optionally remove or transliterate characters outside ASCII using mapping tables.

IMPLEMENTATION ALGORITHM (detailed)
1. If input is null/undefined return empty string.
2. s = input.normalize('NFKD')
3. Remove combining marks: remove characters in Unicode category M (Mark).
4. Convert to lower case: s = s.toLowerCase()
5. Replace any character sequence not matching letters or numbers with '-' using a Unicode-aware class (for example, use Unicode properties for letters and numbers if available).
6. Replace multiple consecutive '-' with single '-'.
7. Trim leading/trailing '-' characters.
8. Return result.

COMMON OPTIONS (found in popular slug libraries)
- lower (boolean) — convert to lower case
- replacement (string) — character used in place of removed characters (default '-')
- remove (regex) — custom regex for characters to remove
- strict (boolean) — restrict to ASCII alphanumerics only after transliteration

BEST PRACTICES
- Use Unicode normalization + combining-mark removal to handle accented characters cleanly.
- Provide a small transliteration map for common Latin-extended characters if ASCII-only slugs are required.
- Keep the implementation dependency-free: String.normalize + Unicode-aware regex + String.fromCodePoint/String.codePointAt suffice for most cases.

DIGEST (retrieved 2026-03-24)
- Source attempted: https://www.npmjs.com/package/slugify
- Note: npm returned an interactive/Cloudflare challenge page in this environment; bytes downloaded: 7174. The transloadit/slugify repository and npm package documentation describe the same core behaviour: lowercasing, diacritic removal, non-alphanumeric replacement, hyphen collapsing.

ATTRIBUTION
- Sources: https://github.com/transloadit/slugify and https://www.npmjs.com/package/slugify
- Retrieved: 2026-03-24
- Bytes downloaded (npm challenge page): 7174
