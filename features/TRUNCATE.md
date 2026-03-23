# TRUNCATE

Summary

Implement a truncate function that shortens a string to a maximum length and appends a suffix (default an ellipsis). Behavior: treat null or undefined as an empty string. When truncation is required, preserve whole words where possible: include as many whole words as fit within max length minus suffix length; if no whole word can fit, truncate the first word to fit and then append the suffix. If the input length is less than or equal to the requested length, return the input unchanged.

Acceptance Criteria

- Truncating "Hello World" to length 8 returns "Hello…".
- Truncating "Short" to length 10 returns "Short".
- Custom suffixes are supported and counted against the requested length.
- Null or undefined input returns an empty string.
- The function is exported as a named export from src/lib/main.js.
