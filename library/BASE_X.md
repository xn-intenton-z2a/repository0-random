base-x (arbitrary alphabets; implementation notes and API)

TABLE OF CONTENTS
- Purpose and scope
- Leading-zero compression behaviour
- Common alphabets (exact strings used in practice)
- Encoding algorithm (number-theoretic long division style)
- Decoding algorithm
- API surface (how to expose custom alphabets in JS)
- Supplementary implementation notes and performance considerations
- Digest, retrieval date and attribution

NORMALISED EXTRACT
Purpose:
- base-x provides fast base encoding/decoding for arbitrary alphabets and is commonly used to implement base58, base62, and other custom encodings. It uses big-number-like long division on octet arrays and applies a leader-character scheme to preserve leading-zero bytes.

Leading-zero compression (behavior):
- For each leading zero byte in the input, base-x emits one leading character equal to the first character in the alphabet (the "leader"). The core numeric representation encodes the non-leading-zero portion as a large integer in the target base.

Common alphabets (exact examples from base-x README):
- Base62 alphabet: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
- Base64 alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
- Base58 (Bitcoin) alphabet: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz

Encoding algorithm (implementation pattern used by base-x):
1. Interpret the input byte array as a big-endian big integer N (most-significant byte first).
2. Repeatedly divide N by the target base (alphabet length) and record remainders; map each remainder to a character from the alphabet. The produced sequence is the base-N representation in little-endian order, reverse it to get the final string for the numeric portion.
3. Prefix the result with as many leader characters as there are leading zero bytes in the input.
4. The algorithm avoids padding and is not RFC3548-compliant for base 64/32/16 variants.

Decoding algorithm:
- Reverse the process: for each character map to its numeric value, multiply accumulator by base and add value, then expand the big-integer to a byte array; re-insert leading zero bytes equal to leading leader characters.

API surface (recommended library form for this project):
- createEncodingFromCharset(name: string, charset: string): Encoding
  - Encoding object: { name, charset, bitsPerChar: number, charsetSize: number, encode(data: Uint8Array): string, decode(s: string): Uint8Array }
- Example usage pattern (conceptual, not as code block): instantiate base-x with chosen charset; call encode(Uint8Array) -> string; decode(string) -> Uint8Array.

SUPPLEMENTARY DETAILS & PERFORMANCE
- base-x is efficient for arbitrary alphabets and small to medium inputs; it uses division on arrays rather than bit-shifts, which maps naturally to arbitrary target bases, including non-power-of-two bases like 58 or 62.
- Warning from the README: base-x is NOT RFC3548 compliant and should not be used as a standards-compliant base16/base32/base64 implementation.

DETAILED DIGEST (excerpt)
- The base-x README documents the above alphabets and demonstrates usage examples with Base58 and Base62. It shows that decode returns Uint8Array and encode accepts Uint8Array. Retrieval date: 2026-03-22. Retrieved content: (raw README) ~4 KB.

ATTRIBUTION
- Source: cryptoccoins/base-x README (raw): https://raw.githubusercontent.com/cryptocoinjs/base-x/master/README.md. Retrieved 2026-03-22 (~4 KB).
