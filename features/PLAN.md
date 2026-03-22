PLAN

Problem statement

The repository currently lacks feature specifications needed to guide implementation of dense printable encodings and UUID shorthand helpers. Create focused feature specs so implementers can produce minimal, testable changes.

Approach

1) Provide feature specs covering core API, built-in encodings, densest printable encoding, UUID shorthand, encoding listing metadata, custom charset rules, and README comparison.
2) Keep each feature small, with explicit acceptance criteria and unit-testable outcomes.
3) After features are accepted, implement the API in src/lib/main.js and add unit tests under tests/unit to meet acceptance criteria.

Todos

- implement-core: implement named exports encode, decode, defineEncoding, listEncodings, encodeUUID, decodeUUID
- add-builtins: implement and register base62, base85 and base91
- add-extended: implement printable extended encoding and demonstrate UUID length under 22 characters
- uuid-shorthand: implement and test the shorthand helpers
- tests: add unit tests for round-trip and length comparisons

Notes

- Follow MISSION.md rules for printable character selection and ambiguous-character exclusion.
- Use unit tests to verify all acceptance criteria.
