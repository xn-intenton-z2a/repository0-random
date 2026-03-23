# BASE85

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Implement Ascii85-compatible base85 encoding and decoding. Default library behaviour is deterministic: no Adobe markers, do not emit 'z' shorthand unless explicitly requested.

Behavior
- Accepts and returns Uint8Array/string.
- Default options: adobeMarkers = false, allowZ = false.
- When enabled, allowZ=true permits interpreting and emitting the 'z' shorthand for 4-byte groups of zeros.

API
- Registered name: "base85"
- Exposed helpers: encodeAscii85(data: Uint8Array, options?) -> string; decodeAscii85(text: string, options?) -> Uint8Array

Numeric properties
- charsetSize: 85
- bitsPerChar: ≈ 6.4094 (compute in code with >=4 fractional digits)
- Expected encoded length for a 16-byte UUID: 20 (default options)

Tests
- Round-trip tests across random and edge-case buffers including partial final blocks.
- When allowZ is enabled, confirm 'z' shorthand is accepted by decode and optionally emitted by encode when the group rule applies.
- Verify known UUID encoding length is 20 in default mode.

Acceptance criteria (testable)
- encodeAscii85 and decodeAscii85 are exported and callable.
- Round-trip tests including partial-block cases pass.
- When testing default options (no markers, no z), encoding a canonical 16-byte UUID yields a 20-character string.
- listEncodings() includes an entry { name: 'base85', charsetSize: 85, bitsPerChar: closeTo(6.4094, 1e-4) }.
