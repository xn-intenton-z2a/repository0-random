# BASE85

Status: Merged; verification failing — see issue #72

Test files: tests/unit/encodings.test.js

Summary
Implement Ascii85 (Adobe variant) encoding with optional Z85 compatibility. Provide encodeAscii85 and decodeAscii85 with options to enable or disable Adobe markers and 'z' shorthand.

Motivation
Base85 yields ~6.4105 bits per character and should encode a 16-byte UUID in roughly 20 characters.

Behavior
- Accept and return Uint8Array/string as primary types.
- Support options: adobeMarkers (wrap with <~ and ~>), allowZ (accept/emit 'z' shorthand for full-zero 4-byte groups).
- For deterministic behaviour in the library default: do not emit adobe markers, allowZ = false unless explicitly enabled.

API
- Exposed functions: encodeAscii85(data: Uint8Array, options?) -> string; decodeAscii85(text: string, options?) -> Uint8Array
- Register under name: base85

Tests
- Round-trip tests across edge cases including final partial block behavior.
- Special-case tests: group-of-four zeros expansion and 'z' handling when enabled.
- UUID encoding length must be 20 characters in default mode (no adobe markers, no 'z' markers).

Acceptance criteria
- encodeAscii85 and decodeAscii85 are implemented and exported.
- Round-trip tests including partial-block and 'z' behavior pass.
- Encoding a 16-byte UUID yields 20 characters under default options.
- listEncodings includes base85 with bitsPerChar ≈ 6.4105 and charsetSize = 85.
