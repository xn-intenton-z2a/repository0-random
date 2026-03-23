# CUSTOM_ENCODING

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Provide a factory to create and register custom encodings from a charset string, returning an Encoding object with encode/decode operations and metadata.

Behavior and validation
- API: createEncodingFromCharset(name: string, charset: string, options?) -> Encoding
- Validation rules (default):
  - Charset must be a non-empty string of unique characters.
  - Charset length >= 2.
  - Charset must only contain printable characters (no control characters).
  - By default, reject ambiguous characters: 0, O, 1, l, I — caller can override via options.allowAmbiguous = true.
- Returned Encoding object includes: name, charset, charsetSize (integer), bitsPerChar (number), encode(data: Uint8Array), decode(text: string).

API contract
- Register encoding under provided name so encode(name, data) and decode(name, text) work.

Tests
- Creating an encoding with valid charset succeeds; encode/decode round-trips for sample buffers.
- Creating with duplicate characters or non-printable characters fails with a validation error.
- createEncodingFromCharset(..., { allowAmbiguous: true }) accepts ambiguous characters.
- Registered custom encodings appear in listEncodings() with correct metadata.

Acceptance criteria (testable)
- createEncodingFromCharset is exported and callable.
- Validation errors are thrown for invalid charsets and the test asserts the error type/message.
- A test registers a simple custom charset, encodes and decodes a set of buffers, and asserts equality.
- listEncodings() returns the newly registered encoding showing correct name, charsetSize and bitsPerChar (bitsPerChar = log2(charsetSize) to at least 4 decimal places).
