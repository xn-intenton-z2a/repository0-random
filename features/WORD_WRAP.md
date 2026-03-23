# WORD_WRAP

Summary

Implement wordWrap that soft-wraps text at word boundaries to a given width. Behavior: treat null or undefined as an empty string; lines are separated by a newline character; never break a word across lines; if a single word exceeds the width, place that word on its own unbroken line.

Acceptance Criteria

- wordWrap applied to "The quick brown fox" with width 10 results in two lines where the first line contains "The quick" and the second line contains "brown fox" (a single newline between lines).
- A single word longer than the width is returned on its own unbroken line.
- Null or empty input returns an empty string.
- The function is exported as a named export from src/lib/main.js.
