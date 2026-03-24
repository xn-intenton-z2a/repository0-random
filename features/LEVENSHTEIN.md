# LEVENSHTEIN

Summary

Implement an edit-distance function that computes the Levenshtein distance between two strings using a standard dynamic programming algorithm.

Specification

API

- levenshtein(a, b) -> number

Behavior

- Treat null or undefined inputs as empty strings.
- Use an efficient dynamic programming approach with O(min(len(a), len(b))) space where reasonable, but correctness is primary.
- Work with Unicode strings; operations are performed on code points so high-surrogate pairs are handled by the JavaScript string model consistently.

Files to change

- src/lib/main.js: implement and export levenshtein.
- tests/unit/levenshtein.test.js: include unit tests, including the canonical example.
- README.md: add an example demonstrating use.

Acceptance criteria

- Levenshtein distance between kitten and sitting is 3.
- Distance between identical strings is 0.
- Distance between empty and non-empty strings is the length of the non-empty string.
- Null and undefined are treated as empty strings.

Test cases

- Input: a="kitten", b="sitting" -> Output: 3
- Input: a="", b="abc" -> Output: 3
- Input: a=null, b="a" -> Output: 1
