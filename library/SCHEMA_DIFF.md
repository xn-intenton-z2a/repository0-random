NORMALISED EXTRACT

Table of contents:
- Public API signatures and expected exports
- Canonicalization steps before diffing
- The diffing algorithm (properties, types, required, enum, description, nested)
- ChangeRecord data model and examples
- Classification rules mapping changeType -> breaking|compatible|informational
- Traversal rules for arrays and combiners (items, allOf/anyOf/oneOf)

Public API signatures (exact, to be exported by src/lib/main.js):
- diffSchemas(beforeSchema: object, afterSchema: object): ChangeRecord[]
    - Returns an array of ChangeRecord objects describing schema-level changes.
- renderChanges(changes: ChangeRecord[], format?: 'text' | 'json'): string | object
    - format 'text' produces readable text, 'json' returns the raw ChangeRecord[].
- classifyChange(change: ChangeRecord): 'breaking' | 'compatible' | 'informational'
- resolveLocalRefs(schema: object): object
    - Replaces local $ref occurrences with resolved nodes; throws on remote refs.

Canonicalization steps (apply to both before and after inputs):
1. resolveLocalRefs(schema): inline or canonicalize local references; throw on remote $ref.
2. Normalize types to arrays (if type is string, convert to [string]).
3. Ensure properties, definitions, patternProperties are objects (default {}).
4. Ensure required is an array (default []).
5. Represent boolean schemas explicitly (true/false) and preserve them.

Diff algorithm (implementation-ready):
- Node-level comparison function diffNode(beforeNode, afterNode, path):
  1. If both nodes are boolean schemas and unequal, emit type-changed or nested-changed as appropriate.
  2. If type differs (after canonicalization), emit { path, changeType: 'type-changed', before: before.type, after: after.type }.
  3. If node contains properties: compute additions, removals, and intersections:
     - For each property in after not in before: emit property-added with after schema snapshot.
     - For each property in before not in after: emit property-removed with before schema snapshot; if property was listed in before.required, classify as breaking.
     - For intersecting properties: call diffNode recursively; if nested diffs returned, emit nested-changed with the nested change array.
  4. Compare required arrays: for each name in after.required - before.required emit required-added; for names in before.required - after.required emit required-removed.
  5. Compare enum arrays: detect added and removed enum values and emit enum-value-added or enum-value-removed.
  6. Compare description strings and emit description-changed if different.
  7. For arrays: if items is single schema, recurse into items. If items is tuple array, compare by index and emit nested-changed per index.
  8. For allOf/anyOf/oneOf: attempt to match subschemas by structural equality or index; matched subschemas are recursively diffed; unmatched ones are emitted as nested-changed additions/removals.

ChangeRecord exact schema (JSON):
- path: string (JSON Pointer path inside the schema, e.g. '/properties/email')
- changeType: one of ['property-added','property-removed','type-changed','required-added','required-removed','enum-value-added','enum-value-removed','description-changed','nested-changed']
- before: any (optional; present for removals/changes)
- after: any (optional; present for additions/changes)
- changes: ChangeRecord[] (optional; present when changeType is nested-changed)

Example record (exact shape):
{ path: "/properties/email", changeType: "type-changed", before: "string", after: "number" }

Classification rules (exact mapping used by classifyChange):
- property-removed: breaking if the property name is present in the before.required array; else compatible.
- property-added: compatible.
- type-changed: breaking.
- required-added: breaking.
- required-removed: compatible.
- enum-value-removed: breaking.
- enum-value-added: compatible.
- description-changed: informational.
- nested-changed: if any nested change classifies as breaking -> breaking; else if any nested is compatible -> compatible; else informational.

Rendering rules for text output (recommended exact format):
- Each ChangeRecord is rendered as a single line prefixed by classification in uppercase and the JSON Pointer path, e.g.
  - BREAKING /properties/id: property-removed
  - COMPATIBLE /properties/newField: property-added
  - INFO /properties/email: description-changed
- For nested-changed records include an indented block of nested lines immediately beneath the parent line.

Traversal rules and special cases:
- When diffing tuple-typed arrays (items as array), compare indexes by position; if lengths differ, extra indexes are treated as added/removed properties under '/items/N'.
- When encountering boolean schemas (true/false), prefer to treat them as base cases; true means no constraints (empty schema), false means impossible schema (reject all).
- When matching anyOf/oneOf alternatives, attempt structural equality heuristics; if ambiguous, fall back to index-based pairing.

DETAILED DIGEST
Sources: Draft-07 meta-schema (json-schema.org/draft-07/schema), JSON Schema structuring guidance (understanding-json-schema structuring), RFC 6901 for pointer semantics. npm page json-schema-diff attempted during crawl but returned 403; algorithmic choices were made from spec and community practice.
Retrieved: 2026-03-27
Bytes harvested during crawl: meta-schema 4979, structuring guidance 6407 (partial), RFC6901 4772; external npm package page returned 403.

ATTRIBUTION
Core design pulls from authoritative JSON Schema Draft-07 and RFC6901 (JSON Pointer). Community patterns (structuring guidance) inform normalization and inlining decisions. Data harvested during crawl is recorded above.
