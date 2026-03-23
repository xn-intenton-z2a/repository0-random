# PRINTABLE_DENSE

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
A high-density encoding that uses printable ASCII characters U+0021..U+007E (excludes space) while removing visually ambiguous characters (0, O, 1, l, I) by default. This maximizes bits/char while keeping output printable and human-safe.

Charset rules
- Base set: all printable ASCII characters from '!' (U+0021) through '~' (U+007E), inclusive (94 characters).
- Exclude by default: space (U+0020) and ambiguous characters [ '0', 'O', '1', 'l', 'I' ] for a final charsetSize = 89.
- Options: allowSpace (boolean), allowAmbiguous (boolean) to relax restrictions when explicitly requested.

Behavior
- Use a general base-x algorithm that preserves leading zeros and supports arbitrary charset sizes.
- Registered name: "printable-dense"
- Exposed helpers: encodePrintableDense(data: Uint8Array) -> string; decodePrintableDense(text: string) -> Uint8Array

Numeric properties
- charsetSize: 89 (default)
- bitsPerChar: ≈ 6.4760 (compute in code, 4+ decimal places)
- Expected encoded length for a 16-byte UUID: 20 (assert length === 20)

Tests
- Round-trip encode/decode for random and edge-case buffers.
- Assert listEncodings reports charsetSize=89 and bitsPerChar close to 6.4760.
- Known 16-byte UUID encodes to a 20-character string under default options.

Acceptance criteria (testable)
- encodePrintableDense and decodePrintableDense are exported and callable.
- listEncodings includes printable-dense with charsetSize === 89 and bitsPerChar within 1e-4 of 6.4760.
- Encoding a canonical 16-byte UUID with default options yields a 20-character string and decodes back correctly.
