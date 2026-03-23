Title: SHORT_UUID (shortuuid)
Retrieval date: 2026-03-23
Source byte size: 5650

Alphabet: Implementation-specific human-friendly alphabet (commonly: 23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz) — purposefully excludes visually ambiguous characters.
Bits per char: ≈ log2(57) ≈ 5.83 (depends on chosen alphabet length).

Purpose: Compact, URL-safe representation of UUIDs (128-bit) for human-friendly identifiers; typical output length ≈ 22 characters.

Algorithm (concise): Convert UUID (128-bit) to an integer, then encode using chosen alphabet as a big-integer base conversion. To obtain fixed-length results, pad or left-pad the encoding to the expected length for 128-bit inputs.

Behavioral notes: Deterministic mapping from UUID → short string; collision characteristics identical to UUID space; change alphabet only when interoperable systems accept it.

API signatures (recommended):
- encode(uuid: string | Uint8Array): string  — encode UUID to short form
- decode(short: string): string | Uint8Array  — recover canonical UUID (string) or bytes
- createEncoding(alphabet: string): { encode(uuid: string | Uint8Array): string, decode(short: string): string | Uint8Array, alphabet: string }
- listEncodings(): string[]

Attribution: Technical summary of shortuuid approaches (retrieved 2026-03-23).