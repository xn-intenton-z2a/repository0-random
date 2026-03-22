# UUID_SHORTHAND

Overview

Provide small helper functions for compactly encoding and decoding v7 UUIDs. The shorthand helpers convert between canonical UUID strings and a compact, reversible printable representation using any registered encoding.

Behavior

- Encoding accepts canonical dashed UUID strings or 32-character hexadecimal UUID strings. Dashes are ignored and the hex parsed to a 16-byte buffer. The buffer is encoded using the chosen encoding and the resulting string is reversed to produce the shorthand form.
- Decoding performs the inverse: the shorthand string is reversed, decoded to 16 bytes, and formatted as a canonical lowercase dashed UUID string.

Acceptance Criteria

1) encodeUUID and decodeUUID are exported and are exact inverses: decoding the result of encodeUUID returns the canonical UUID string.
2) Functions accept both dashed and undashed UUID input formats and tolerate uppercase hex input.
3) Unit tests cover special UUID cases including all zeros and all 0xFF and verify length expectations for different encodings.
4) When used with the densest encoding, the shorthand length for a UUID is strictly less than 22 characters.
