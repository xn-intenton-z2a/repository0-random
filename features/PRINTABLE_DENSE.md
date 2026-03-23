# PRINTABLE_DENSE

Status: Merged; verification failing — see issue #72

Test files: tests/unit/encodings.test.js

Summary
Provide a high-density encoding using printable ASCII characters U+0021..U+007E excluding space and visually ambiguous characters (0, O, 1, l, I). This produces a charset of size 89 and maximizes bits/char for shortest output.

Motivation
A dense printable encoding is required to exceed base64 density and obtain UUID representations shorter than 22 characters.

Behavior
- Charset: all printable ASCII characters from '!' through '~', excluding space and the ambiguous characters 0, O, 1, l, I.
- Use big-integer division algorithm (base-x style) for arbitrary base support and to preserve leading zeros.
- Registerable name: printable-dense
- Exposed functions: encodePrintableDense(data: Uint8Array) -> string; decodePrintableDense(text: string) -> Uint8Array

Tests
- Round-trip tests on random and edge-case inputs.
- Verify that the reported charsetSize is 89 and bitsPerChar ≈ 6.476.
- Verify encoded 16-byte UUID length is 20 characters (ceil(128 / bitsPerChar) == 20).

Acceptance criteria
- Implementation provides lossless encode/decode for arbitrary Uint8Array.
- listEncodings reports printable-dense with charsetSize = 89 and bitsPerChar ≈ 6.476.
- The densest encoding in the library produces fewer than 22 characters for a 16-byte UUID (expected 20).
- Unit tests covering the above pass.
