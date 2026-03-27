# COMBINER_SUPPORT

Summary

Add explicit support for schema combinators (allOf, oneOf, anyOf) in the diffing engine so that changes within combinator members are detected, reported as nested diffs, and classified consistently.

Specification

- Ensure diffSchemas traverses combinator keywords allOf, oneOf and anyOf recursively and incorporates member-level differences into the returned change array.
- Represent differences inside a combinator as a nested-changed record whose path points to the combinator location and whose changes field contains the sub-diff array for the affected member(s). The nested-changed record may include a combiner meta field with one of values: allOf, oneOf, anyOf to aid formatting and classification.
- When a member schema is added or removed from a combinator, emit a nested-changed containing a sub-change describing the member addition or removal; do not invent new top-level changeType names beyond the mission set.
- Implement a stable, deterministic comparison strategy for combinator members so that diff output ordering is repeatable; choose canonical ordering by member structural hash or stable JSON stringify when comparing members.
- Provide an optional diffSchemas options flag combinatorStrategy with choices member (compare by member identity) and flatten (attempt to canonicalise allOf by merging properties where safe) to allow flexible behaviour in tests and consumers.

Public API

- No new mandatory named exports; diffSchemas must accept an optional options object that includes combinatorStrategy and be covered by unit tests.

Acceptance Criteria

- [ ] diffSchemas detects changes inside allOf, oneOf and anyOf members and returns nested-changed records with path pointing to the combinator location
- [ ] Adding or removing a member schema in a combinator is surfaced as a nested-changed with a clear sub-change describing the addition or removal
- [ ] Equivalent combinator members (structurally equal after local $ref resolution) produce no diffs; tests assert no false positives
- [ ] Deterministic ordering: two runs of diffSchemas on the same input produce identical ordering of combinator-related change records
- [ ] Unit tests cover: an allOf member property change, a oneOf member addition, and a no-op case where combinator members are equivalent

Notes

- Keep the behaviour conservative: when in doubt about semantic equivalence of combinator members, prefer to emit a nested-changed and classify conservatively (breaking if it might remove valid instances).
- This feature builds on resolveLocalRefs; combinator tests should pass resolved schemas into diffSchemas or use the resolver as part of the test fixture.
