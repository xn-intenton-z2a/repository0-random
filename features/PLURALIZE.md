# PLURALIZE

Summary

Implement a basic English pluralize function following the mission's simplified rules.

Specification

API

- pluralize(input) -> string

Behavior

- Treat null or undefined as empty string and return empty string.
- Apply these rules, in order:
  - If a word ends with s, x, z, ch or sh, append es.
  - If a word ends with a consonant followed by y, replace y with ies.
  - If a word ends with f or fe, replace with ves.
  - Otherwise append s.
- Irregular plurals (mouse/mice, child/children, etc.) are out of scope and need not be supported.

Files to change

- src/lib/main.js: implement and export pluralize.
- tests/unit/pluralize.test.js: tests for each rule and edge cases.
- README.md: add pluralize examples.

Acceptance criteria

- pluralize of bus -> buses
- pluralize of box -> boxes
- pluralize of baby -> babies
- pluralize of knife -> knives
- pluralize of cat -> cats
- Null or empty input returns empty string.

Test cases

- Input: "bus" -> "buses"
- Input: "box" -> "boxes"
- Input: "baby" -> "babies"
- Input: "knife" -> "knives"
- Input: "cat" -> "cats"
