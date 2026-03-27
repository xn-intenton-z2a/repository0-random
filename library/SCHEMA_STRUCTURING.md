NORMALISED EXTRACT

Table of contents:
- Reuse patterns and placement of reusable subschemas
- $ref usage and replacement semantics
- Combining schemas and recommended matching strategy
- Practical structuring rules for large schemas
- Normalization guidance before diffing

Reuse patterns and placement
- Keep reusable definitions under a single top-level key (traditionally definitions or components). Example canonical form: definitions: { Name: <schema> }.
- Reference reusable subschemas via JSON Pointer fragments: $ref: "#/definitions/Name".
- Prefer local references (same document) for deterministic resolution; remote references complicate deterministic diffing and are out of scope.

$ref usage and replacement semantics
- $ref is a URI reference. When the reference is local (fragment-only) resolve it to the target schema node and replace the $ref node with the target for validation and for diffing.
- Do not attempt to merge sibling keywords present alongside $ref with the resolved schema; treat the resolved schema as replacing the location containing $ref.

Combining schemas and matching
- For allOf: require all subschemas to validate; for diffing compare corresponding subschemas by best-effort structural equality or by index if schemas are positional.
- For anyOf/oneOf: attempt to pair subschemas by structure; unmatched subschemas are considered added/removed and produce nested-changed records.
- Avoid flattening combinations unless explicit normalization is applied; preserve their structure so change records reflect original schema layout.

Practical rules
- Make 'properties', 'definitions', 'patternProperties' explicit empty objects when absent to simplify traversal.
- Keep definitions shallow and named when reuse is intended; deep anonymous inline schemas impede reuse and increase diff noise.
- When refactoring a schema to reduce duplication, prefer replacing repeated inline schemas with $ref to a single definition to keep diffs smaller in the future.

Normalization guidance before diffing
- Run resolveLocalRefs to inline or canonicalize refs according to policy (inline deep-clone or preserve identity for cycles).
- Normalize type to array form and ensure required is an array.
- Canonicalize default-semantic fields: absent properties -> {}, absent required -> [].

DETAILED DIGEST
Source: https://json-schema.org/understanding-json-schema/structuring.html
Retrieved: 2026-03-27
Bytes obtained: 6407 (partial HTML capture)
Extracted: guidance and recommendations for modular schema design, reuse via definitions and $ref, and best practices for organizing large JSON Schemas. Use these to shape normalization and diff noise-reduction strategies.

ATTRIBUTION
JSON Schema - Understanding JSON Schema (structuring). Data harvested: 6407 bytes (partial capture).
