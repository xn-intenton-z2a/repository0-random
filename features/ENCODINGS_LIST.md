# ENCODINGS_LIST

Summary
Implement listEncodings() which returns an array of encoding metadata objects for all built-in and registered encodings.

Motivation
Consumers need a programmatic way to discover which encodings exist and compare their density and character sets.

Behavior
- listEncodings() -> Array of objects with fields:
  - name: string
  - charsetSize: integer
  - bitsPerChar: number (log2(charsetSize) with at least 4 fractional digits)
  - sampleLengthFor16Bytes: integer (expected encoded length for a 16-byte buffer, computed as ceil(128 / bitsPerChar))
  - urlSafe: boolean (whether charset is safe for URLs without escaping)
- Built-in encodings that must appear: base62, base85, printable-dense (or equivalent), plus any registered custom encodings.

Tests
- listEncodings returns all known encodings and correct numeric metadata.
- sampleLengthFor16Bytes matches actual encoding length for a 16-byte buffer for each encoding.

Acceptance criteria
- listEncodings is implemented and exported.
- listEncodings includes the built-in encodings with correct charsetSize and bitsPerChar.
- Unit tests verifying metadata and sample lengths pass.
