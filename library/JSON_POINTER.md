NORMALISED EXTRACT

Table of contents:
- Pointer syntax and forms
- Percent-decoding rules for URI fragments
- Token unescape rules (~0, ~1)
- Resolution algorithm (step-by-step)
- Error cases and edge behavior

Pointer syntax and forms
A JSON Pointer is either the empty string (references the whole document) or a sequence of reference tokens separated by '/' where the pointer begins with '/'. When used as a URI fragment (after '#') the fragment must be percent-decoded before applying the JSON Pointer unescape rules.

Percent-decoding and token unescape
- If the pointer appears in a URI fragment (starts with '#'), remove the leading '#' and percent-decode the remaining characters using UTF-8 percent-decoding rules.
- For each reference token, unescape in this order: replace the sequence '~1' with '/', then replace '~0' with '~'. No other '~' escapes are defined.

Resolution algorithm (implementation-ready):
1. If pointer starts with '#', pointerText = percentDecode(pointer.substring(1)); else pointerText = pointer.
2. If pointerText is an empty string, resolution result is the root document node.
3. Split pointerText on '/' into an array of tokens. If pointerText started with '/', the first token after split is empty; ignore that leading empty token.
4. For each token in order, perform the tilde-unescape step (~1 -> /, ~0 -> ~).
5. Let current = root. For each token t:
   - If current is an object: if t is a key in current, set current = current[t], else fail with RefNotFound.
   - If current is an array: if t is a base-10 non-negative integer string and index in range, set current = current[Number(t)], else fail with RefNotFound.
6. Return current.

Error cases and notes
- Tokens may be empty strings to reference properties with empty names.
- JSON Pointer does not define '-' token semantics; '-' is used by JSON Patch but not JSON Pointer.
- Implementations must error on invalid percent-encodings encountered when decoding a fragment.

REFERENCE DETAILS
- Exact unescape operation: token = token.replace('~1', '/').replace('~0', '~') (perform replacements in this order).
- Percent-decode only when pointer is derived from a URI fragment; raw pointer strings should not be percent-decoded.

DETAILED DIGEST
Source: RFC 6901 (JSON Pointer)
Retrieved: 2026-03-27
Bytes obtained: 4772
Extracted: formal pointer grammar, the tilde escape rules, percent-decoding guidance, and object/array traversal semantics required to implement reliable local $ref resolution.

ATTRIBUTION
RFC 6901 (IETF). Data harvested during crawl: 4772 bytes.
