REGEX_ESCAPING

TABLE OF CONTENTS
1. Special characters
2. Recommended escape pattern
3. Implementation notes
4. Edge cases
5. Supplementary details
6. Reference details
7. Detailed digest
8. Attribution

NORMALISED EXTRACT:
Special characters with special meaning in JavaScript regular expressions that must be escaped when used literally: . * + ? ^ $ { } ( ) | [ ] \ - (when inside a character class) and / when using literal delimiters. The canonical escape approach is to match any metacharacter and prefix it with a backslash. Recommended escape pattern (literal RegExp): /[.*+\-?^${}()|[\]\\]/g and replacement string: '\\$&' — this replaces every metacharacter with a backslash followed by itself.

IMPLEMENTATION NOTES:
- Coerce input: input = String(input || '') to handle null/undefined.
- Use String.prototype.replace with the above global pattern to escape user-supplied input before embedding into a RegExp constructor or literal.
- When placing the replacement inside a JS string literal, remember literal escaping rules (the replacement string for replace is '\\$&' in source code to yield a single backslash in the result).
- Complexity: O(n) time and O(n) extra space where n is the input length.

EDGE CASES:
- Building character classes dynamically: '-' is special unless placed at the start or escaped; ']' must be escaped or positioned as the first character after the opening '['.
- This routine only escapes RegExp metacharacters; it does not alter Unicode letters or normalize composed/decomposed forms — normalise first if required.

SUPPLEMENTARY DETAILS:
- When creating a RegExp from user input via new RegExp(escapedInput), ensure you also escape the delimiter semantics appropriate to how you'll use the value (literal vs constructor).
- Use Unicode normalization (String.prototype.normalize) before escaping if you need canonical equivalence across composed/decomposed Unicode sequences.

REFERENCE DETAILS:
- Exact escape pattern recommended: /[.*+\-?^${}()|[\]\\]/g
- Replacement string (literal JS replacement parameter): '\\$&'
- Helper spec:
  Name: escapeRegex
  Signature: escapeRegex(input: string | null | undefined) -> string
  Behaviour: returns the input string with all JS RegExp metacharacters escaped; null/undefined -> ''

DETAILED DIGEST (retrieved 2026-03-23):
- Canonical guidance and the standard character class for escaping user input were taken from MDN Web Docs. Retrieval date: 2026-03-23. Bytes retrieved during crawl: 216.6 KB.

ATTRIBUTION:
MDN Web Docs — Regular expressions (JavaScript): escaping
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping

