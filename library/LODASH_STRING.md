Title: LODASH_STRING

Source: Lodash documentation (string utilities)
URL: https://lodash.com/docs/4.17.15
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src4.html)

Table of contents:
- camelCase and kebabCase semantics
- escapeRegExp behaviour
- Implementation notes and edge cases

Normalised extract (technical points):
camelCase and kebabCase semantics
- camelCase: convert string to lower-case words, remove separators, capitalise each word after the first, and join. Non-alphanumeric separators are treated as word boundaries.
- kebabCase: similar word splitting then join with hyphens and lowercasing.

escapeRegExp behaviour
- Lodash escapeRegExp constructs a pattern that escapes RegExp-special characters.
- Canonical escape character set used: ["^$\\.*+?()[]{}|\\"] (see REGULAR_EXPRESSIONS doc); implementation uses: return string.replace(/[\\^$.*+?()[]{}|\\-]/g, "\\$&");

Implementation notes and edge cases
- Input null/undefined should result in empty string (coerce to ''); ensure functions accept Unicode (use 'u' flag in regex when necessary).
- Word splitting must treat underscores, spaces, punctuation, and case transitions (e.g., "fooBar") as boundaries.

Reference details (implementation-ready):
- camelCase(input: string): string
  - Steps: convert separators to spaces, split on whitespace and punctuation, lowercase first word, capitalize subsequent words (first char toUpper + rest lower), join without separator.
- kebabCase(input: string): string
  - Steps: split as above, lowercase all, join with '-'
- escapeRegex: use canonical escape regex from REGULAR_EXPRESSIONS doc.

Detailed digest:
- Extracts of lodash behaviour for camelCase/kebabCase/escapeRegExp taken from Lodash docs (retrieved 2026-03-24). HTML saved to /tmp/src4.html.

Attribution:
Lodash documentation (v4.17.15). URL as above. Data fetched on 2026-03-24.
