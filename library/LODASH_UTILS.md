LODASH_UTILS

TABLE OF CONTENTS
1. camelCase — behaviour and algorithm
2. kebabCase — behaviour and algorithm
3. truncate — behaviour and options
4. Implementation notes for safe re-implementation
5. Reference details
6. Detailed digest
7. Attribution

NORMALISED EXTRACT:
camelCase([string='']) -> string
- Splits the input into words (separators: whitespace, punctuation, underscores, hyphens and transitions from lower to upper), lowercases all characters, then concatenates words with the first word lowercased and each subsequent word capitalised (first code point uppercased).

kebabCase([string='']) -> string
- Splits the input into words using the same word-definition logic and joins them with '-' characters, all lowercased. Repeated separators collapse to a single '-'.

truncate([string=''], [options]) -> string
Options:
- length (default 30): maximum string length including omission
- omission (default '...'): string used to indicate truncation
- separator (optional): string or RegExp; when provided, truncate will prefer to break at the last occurrence of separator before the cut point to avoid breaking words
Behaviour:
- If input length <= length return input. Otherwise compute available = length - omission.length, then find a split point at or before available; if separator provided and matches, prefer that split; final result = input.slice(0, split) + omission.

IMPLEMENTATION NOTES:
- Word-splitting should treat Unicode letters as word characters; use Unicode-aware tokenisation where possible.
- For truncate with RegExp separator, search backwards for a match to prevent mid-word truncation.
- Coerce inputs: String(input || '').

REFERENCE DETAILS (method signatures):
- camelCase(input: string | null | undefined) -> string
- kebabCase(input: string | null | undefined) -> string
- truncate(input: string | null | undefined, options?: {length?: number, omission?: string, separator?: string | RegExp}) -> string

DETAILED DIGEST (retrieved 2026-03-23):
- Extracted behaviour and option semantics for common string utilities from Lodash documentation. Bytes retrieved during crawl: 537.0 KB.

ATTRIBUTION:
Lodash documentation (4.17.15)
URL: https://lodash.com/docs/4.17.15

