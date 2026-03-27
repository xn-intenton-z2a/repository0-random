# JSON Schema Diff — Reference

This document describes the change record format and classification rules used by the library.

Change record shape

Each change is a plain object with at least these fields:

- `path` — JSON Pointer (RFC 6901) pointing to where the change occurred (e.g. `/properties/email`).
- `changeType` — one of: `property-added`, `property-removed`, `type-changed`, `required-added`, `required-removed`, `enum-value-added`, `enum-value-removed`, `description-changed`, `nested-changed`.
- `before` / `after` — previous and new values when applicable (types, descriptions, enums, or schema fragments).
- `changes` — present on `nested-changed` entries and contains an array of nested ChangeRecord objects.

Classification rules

- `breaking` — changes that are likely to break consumers, including `property-removed`, `required-removed`, and `type-changed`.
- `compatible` — additive or compatible changes like `property-added`, `required-added`, `enum-value-added/removed`, and `nested-changed` by default.
- `informational` — non-behavioural changes like `description-changed`.

$ref handling

- Local `$ref` pointers (those starting with `#`) are resolved inline before diffing.
- Remote `$ref` values (URIs that do not start with `#`) are out of scope and will cause the library to throw an error: `Remote $ref encountered: <ref>`.

Rendering

- `renderChanges(changes, { format: 'text' })` returns a human-readable multi-line string.
- `renderChanges(changes, { format: 'json' })` returns the raw array (deep-cloned).
