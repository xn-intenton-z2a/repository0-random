# README_COMPARISON

Status: Merged; verification failing — see issue #72

Test files: tests/unit/encodings.test.js

Summary
Update README.md to include a comparison table showing encoded lengths for a 16-byte UUID across key encodings.

Motivation
Visible, reproducible evidence of encoding density is required by the mission and helps users choose an encoding.

Table contents
- Columns: Encoding, Charset size, Bits per char, Expected length for 16-byte UUID, Notes
- Rows to include at minimum:
  - Hex (baseline): charsetSize 16, bitsPerChar 4.0, Expected length 32, Notes: canonical hex with dashes stripped is 32 chars
  - base64 (no padding): 64, 6.0, Expected length 22, Notes: baseline comparison
  - base62: 62, ≈5.954, Expected length 22
  - base85: 85, ≈6.4105, Expected length 20
  - printable-dense: 89, ≈6.476, Expected length 20, Notes: excludes ambiguous characters
- Add a short note explaining how expected lengths are computed: ceil(128 / bitsPerChar).

Acceptance criteria
- README.md is updated with the comparison table.
- The table rows match actual results produced by unit tests for the encodings implemented in the library.
