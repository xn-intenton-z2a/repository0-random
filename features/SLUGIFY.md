# SLUGIFY

Summary

Implement a slugify function that converts arbitrary input into a URL-friendly slug suitable for use in paths and filenames.

Specification

API

Export a named function slugify that accepts a single argument (string | null | undefined) and returns a string.

Behavior

- Treat null or undefined as an empty string and return an empty string.
- Normalize unicode to a canonical form and remove diacritic marks (for example, Café -> cafe).
- Convert to lowercase.
- Replace any contiguous sequence of non-alphanumeric characters and separators with a single hyphen.
- Trim leading and trailing hyphens and collapse repeated hyphens.
- Result must contain only lowercase letters, numbers and hyphens; emoji and other symbols are removed.

Files to change

- src/lib/main.js: implement and export slugify.
- tests/unit/slugify.test.js: unit tests covering typical and edge cases.
- README.md: add usage examples for slugify.

Acceptance criteria

- Slugifying Hello World! produces hello-world.
- Slugifying Café produces cafe.
- Multiple spaces and separators collapse to a single hyphen.
- Leading and trailing separators produce no leading/trailing hyphens.
- Null or undefined input returns an empty string.

Test cases

- Input: "Hello World!" -> Output: "hello-world"
- Input: "  Multiple   separators__here  " -> Output: "multiple-separators-here"
- Input: "Café" -> Output: "cafe"
- Input: null -> Output: ""
