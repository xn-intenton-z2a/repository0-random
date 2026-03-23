BASE64

Table of contents
- Alphabet and variants
- Bits-per-character and length formula
- Encoding algorithm (step-by-step)
- Decoding algorithm (step-by-step)
- Padding and the base64url variant (no-padding)
- Implementation details (JavaScript, Uint8Array)
- Reference API signatures (recommended)
- Digest and attribution

Normalised extract (technical details)
Alphabet (standard): ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
Alphabet (URL-safe): ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_
Bits per character: 6.0 (log2(64) = 6)

Length formulas
- Input length L bytes -> bits = L * 8
- bitsPerChar = 6
- Encoded length with standard padding: 4 * ceil(L / 3)
- Encoded length without padding: ceil((L * 8) / 6)
- Example: L = 16 bytes (UUID) -> bits = 128 -> ceil(128 / 6) = 22 characters (no padding)

Encoding algorithm (detailed technical steps)
1. Accept input as a Uint8Array of bytes, length L.
2. Partition the input into 24-bit blocks (3 bytes). For each full 24-bit block produce four 6-bit values.
3. For each 6-bit value (value between 0 and 63) map using the alphabet string at that index to a single output character.
4. For a final partial block with 1 or 2 bytes, pad the missing bytes with zero bits to create a 24-bit block, compute the corresponding 6-bit values and map them to characters.
5. If padding is enabled (standard base64) append '=' characters so the final output length is a multiple of 4: 1 byte remainder -> append '==', 2 byte remainder -> append '='.
6. If padding is disabled (common for base64url / JWT), omit '=' and emit exactly ceil((L*8)/6) characters. Decoders must accept non-multiple-of-4 lengths and reconstruct missing zero bits.

Decoding algorithm (detailed technical steps)
1. Accept input string; trim whitespace, detect variant by presence of '-' or '_' to indicate URL-safe.
2. If URL-safe, map '-' -> '+' and '_' -> '/' for canonical mapping, or use URL-safe alphabet directly.
3. Remove trailing '=' padding characters if present; compute the number of 6-bit values implied by the input length.
4. For each character, map to its 6-bit value using a reverse lookup table. Accumulate bits and extract bytes (8-bit) from the accumulated stream in 8-bit chunks.
5. For inputs with omitted padding, handle the final partial byte(s) by reconstructing bits padded with zeros; ensure the decoded byte length equals floor((inputLength * 6) / 8).
6. Return a Uint8Array containing the exact original bytes when encoding used the correct variant and no errors occurred.

Round-trip property and edge cases
- Correct implementations satisfy: decode(encode(input)) == input for all Uint8Array inputs, including empty buffer, all-zero bytes, all-0xFF bytes, single-byte inputs.
- Empty input -> empty output string; decode(empty string) -> empty Uint8Array.
- Implementations must treat invalid characters as errors (TypeError or custom DecodeError) rather than silently skipping.

Supplementary details and implementation notes
- Use a constant alphabet string for mapping; build a 256-entry reverse lookup table where invalid characters are flagged.
- Use bit-accumulation using integer arithmetic to avoid floating point errors: push and shift bits into a 32-bit accumulator when processing groups.
- For performance, precompute tables and avoid per-byte string concatenation in tight loops; use arrays and join at the end or use an output buffer of known length.
- When decoding unpadded input, compute required padding amount as (4 - (inputLength % 4)) % 4, if a canonical padded decoder is easier to implement, add '='s before decoding.

Reference details (API signatures and behaviour)
Exports (recommended named exports from src/lib/main.js):
- encode(encodingName: string, input: Uint8Array): string
  - encodingName: one of registered encoding names ("base64", "base62", ...)
  - input: Uint8Array
  - returns: encoded string
  - throws: TypeError if input is not Uint8Array, Error if encodingName is unknown

- decode(encodingName: string, input: string): Uint8Array
  - encodingName: registered name
  - input: encoded string
  - returns: Uint8Array with original bytes
  - throws: TypeError on bad inputs, Error on invalid characters or unknown encoding

- createEncoding(name: string, charset: string): { name, charset, charsetSize, bitsPerChar, encode, decode }
  - name: string identifier
  - charset: string of unique characters (length >= 2)
  - returns: object with encode/decode functions operating on Uint8Array/string

- listEncodings(): Array<{ name: string, bitsPerChar: number, charsetSize: number }>
  - returns registered encodings and metadata for comparison

Base64-specific helpers (recommended signatures)
- encodeBase64(input: Uint8Array, options?: { padding?: boolean, urlSafe?: boolean }): string
  - padding default: true
  - urlSafe default: false
- decodeBase64(input: string, options?: { urlSafe?: boolean }): Uint8Array
  - accepts both padded and unpadded inputs; urlSafe controls alphabet interpretation

Practical note for UUID shorthand
- To encode a UUID string: strip dashes from canonical hex (32 hex chars), parse into 16-byte Uint8Array, then call encode('base64', bytes) or encodeBase64(bytes, {padding:false}). For the standard 16-byte UUID, base64 without padding yields 22 characters.

Digest (sources used and retrieval info)
- MDN Base64 — https://developer.mozilla.org/en-US/docs/Glossary/Base64 (retrieved 2026-03-23, 189810 bytes)
- Wikipedia Base64 — https://en.wikipedia.org/wiki/Base64 (retrieved 2026-03-23, 186365 bytes)
- RFC 4648 — https://www.rfc-editor.org/rfc/rfc4648.txt (canonical spec; listed in SOURCES.md)

Attribution
- Core algorithm and padding rules follow RFC 4648; practical usage notes and examples referenced from MDN and Wikipedia pages above.
