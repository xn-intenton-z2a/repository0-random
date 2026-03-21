# SERIALIZE

Summary

Provide the capability to convert a parsed cron object back into a canonical cron string so the structure can be persisted and compared. Serialization must preserve semantic equivalence and produce a stable, readable representation.

Scope

- stringify(parsedCron) -> string
- Ensure that parse(stringify(parsedCron)) yields a semantically equivalent structure.

Acceptance Criteria

1. Serializing a parsed representation of "*/15 * * * *" returns an equivalent cron string that, when parsed again, yields an equivalent structure.
2. The library documents the canonical form used for serialization (for example: seconds field present only when the input had seconds; otherwise serialize 5-field strings).
3. Round-trip property: parse -> serialize -> parse produces equivalent parsed structures for representative inputs.
