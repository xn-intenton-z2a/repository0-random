# CASE_CONVERSIONS

Summary

Implement three related casing utilities: camelCase, kebabCase and titleCase. Each function is small, pure, and exported from the library entrypoint.

Specification

API

- camelCase(input) -> string
- kebabCase(input) -> string
- titleCase(input) -> string

Behavior

- All functions treat null and undefined as empty string and return empty string.
- Word boundaries are spaces, hyphens, underscores and transitions from lower to upper case.
- camelCase: first word lowercased, subsequent words capitalised and joined with no separators. Example: foo-bar-baz -> fooBarBaz.
- kebabCase: lowercased words joined with single hyphens; remove non-alphanumeric characters except hyphen. Example: Hello World! -> hello-world.
- titleCase: capitalise the first letter of each word; remaining letters lowercased. Example: hello world -> Hello World.

Files to change

- src/lib/main.js: implement and export camelCase, kebabCase, titleCase.
- tests/unit/cases.test.js: unit tests for each function, including Unicode and edge cases.
- README.md: add examples for each function.

Acceptance criteria

- camelCase of foo-bar-baz produces fooBarBaz.
- kebabCase of Hello World! produces hello-world.
- titleCase of hello world produces Hello World.
- Null and empty inputs return empty strings.

Test cases

- camelCase: Input: "foo-bar-baz" -> Output: "fooBarBaz"
- kebabCase: Input: "Hello World!" -> Output: "hello-world"
- titleCase: Input: "hello world" -> Output: "Hello World"
- Unicode: Input: "naïve approach" -> camelCase -> "naiveApproach" (diacritics handled consistently)
