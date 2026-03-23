# REGEX_ESCAPE

Summary

Provide escapeRegex to escape all characters that have special meaning in regular expressions. Behavior: treat null or undefined as an empty string; escape characters such as . ^ $ * + ? ( ) [ ] { } \ and | so the returned string can safely be used to construct a RegExp.

Acceptance Criteria

- escapeRegex applied to a string containing special regex characters returns a new string where each regex-significant character is prefixed with a backslash.
- Null or empty input returns an empty string.