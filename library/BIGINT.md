BIGINT

Normalised extract:
- BigInt is the JavaScript primitive for arbitrary-precision integers. It enables treating an arbitrary-length sequence of bytes as a single integer using BigInt arithmetic and bitwise operators.
- Core conversion pattern for binary ↔ integer: build a BigInt from bytes using big-endian accumulation then perform base-N conversion using BigInt division and remainder; reverse to decode.
- JSON serialization does not support BigInt by default (JSON.stringify throws TypeError).

Table of contents:
1. Overview
2. Creating BigInts
3. Conversion and interop rules
4. Arithmetic & bitwise operations
5. Typed arrays and DataView
6. Algorithms: Uint8Array ↔ BigInt
7. Implementation pattern for arbitrary-base encoding (using BigInt)
8. Supplementary details and best practices
9. Reference details (API signatures)
10. Detailed digest and attribution

1. Overview
BigInt is a primitive representing integers of arbitrary magnitude. Use BigInt for implementing arbitrary-base encoders/decoders that treat an input Uint8Array as a single large integer to perform repeated division by the target base.

2. Creating BigInts
- Literal form: a numeric literal with trailing n denotes a BigInt (e.g., 123n).
- Global constructor: BigInt(value) converts a number, string, or other value to a bigint.
- BigInt.asIntN(bits, bigint) and BigInt.asUintN(bits, bigint) perform masking to N-bit signed/unsigned results.

3. Conversion and interop rules
- typeof returns "bigint".
- Mixing BigInt and Number in numeric operations throws TypeError; explicit conversion is required.
- JSON.stringify on a BigInt throws TypeError; use string conversion or custom replacer.
- To produce deterministic binary output, record and fix endianness (recommend big-endian for cross-platform consistency).

4. Arithmetic & bitwise operations
- Supported operators: +, -, *, /, %, **, unary -, bitwise &, |, ^, <<, >>.
- Division truncates toward zero and returns a bigint.
- Exponentiation with BigInt uses BigInt operands; results are bigint.

5. Typed arrays and DataView
- Typed arrays storing BigInt values: BigInt64Array and BigUint64Array; constructors accept length, arrayLike, or ArrayBuffer.
- DataView provides getBigUint64(byteOffset, littleEndian?) -> bigint and setBigUint64(byteOffset, value, littleEndian?) -> void for 64-bit chunks.

6. Algorithms: Uint8Array ↔ BigInt
- To convert a Uint8Array (big-endian) to BigInt:
  - Let result = 0n.
  - For each byte b in input: result = (result << 8n) | BigInt(b).
  - Return result.
- To convert a BigInt to a minimal Uint8Array (big-endian):
  - If value == 0n return Uint8Array([0]) or an empty buffer per caller expectation.
  - Compute byteLength = Math.ceil(bitLength(value) / 8).
  - Allocate Uint8Array(byteLength).
  - For i from byteLength-1 down to 0: out[i] = Number(value & 0xffn); value >>= 8n.
  - Return out.
- bitLength can be computed as (value === 0n ? 0 : value.toString(2).length).

7. Implementation pattern for arbitrary-base encoding (using BigInt)
- encode(data: Uint8Array, alphabet: string): string
  - Convert data -> BigInt using algorithm above (big-endian).
  - base = BigInt(alphabet.length).
  - If value == 0n and data.length > 0 return alphabet[0] or canonical representation for zero.
  - While value > 0n: digit = Number(value % base); push character alphabet[digit]; value = value / base.
  - Reverse digit sequence for final encoded string.
- decode(encoded: string, alphabet: string): Uint8Array
  - base = BigInt(alphabet.length).
  - value = 0n.
  - For each character c in encoded: index = alphabet.indexOf(c) (must be non-negative) ; value = value * base + BigInt(index).
  - Convert value to Uint8Array using BigInt -> bytes algorithm; for fixed-length targets (UUID) pad/truncate to the expected byte length (16 bytes).
- Note: For very large inputs, BigInt operations will allocate large integers; streaming or chunked algorithms are an alternative but increase implementation complexity.

8. Supplementary details and best practices
- Use BigInt-based approach when alphabet size is not a power of two; for power-of-two alphabets (e.g., base64, base32) a bit-buffer method (consume bits directly from a bit cursor) is faster and avoids BigInt overhead.
- Always document endianness. Use big-endian for cross-platform reproducibility unless storage spec requires little-endian.
- For UUID shorthand (fixed 16-byte input), compute fixed output length by repeatedly dividing a 128-bit BigInt by the base until the produced digits reach the expected count; or pad encoded output to a canonical width.
- Avoid JSON serialization of BigInt without converters; use toString() where textual interchange is required.

9. Reference details (API signatures)
- BigInt(value: number|string|bigint|object) -> bigint
- BigInt.asIntN(bits: number, bigint: bigint) -> bigint
- BigInt.asUintN(bits: number, bigint: bigint) -> bigint
- BigInt.prototype.toString([radix?: number]) -> string
- BigInt.prototype.valueOf() -> bigint
- BigInt64Array(length|arrayLike|buffer) -> BigInt64Array instance
- BigUint64Array(length|arrayLike|buffer) -> BigUint64Array instance
- DataView.prototype.getBigUint64(byteOffset: number, littleEndian?: boolean) -> bigint
- DataView.prototype.setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean) -> void

Implementation-specific function signatures useful for this library (recommended, exact types):
- encodeWithAlphabet(data: Uint8Array, alphabet: string): string
  - data: Uint8Array
  - alphabet: string (no duplicate chars)
  - returns: string (encoded)
- decodeToBytes(encoded: string, alphabet: string): Uint8Array
  - encoded: string
  - alphabet: string
  - returns: Uint8Array

10. Detailed digest and attribution
- Source: MDN BigInt — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
- Retrieval date: 2026-03-23
- Download size: 171,543 bytes
- Notes: MDN page documents BigInt constructors, methods, typed arrays and DataView get/setBigUint64. Extracted the API signatures above and algorithmic guidance for building BigInt from bytes and converting back to bytes.

Attribution: content extracted from MDN BigInt documentation (see URL above); data size recorded for provenance.