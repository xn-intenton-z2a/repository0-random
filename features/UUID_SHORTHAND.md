# UUID_SHORTHAND

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Provide helpers to encode and decode UUID strings using the repository shorthand: strip hyphens, convert hex to 16 bytes, optionally reverse bytes, and encode with a named encoding.

API
- encodeUUID(uuidString: string, encodingName: string, options?: { reverse?: boolean }) -> string
- decodeUUID(encoded: string, encodingName: string, options?: { reversed?: boolean }) -> canonicalUuidString

Behavior
- encodeUUID: validate UUID shape (32 hex characters or canonical 8-4-4-4-12 with hyphens), strip hyphens, parse to 16-byte Uint8Array, if options.reverse true then reverse the byte array before calling encode(encodingName, bytes). Return encoded string.
- decodeUUID: decode text to bytes with decode(encodingName, text), if options.reversed true then reverse bytes, then format as canonical UUID lowercase hex with hyphens at 8-4-4-4-12 positions.
- Error handling: invalid inputs throw a descriptive validation error.

Tests
- Round-trip tests: for both reverse true and false, decodeUUID(encodeUUID(uuid, enc, {reverse})) equals the canonical UUID when decode uses reversed option accordingly.
- Edge cases: invalid UUID formats produce validation errors; too-short/too-long hex or non-hex characters.
- Verify decoded canonical format uses lowercase hex and hyphens in the correct positions.

Acceptance criteria (testable)
- encodeUUID and decodeUUID are exported and callable.
- Round-trip tests for reverse=true and reverse=false pass for a canonical example UUID and random samples.
- decodeUUID returns canonical lowercase hyphenated UUID strings.
- Invalid UUID inputs are rejected with a validation error asserted in tests.
