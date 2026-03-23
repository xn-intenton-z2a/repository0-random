# UUID_SHORTHAND

Summary
Provide simple helpers to encode and decode UUID strings with the mission shorthand: strip dashes, convert to 16 bytes, optionally reverse bytes, and encode using any registered encoding.

Motivation
The mission benchmark targets a v7 UUID short representation; a concise API reduces user friction and ensures consistent behaviour.

Behavior
- API:
  - encodeUUID(uuidString: string, encodingName: string, options?: { reverse?: boolean }) -> string
  - decodeUUID(encoded: string, encodingName: string, options?: { reversed?: boolean }) -> canonicalUuidString
- Implementation details:
  - encodeUUID: strip hyphens, parse 32 hex chars to 16-byte Uint8Array, if options.reverse true then reverse the byte array before calling encode(encodingName, bytes).
  - decodeUUID: decode to bytes, if options.reversed true reverse bytes, then format as canonical UUID with hyphens in 8-4-4-4-12 groups and lowercase hex.
- Error handling: invalid UUID inputs throw a well-defined validation error.

Tests
- Round-trip tests for encodeUUID + decodeUUID with reverse=true/false.
- Edge-case tests: invalid UUID input, too-short/too-long hex, non-hex characters.
- Verify canonical formatting on decode.

Acceptance criteria
- encodeUUID and decodeUUID are implemented and exported.
- encodeUUID(uuid, 'base64', {reverse:true}) round-trips via decodeUUID(..., {reversed:true}).
- Invalid UUID inputs produce validation errors.
- Unit tests covering the above pass.
