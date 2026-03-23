Title: BASE62
Retrieval date: 2026-03-23
Source byte size: 66190

Alphabet: 0-9A-Za-z (62 characters by common variant).
Bits per char: log2(62) ≈ 5.954.

Purpose: Compact encoding for binary data where URL-safe or shorter-than-base64 ASCII is desired.

Algorithm (concise): Treat input as a big unsigned integer (big-endian). Repeatedly divide by 62, collecting remainders; output characters from alphabet in reverse. For streaming, accumulate bits into a buffer and emit characters via base conversion by blocks.

Variants: URL-safe permutations and canonicalized alphabets (e.g., RFC-like ordering) exist; some implementations implement padding schemes for fixed-length outputs.

API signatures (recommended):
- encode(input: Uint8Array | string): string
- decode(input: string): Uint8Array
- createEncoding(alphabet: string): { encode(input: Uint8Array | string): string, decode(input: string): Uint8Array, alphabet: string }
- listEncodings(): string[]

Notes: Not a power-of-two base so encode/decode requires multi-precision or bit-buffer logic; careful about endianness and leading-zero preservation.

Attribution: Extracted technical summary (retrieved 2026-03-23).