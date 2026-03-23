# README_COMPARISON

Status: Implemented; verification pending (CI failing — see issue #72)

Test files: tests/unit/encodings.test.js

Summary
Update the repository README (README.md) with an explicit comparison table showing expected encoded lengths for a 16-byte UUID across key encodings and the formula used to compute expected lengths.

Table requirements
- Columns: Encoding, Charset size, Bits per char, Expected length for 16-byte UUID, Notes
- Row computation: Expected length = Math.ceil(128 / bitsPerChar)
- Rows to include at minimum:
  - hex (baseline): charsetSize=16, bitsPerChar=4.0000, expected length=32
  - base64 (no padding): charsetSize=64, bitsPerChar=6.0000, expected length=22
  - base62: charsetSize=62, bitsPerChar≈5.9542, expected length=22
  - base85: charsetSize=85, bitsPerChar≈6.4094, expected length=20
  - printable-dense: charsetSize=89, bitsPerChar≈6.4760, expected length=20

Tests and verification
- The unit test suite must compute actual encoded lengths for a canonical 16-byte UUID and assert they match the Expected length column for each encoding implemented.

Acceptance criteria (testable)
- README.md contains a comparison table matching the above rows and computation method.
- tests/unit/encodings.test.js includes assertions that actual encoded lengths equal the table values for the implemented encodings.
