JSON_POINTER

NORMALISED EXTRACT

Table of contents
1. Pointer syntax
2. Decode rules and escape sequences
3. Resolution algorithm (step-by-step)
4. Edge cases and error conditions

Pointer syntax
- A JSON Pointer is either the empty string "" (which references the whole document) or a sequence of zero or more reference tokens each prefixed by a "/" character.
- Example pointers: "" (root), "/foo", "/foo/0", "/a~1b".

Decode rules and escape sequences (RFC 6901)
- Reference tokens are encoded such that the two-character sequences ~0 and ~1 represent the characters ~ and / respectively.
- Decoding procedure for each token: replace the substring "~1" with "/", then replace "~0" with "~".
- Tokens are taken literally otherwise; array indices are decimal base-10 strings (e.g. "0", "42").

Resolution algorithm (implementation steps)
1. If pointer == "" return the root document.
2. Otherwise split pointer on "/"; ignore the leading empty segment.
3. For each reference token in order:
   a. Decode the token (apply ~1->/ then ~0->~).
   b. If the current value is an object, use the decoded token as a property name; if the property does not exist, throw PointerNotFound.
   c. If the current value is an array, interpret the decoded token as a non-negative integer index; if not a valid index or out of bounds, throw PointerNotFound.
   d. Set current value to the selected child and continue.
4. Return the final current value.

Edge cases and error conditions
- A token that decodes to the empty string ("") is a valid property name and should be looked up as such.
- The pointer "/" refers to the property named "" on the root object.
- Implementations must not percent-decode the fragment — JSON Pointer uses ~ escapes only.

SUPPLEMENTARY DETAILS
- Performance: token split + iterative lookup is O(depth). When used repeatedly, caching path-to-node mappings speeds repeated resolutions.
- Robustness: callers should detect and handle PointerNotFound and treat it as a schema resolution error during $ref expansion.
- When resolving against schemas, always resolve pointers against the canonical root document (after applying any base URI logic if applicable).

REFERENCE DETAILS (API)
- resolvePointer(document, pointer) -> value
  - Parameters: document (Object|Array), pointer (string following RFC6901 grammar).
  - Returns: the value at the pointer if present.
  - Throws: PointerNotFoundError when the pointer cannot be resolved; PointerSyntaxError for invalid pointer syntax.
- decodeReferenceToken(token) -> string
  - Parameters: token (string as it appears between slashes).
  - Returns: decoded token: apply replacements in order: ~1 -> /, then ~0 -> ~.

DETAILED DIGEST
- Source: RFC 6901 "JSON Pointer" (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data obtained during crawl: HTML page rendering of RFC 6901 (approx 71.6 KB)
- Extract: exact pointer grammar, escape sequences (~0/~1), evaluation semantics and examples used above.

ATTRIBUTION
- Source: RFC 6901 - JavaScript Object Notation (JSON) Pointer
- URL: https://datatracker.ietf.org/doc/html/rfc6901
- Data size (crawl result): ~71.6 KB
