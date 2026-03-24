# TRUNCATE_WRAP

Summary

Implement truncate and wordWrap utilities to handle display-length constraints without breaking words unexpectedly.

Specification

API

- truncate(input, maxLength, suffix) -> string
- wordWrap(input, width) -> string

Behavior

truncate

- Treat null or undefined as empty string and return empty string.
- If input length is less than or equal to maxLength, return the original input.
- Default suffix is the single-character ellipsis.
- Do not break mid-word: when truncation is required, find the last word boundary before maxLength minus suffix length and truncate there; append the suffix.
- If the first word itself exceeds the allowed length (so no boundary fits), fallback to a hard cut so the returned string length including suffix is at most maxLength.

wordWrap

- Treat null or undefined as empty string and return empty string.
- Soft wrap text at word boundaries; do not split words across lines.
- If a single word exceeds width, place it on its own line unbroken.
- Use a single newline as the line separator.

Files to change

- src/lib/main.js: implement and export truncate and wordWrap.
- tests/unit/truncate-wrap.test.js: comprehensive tests for both functions.
- README.md: add examples showing both utilities.

Acceptance criteria

- Truncating Hello World to length 8 produces Hello followed by the ellipsis.
- Truncate respects suffix length and does not break mid-word unless impossible.
- wordWrap never splits words and places long words on their own line.

Test cases

- truncate: Input: "Hello World", maxLength: 8 -> Output: "Hello…"
- truncate: Input: "Supercalifragilisticexpialidocious", maxLength: 10 -> Output length <= 10 and contains suffix (single long word fallback)
- wordWrap: Input: "one two three", width: 5 -> Output lines: ["one two", "three"]
- wordWrap: Input: "averylongwordhere short", width: 6 -> Output lines: ["averylongwordhere", "short"]
