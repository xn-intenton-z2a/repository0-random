# BASE62

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Provide a canonical base62 encoding using the alphabet 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ. Implementation must be lossless, deterministic, and operate on Uint8Array input.

Behavior
- Encode and decode operate on Uint8Array/string.
- Preserve leading zeros when encoding/decoding (base-x long division semantics).
- No padding characters; URL-safe.

API
- Registered name: "base62"
- Exposed helpers: encodeBase62(data: Uint8Array) -> string; decodeBase62(text: string) -> Uint8Array

Numeric properties
- charsetSize: 62
- bitsPerChar: ≈ 5.9542 (use computed value in code with at least 4 decimal places)
- Expected encoded length for a 16-byte UUID: 22 (assert length === 22 in tests)

Tests
- Round-trip equality: decodeBase62(encodeBase62(buf)) deep-equals buf for random buffers and edge cases: empty, single-byte, all-0x00, all-0xFF.
- UUID length test: encoding a 16-byte UUID buffer produces exactly 22 characters.

Acceptance criteria (testable)
- encodeBase62 and decodeBase62 are exported and callable.
- Round-trip tests for random and edge-case buffers pass.
- A deterministic assertion verifies encoding of a known 16-byte UUID buffer yields a 22-character string.
- listEncodings() includes an entry { name: 'base62', charsetSize: 62, bitsPerChar: closeTo(5.9542, 1e-4) }.
