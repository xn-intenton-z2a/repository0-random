# HTML_REGEX

Summary

Provide two utilities for working with markup and regular expressions: stripHtml and escapeRegex.

Specification

API

- stripHtml(input) -> string
- escapeRegex(input) -> string

Behavior

stripHtml

- Treat null and undefined as empty string and return empty string.
- Remove HTML tags and script/style content safely.
- Decode common HTML entities at minimum: amp, lt, gt, quot, apos and nbsp so that "&amp;" becomes "&" and "&nbsp;" becomes a space.
- Collapse excessive whitespace resulting from removals into single spaces and trim the result.

escapeRegex

- Treat null and undefined as empty string and return empty string.
- Return a new string where characters that have special meaning in regular expressions are escaped by prefixing them with a backslash so the returned string can be safely inserted into a RegExp constructor to match the literal input.
- Characters to escape include necessarily: . * + ? ^ $ { } ( ) | [ ] \ / and similar metacharacters.

Files to change

- src/lib/main.js: implement and export stripHtml and escapeRegex.
- tests/unit/html-regex.test.js: unit tests covering entity decoding and escaping behaviour.
- README.md: add usage examples for both utilities.

Acceptance criteria

- stripHtml of <p>Hello &amp; World</p> produces Hello & World.
- stripHtml trims and collapses whitespace consistently and decodes &nbsp; into a space.
- escapeRegex ensures that a string containing ., *, +, ?, parentheses, brackets or other regex metacharacters is returned with those characters escaped so the result can be used literally in a regular expression.

Test cases

- stripHtml: Input: "<p>Hello &amp; World</p>" -> Output: "Hello & World"
- stripHtml: Input: "Hello&nbsp;&nbsp;World" -> Output: "Hello World"
- escapeRegex: Input: ".*?[test](1)" -> Output is the literal string with regex metacharacters escaped (suitable for RegExp constructor)
