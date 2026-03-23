UUID (canonical encoding of 16 bytes; shorthand for UUID->bytes->encode)

TABLE OF CONTENTS
- Canonical textual form of UUIDs
- Converting a UUID string to a 16-byte buffer (exact steps)
- Shorthand encode/decode flow for this project
- Endianness notes and reversal shorthand used by the mission
- API signatures for UUID helpers
- Detailed digest, retrieval date and attribution

NORMALISED EXTRACT
Canonical textual form:
- A UUID canonical string is 32 hexadecimal digits displayed in five groups separated by hyphens, in the form 8-4-4-4-12 (total 36 characters including four hyphens). Example: 123e4567-e89b-12d3-a456-426614174000.

Converting UUID string -> 16 bytes (exact steps):
1. Remove all hyphens from the string (strip dashes). After removal the string must be exactly 32 hexadecimal characters.
2. Validate that the remaining characters are [0-9A-Fa-f].
3. For i from 0 to 15: byte[i] = parseInt(hex.substr(i*2, 2), 16). Output result as Uint8Array(16).

Shorthand encode/decode flow recommended for this project:
- encodeUUID(uuidString: string, encodingName: string, options?: { reverse?: boolean }): string
  1. Strip hyphens, parse to 16-byte Uint8Array as above.
  2. If options.reverse is true, reverse the byte order in the array (in-place) before encoding.
  3. Call encode(encodingName, byteArray) to produce the encoded representation.
  4. Return the encoded string. If reversal was used document that the function encodes reversed bytes.

- decodeUUID(encoded: string, encodingName: string, options?: { reversed?: boolean }): string
  1. Call decode(encodingName, encoded) to get a Uint8Array of length 16.
  2. If options.reversed is true, reverse the byte order.
  3. Convert bytes back to hex pairs, insert hyphens at 8,12,16,20 positions to produce canonical UUID string.

Endianness and reversal note:
- The mission shorthand calls for "strip dashes from a UUID string, encode the 16 bytes, and reverse." This can mean reversing the output string or reversing the raw byte array before encoding. The recommended, explicit behaviour for deterministic round-trip is: reverse bytes prior to encoding if and only if the API option reverse=true; document this clearly so decode can reverse accordingly.

API SIGNATURES
- encodeUUID(uuidString: string, encodingName: string, options?: { reverse?: boolean }): string
- decodeUUID(encoded: string, encodingName: string, options?: { reversed?: boolean }): string  // returns canonical UUID string with hyphens

DETAILED DIGEST (sources)
- RFC 4122 (rfc4122.txt) — authoritative layout and bit-level definitions for UUIDs; retrieval date: 2026-03-23; retrieved bytes: 59319; source: https://www.rfc-editor.org/rfc/rfc4122.txt
- uuid (GitHub README) — package README with API signatures (parse/stringify/validate/version/NIL/MAX and v1..v7); retrieval date: 2026-03-23; retrieved bytes: 16839; source: https://raw.githubusercontent.com/uuidjs/uuid/main/README.md

REFERENCE DETAILS (from RFC 4122)
- UUID size: 128 bits (16 octets).
- Octet layout (octet 0 is the first/leftmost hex-pair):
  - time_low: octets 0-3 (32 bits)
  - time_mid: octets 4-5 (16 bits)
  - time_hi_and_version: octets 6-7 (16 bits) — most significant 4 bits represent the version.
  - clock_seq_hi_and_reserved: octet 8 — variant encoded in MSBs.
  - clock_seq_low: octet 9
  - node: octets 10-15 (48 bits)
- Version: stored in the four most significant bits of octet 6 (time_hi_and_version high nibble).
- Variant: For the RFC 4122 variant, the two most significant bits of clock_seq_hi_and_reserved are 1 0 (binary pattern 10xxxxxx).
- Textual representation: 32 hexadecimal digits grouped 8-4-4-4-12 separated by hyphens (36 characters total). Hyphen insertion points: after characters 8, 13, 18, 23.
- Conversion rules:
  - Parse textual form -> bytes: remove hyphens, validate 32 hex digits, convert left-to-right into 16 bytes (hex-pair per byte) to a Uint8Array(16).
  - Stringify bytes -> textual form: take byte[0]..byte[15] left-to-right, format as hex pairs, insert hyphens at positions above.
- Endianness: RFC describes fields as octet sequences. Treat the UUID as an ordered array of 16 octets for raw encode/decode; if integer field extraction is required, use network byte order. The mission's optional "reverse bytes" behaviour must be explicit and reversible.
- Example mapping:
  - Text: 00112233-4455-6677-8899-aabbccddeeff
  - Bytes: 00 11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff (Uint8Array.of(0x00,0x11,...,0xff))

IMPLEMENTATION NOTES (from uuid README)
- parse(str) -> Uint8Array[16]: parses canonical string and throws TypeError if invalid.
- stringify(arr[, offset=0]) -> String: converts 16 bytes (from offset) to canonical UUID string.
- v1([options[, buffer[, offset]]]) -> String | writes into buffer: creates a version 1 (timestamp) UUID.
- v4([options[, buffer[, offset]]]) -> String | writes into buffer: creates a version 4 (random) UUID.
- v7([options[, buffer[, offset]]]) -> String | writes into buffer: creates a version 7 (Unix epoch time-based) UUID.
- Constants: NIL = '00000000-0000-0000-0000-000000000000'; MAX = 'ffffffff-ffff-ffff-ffff-ffffffffffff'.
- Helpers: validate(str) -> boolean; version(str) -> number (RFC version).
- Note: parse/stringify preserve left-to-right hex-pair ordering; parse returns a Uint8Array and stringify accepts Array-like 0-255 values.

ATTRIBUTION
- RFC 4122, retrieved 2026-03-23 (59319 bytes) — https://www.rfc-editor.org/rfc/rfc4122.txt
- uuid README (raw GitHub), retrieved 2026-03-23 (16839 bytes) — https://raw.githubusercontent.com/uuidjs/uuid/main/README.md

Make sure the mission shorthand (strip dashes, encode 16 bytes, reverse) is implemented with an explicit byte-reversal option to guarantee deterministic round-trip behaviour.
