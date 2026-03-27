# UNIT_TESTS

Summary

List of required unit tests to fully validate diffing behaviour, $ref resolution, classification and formatting.

Test cases to implement (each as a focused unit test):

- property-added: before schema missing property, after schema contains it -> expect property-added change
- property-removed: before contains property, after missing -> expect property-removed
- type-changed: property type changes from string to number -> expect type-changed
- required-added: property moves from optional to required -> expect required-added and classification breaking
- required-removed: property moves from required to optional -> expect required-removed
- enum-value-added and enum-value-removed
- description-changed
- nested-changed: property containing a nested object with internal changes produces nested-changed and a sub-diff array
- $ref resolution: simple local $ref, nested $ref, and cycle detection
- remote $ref: encountering a non-local $ref throws
- classification: removed required property -> classifyChange returns "breaking"
- formatting: formatChangesText and formatChangesJSON produce the expected outputs for a representative diff array

Organization

- File: tests/unit/diff.test.js (or separate files per concern) and using the existing npm test script.
- Each test must be deterministic and only test one behaviour per test case.

Acceptance Criteria

- [ ] Unit tests covering every changeType and edge case listed above are present in tests/unit/
- [ ] Tests import the public API as named exports from src/lib/main.js

Notes

- Keep tests small and focused; use small example schemas to express each case clearly.