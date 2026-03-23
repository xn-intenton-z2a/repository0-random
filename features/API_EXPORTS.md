# API_EXPORTS

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Ensure the library exposes a consistent, named-export public API from src/lib/main.js so tests and examples can import specific functions without relying on a default export.

Motivation
Named exports make the library easier to test, enable tree-shaking, and reduce consumer friction.

Required named exports
- encode(encodingName: string, data: Uint8Array) -> string
- decode(encodingName: string, text: string) -> Uint8Array
- createEncodingFromCharset(name: string, charset: string, options?) -> Encoding
- listEncodings() -> Array<EncodingMetadata>
- encodeUUID(uuidString: string, encodingName: string, options?) -> string
- decodeUUID(encoded: string, encodingName: string, options?) -> string
- Convenience built-ins (names must exist): encodeBase62, decodeBase62, encodeAscii85, decodeAscii85, encodePrintableDense, decodePrintableDense

Tests
- Tests in tests/unit/encodings.test.js import the above names using named imports from src/lib/main.js and assert their presence and types.
- Integration tests call these exports to run round-trip encode/decode scenarios for the built-in encodings and custom encodings.

Acceptance criteria (testable)
- src/lib/main.js exports all required names as named exports (no default import used in tests).
- Each exported name is a function (assert typeof === 'function').
- The test file tests/unit/encodings.test.js imports the names and the test suite referencing them runs (i.e., tests do not fail due to missing exports).

Notes
- If an export is missing or named differently, update src/lib/main.js and the tests to match the canonical names above.
