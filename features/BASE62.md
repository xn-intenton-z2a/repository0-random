# BASE62

Summary
Implement a standard Base62 encoding using the alphabet 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ and base-x long-division semantics.

Motivation
Base62 is a required built-in encoding that is URL-safe and provides ~5.95 bits per character; target representation for a 16-byte UUID is 22 characters.

Behavior
- Provide lossless encode and decode operations accepting and returning Uint8Array and string respectively.
- Preserve leading zeros using leader-character rules compatible with base-x implementations.
- Must not emit control characters and must be deterministic.
- No padding characters.

API
- Registerable name: base62
- Exposed functions: encodeBase62(data: Uint8Array) -> string; decodeBase62(text: string) -> Uint8Array
- The library should also support createEncodingFromCharset('base62', charset) to register the canonical alphabet.

Tests
- Round-trip equality for random inputs and edge cases: empty buffer, single byte, all-zero bytes, all-0xFF bytes.
- UUID length test: encoding the 16-byte UUID buffer must produce exactly 22 characters.
- Include property test that decodeBase62(encodeBase62(x)) deep-equals original buffer for many random samples.

Acceptance criteria
- encodeBase62 and decodeBase62 are implemented and exported.
- All unit tests for edge cases and round-trip pass.
- listEncodings includes an entry with name base62, charsetSize = 62 and bitsPerChar ≈ 5.9542.
- UUID test shows encoded length = 22.
