# ENCODINGS_LIST

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Implement listEncodings() which returns metadata for all built-in and registered encodings so consumers can compare density and choose appropriate charsets.

Behavior
- listEncodings() -> Array of encoding metadata objects with fields:
  - name: string
  - charsetSize: integer
  - bitsPerChar: number (log2(charsetSize), provide at least 4 decimal places)
  - sampleLengthFor16Bytes: integer (computed as Math.ceil(128 / bitsPerChar))
  - urlSafe: boolean
- Built-ins expected: base62, base85, printable-dense, plus any registered custom encodings.

Tests
- listEncodings returns an array containing items for each built-in encoding and for encodings registered during tests.
- For each encoding, sampleLengthFor16Bytes equals the actual length measured by encoding a 16-byte buffer.

Acceptance criteria (testable)
- listEncodings is exported and callable.
- Each returned metadata object includes name, charsetSize (integer), bitsPerChar (number with >=4 decimals), sampleLengthFor16Bytes (integer), urlSafe (boolean).
- Tests assert that sampleLengthFor16Bytes === encoded.length for an actual encoded 16-byte buffer for each known encoding.
