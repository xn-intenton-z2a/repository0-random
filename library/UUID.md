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

DETAILED DIGEST (source excerpt)
- Wikipedia: Universally unique identifier — contains canonical textual representation rules and background on versions (including notes on recent version 7). Retrieval date: 2026-03-22. Retrieved bytes: ~183.9 KB. Source: https://en.wikipedia.org/wiki/Universally_unique_identifier

ATTRIBUTION
- Source: Wikipedia UUID page, retrieved 2026-03-22 (~183.9 KB). For version-specific binary layouts consult the UUID IETF drafts if precise ordering of timestamp/version fields is required; the shorthand above treats UUID as opaque 16 octets for encode/decode purposes.
