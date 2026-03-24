Title: REGULAR_EXPRESSIONS

Source: MDN — Regular expressions - JavaScript
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src1.html)

Table of contents:
- Overview and purpose
- Special characters and metacharacters
- Escaping rules and safe-escape pattern
- Flags and effects on matching
- Character classes and quantifiers
- Best practices for building dynamic regex

Normalised extract (technical points):
Overview and purpose
Regular expressions are patterns used to match character combinations in strings. In JavaScript they are implemented by the RegExp object and via literal syntax /pattern/flags.

Special characters and metacharacters
List of primary metacharacters that must be escaped to be used literally: ^ $ \ . * + ? ( ) [ ] { } | /

Escaping rules and safe-escape pattern
To safely escape arbitrary input for inclusion in a RegExp literal or constructor, replace the following characters with a backslash-prefixed version. Canonical escape pattern (ECMAScript-compatible):
- Use the following set to find chars to escape: [.*+?^${}()|[\]\\]
- Replacement pattern: prepend backslash, e.g. s.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")

Flags and effects on matching
- i: case-insensitive matching
- g: global search (find all matches)
- m: multiline; ^ and $ match start/end of line
- s: dotAll; . matches newline
- u: full Unicode; enables code point escapes and proper surrogate handling
- y: sticky; matches only at lastIndex

Character classes and quantifiers
- Character classes: [abc], [^abc], ranges [a-z]
- Predefined classes: \d, \D, \w, \W, \s, \S
- Quantifiers: *, +, ?, {n}, {n,}, {n,m}

Best practices for building dynamic regex
- Always escape user input before injecting into new RegExp.
- Prefer RegExp constructor when building patterns dynamically: new RegExp(escapedInput, flags)
- Use the 'u' flag for Unicode-aware operations; combine with code-point-aware operations when needed.
- For performance, avoid catastrophic backtracking by using atomic grouping alternatives or limiting quantifiers.

Supplementary details (specification-level):
- ECMAScript RegExp semantics: constructor RegExp(pattern, flags) accepts string pattern (escaped) and flags string.
- When using RegExp with the 'u' flag, \\u{...} code point escapes are supported and surrogate pairs are treated as single characters.

Reference details (implementation-ready):
- Escape function signature:
  - Input: string value
  - Output: string with regex-special chars escaped
  - Canonical implementation: value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")
- Use cases: escaping before new RegExp(escaped, flags);
- Example: const safe = str.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"); const re = new RegExp(safe, 'i');

Detailed digest:
- Extracted canonical escape character set and replacement technique from MDN's Regular expressions guide (retrieved 2026-03-24). HTML saved to /tmp/src1.html. Use the escape regex above for escapeRegex implementation.

Attribution:
MDN Web Docs — Regular expressions - JavaScript. URL as above. Data fetched on 2026-03-24. (HTML blob size saved to /tmp/src1.html.)
