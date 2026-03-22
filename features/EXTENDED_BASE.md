# EXTENDED_BASE

Overview

Implement a high-density encoding constructed from the printable ASCII range U+0021 to U+007E excluding space and visually ambiguous characters 0, O, 1, l, I. The goal is to maximise bits per character while keeping output printable and reasonably human friendly.

Design

- Charset is derived programmatically from the printable ASCII block, excluding ambiguous characters and duplicates.
- The encoding must be registered with defineEncoding and appear in listEncodings.

Acceptance Criteria

1) The extended printable encoding is creatable via defineEncoding and listed in listEncodings with the correct charsetSize and computed bitsPerChar.
2) For a v7 UUID (16 bytes) the encoded result using the densest extended charset is strictly shorter than 22 characters; unit tests assert the length is below 22.
3) Round-trip decoding returns the exact original bytes for arbitrary inputs including edge cases.
4) Charset validation ensures no control characters, no duplicates, and ambiguous characters are excluded.
