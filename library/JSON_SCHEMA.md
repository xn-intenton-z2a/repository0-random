TITLE: JSON_SCHEMA

TABLE OF CONTENTS
- Objects and properties
- Required
- Type
- Arrays and items
- Enum and const
- Combining keywords (allOf, anyOf, oneOf, not)
- References ($ref) and local resolution rules
- Diffing rules and change-type mapping
- Classification mapping (breaking / compatible / informational)
- Supplementary details
- Reference API signatures
- Digest
- Attribution and data size

NORMALISED EXTRACT
Objects and properties
- The "properties" keyword is an object mapping string property names to subschemas. Each properties.<name> is a full JSON Schema applied to the value at that property path.
- Additional properties may be controlled by "additionalProperties" which is either a boolean or a subschema. When diffing, only changes to explicit keys in "properties" produce property-added/property-removed; changes to additionalProperties are informational unless they remove a required property.

Required
- The "required" keyword is an array of unique string property names. A name present in before but missing in after is a required-removed; present in after but missing in before is required-added.
- Removing a required property that exists in the schema's "properties" is a breaking change.

Type
- The "type" keyword accepts either a single type string or an array of type strings. Valid atomic values (Draft-07) are: array, boolean, integer, null, number, object, string.
- When comparing types: if both are strings and differ => emit type-changed. If arrays, compute removed and added member types; any removal of a previously-only type that had been the sole accepted type should be treated as a type-changed or breaking depending on classification rules.

Arrays and items
- "items" may be a single schema (applies to all items) or an array of schemas (tuple validation). For tuple form, changes to a specific index's schema should be reported at path "/items/<index>" as nested-changed or type-changed where applicable.

Enum and const
- "enum" is an array of permitted values (unique, minItems 1). Detect enum-value-added and enum-value-removed by set difference between before and after.
- "const" is a single allowed value; any change is a breaking change if it reduces permitted values.

Combining keywords
- allOf: every subschema must validate. Represent as an ordered array of subschemas; a change to any subschema yields nested-changed under "/allOf/<index>". Removing an allOf subschema that previously enforced a constraint is potentially breaking.
- anyOf: at least one subschema must validate. Changes that remove the only subschema that allowed a valid instance are breaking; changes that add options are compatible.
- oneOf: exactly one subschema must validate; changes that increase ambiguity or remove the sole valid path may be breaking; treat as nested-changed per index.
- not: logical negation; changes may invert validation and are usually breaking.

References ($ref) and local resolution rules
- $ref is a string formatted as a URI reference. For this project, only local references are permitted: $ref values must be either a JSON Pointer fragment (starting with '#') or a URI whose fragment is a JSON Pointer inside the same document. Remote references (any $ref that includes a non-empty scheme or authority) are out of scope and must cause a thrown error.
- Before diffing two schemas, resolve all local $ref by replacing the $ref node with a deep copy of the target subschema. For resolution:
  - Take the substring after the first '#' (empty means root) and percent-decode it, then apply JSON Pointer unescaping (replace ~1 with / and ~0 with ~) and traverse the root document accordingly.
  - If the pointer does not resolve, throw an error during resolution — treat as a fatal parsing error.

Diffing rules and change-type mapping (implementation-first)
- property-added/property-removed: detect keys added or removed from the properties object at path "/properties". Change record path should be "/properties/<name>".
- type-changed: compare the effective "type" value(s) of a subschema after resolving $ref. Report before/after as canonical strings or arrays.
- required-added/required-removed: compare required arrays using set diff. Each added/removed item yields a separate change record with path "/required" and name in the record payload.
- enum-value-added/enum-value-removed: compare enum arrays using set diff; create one change record per value change with path "/enum".
- description-changed: compare description strings; report when different.
- nested-changed: when a subschema under a property or items differs structurally (other than atomic keyword changes above) produce a nested-changed record with a recursive diff stored in the "after"/"before" fields or a separate "diff" field.

Classification mapping
- Breaking: property-removed when property existed and was required; required-removed for a property that exists in the schema; type-changed that removes previously accepted types for existing instances; enum-value-removed that eliminates values previously allowed; changes to constraints that narrow validation.
- Compatible: property-added, enum-value-added, description-changed, additions to anyOf/allOf that expand valid instances.
- Informational: changes to descriptions, examples, or metadata-only keywords (title, $comment) unless they affect validation.

SUPPLEMENTARY DETAILS
- Resolve $ref before any structural comparison using a depth-first traversal; detect cycles and guard against infinite recursion by tracking resolved reference paths and throwing on cycle detection.
- When merging resolved subschemas for $ref replacement, preserve the reference target exactly; do not attempt shallow merges with sibling keywords unless implementing $ref override semantics (which are non-standard and not required here).
- When traversing arrays of subschemas (allOf/anyOf/oneOf), maintain index-stable change reporting: use array index positions in record paths.

REFERENCE API SIGNATURES (recommended SDK surface)
- diffSchemas(before: object, after: object): Array<ChangeRecord>
  - ChangeRecord: { path: string, changeType: string, before?: any, after?: any }
- renderChangesText(changes: Array<ChangeRecord>): string
- classifyChange(change: ChangeRecord): 'breaking' | 'compatible' | 'informational'
- resolveLocalRefs(schema: object): object  // returns a new schema with local $ref nodes replaced by resolved subschemas; throws on remote $ref or unresolved pointer
- resolvePointer(doc: object, pointer: string): any  // utility implementing RFC6901 semantics

DIGEST
- Extracted key implementation facts for JSON Schema validation/diffing: properties maps property names to subschemas; required is a unique string array; type accepts string or array; items accepts schema or schema array; combining keywords behave as logical combinators and must be traversed recursively for diffs; $ref uses URI fragment pointing to a JSON Pointer and must be resolved locally before diffing.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Source: https://json-schema.org/understanding-json-schema/
- Retrieved: 2026-03-21
- Bytes fetched: 81068 bytes
- Attribution: JSON Schema organization — "Understanding JSON Schema" tutorial
