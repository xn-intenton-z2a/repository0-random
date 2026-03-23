Crockford Base32 — human-friendly Base32 (ambiguous-character rules)

TABLE OF CONTENTS
- Canonical alphabet (exact)
- Decoding tolerance rules (ambiguous character mappings)
- Check digit and verification (modulo algorithm)
- Implementation notes for human-friendly encodings
- Reference API signatures
- Detailed digest, retrieval date and attribution

NORMALISED EXTRACT
Canonical alphabet (Crockford Base32):
- Encode alphabet (32 symbols): 0 1 2 3 4 5 6 7 8 9 A B C D E F G H J K M N P Q R S T V W X Y Z
- As a single string (for implementation): 0123456789ABCDEFGHJKMNPQRSTVWXYZ

Decoding tolerance (exact rules):
- Accept lower- or upper-case input.
- Map the characters I and L and i and l to digit '1'.
- Map the character O and o to digit '0'.
- Hyphens and spaces are optional and ignored when decoding.

Check digit:
- Crockford defines an optional check symbol computed modulo 37 using an extended symbol set (digits 0..31 plus 5 check-symbol values). See the source for algorithmic details and the five check symbols used for values 32..36 (commonly: *, ~, $, =, U). Implementations must apply the identical check-digit algorithm to be compatible.

IMPLEMENTATION NOTES
- For encoding prefer upper-case output and do not emit excluded letters.
- When decoding, normalize ambiguous characters as specified, then decode using the 5-bit grouping algorithm (pad on the right with zero bits for a final partial group if necessary).

REFERENCE API SIGNATURES
- encodeCrockford32(data: Uint8Array): string
- decodeCrockford32(s: string, options?: { ignoreHyphens?: boolean, acceptAmbiguous?: boolean }): Uint8Array

DETAILED DIGEST (excerpt)
- Douglas Crockford's notes describe the alphabet and the decision to exclude letters I, L, O, U to reduce ambiguity. The page includes exact decode tolerance rules and optional check-digit algorithm. Retrieval date: 2026-03-22. Retrieved bytes: ~428 KB (page includes surrounding site chrome). Source: https://www.crockford.com/base32.html

ATTRIBUTION
- Source: Douglas Crockford — Base32 design notes, retrieved 2026-03-22 (~428 KB). Use the decode-tolerance rules verbatim for robust human-friendly input handling.
