# SCHEMA_DIFF_ENGINE

Summary

Specification for the core schema diff engine: a deterministic library function that compares two JSON Schema (Draft-07) documents and returns a structured array of change records that follow the mission Change Record Format.

Specification

- Public function: diffSchemas(schemaBefore, schemaAfter) -> Array of change objects.
- Input: two in-memory JSON Schema objects. Both schemas must be resolved for local $ref pointers prior to structural comparison (see REF_RESOLUTION).
- Traversal: recursively walk properties, items, and the combinators allOf, oneOf, anyOf. When encountering arrays use the items schema for element diffs.
- For each property or subschema, produce change records for: property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, and nested-changed.
- Nested differences: when a property contains sub-schema differences, emit a single nested-changed record with a changes field that contains the sub-diff array.
- Change record fields: path (JSON Pointer string), changeType (one of supported values), before, after. nested-changed records include changes: [...subchanges].
- No external runtime dependencies; implementation is pure JS and must be testable synchronously.

Public API (named export)

- diffSchemas

Acceptance Criteria

- [ ] Diffing two schemas returns an array of change objects
- [ ] Detects added and removed properties
- [ ] Detects type changes (for primitive and simple compound types)
- [ ] Detects required array changes
- [ ] Handles nested schemas recursively (properties within properties)
- [ ] Supports the changeType values enumerated in the mission
- [ ] Unit tests exercise core diff behavior (see UNIT_TESTS)

Notes

- diffSchemas delegates $ref resolution to resolveLocalRefs and assumes schemas passed in are either original or previously resolved. Implementation must guard against infinite recursion when schemas contain cycles.