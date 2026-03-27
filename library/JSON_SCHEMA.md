NORMALISED EXTRACT

Table of contents:
- Meta-schema shape and top-level schema types
- Core validation keywords and their value types
- Object keywords: properties, required, additionalProperties, patternProperties, dependencies
- Array keywords: items, additionalItems, contains, uniqueItems, maxItems/minItems
- Combining keywords: allOf, anyOf, oneOf, not, if/then/else
- Reference and resolution: $ref, $id, $schema

Meta-schema shape and top-level types:
The Draft-07 meta-schema is itself a JSON Schema and accepts either an object or a boolean at any schema location. The metaschema defines primitive type names and several reusable definitions. Key implementation facts:
- Schema nodes may be boolean (true = always valid, false = always invalid); code must accept boolean schema nodes when traversing or inlining refs.
- Allowed simple types: array, boolean, integer, null, number, object, string. Treat integer as a numeric subtype for value classification.
- The type keyword accepts either a single string or an array of strings; normalize to an array for comparison.

Core validation keywords (implementation details):
- type: string | array<string>. For validation, test instance runtime type against any member.
- enum: array with minItems 1 and uniqueItems true; validation is strict equality against any member.
- const: exact match to a single value.
- numeric: multipleOf (number, exclusiveMinimum 0), maximum, minimum, exclusiveMaximum, exclusiveMinimum.
- string: maxLength/minLength (nonNegative integers), pattern (ECMA-262 regex). Implementations should validate pattern using ECMAScript compatible regex engine.
- arrays: items (schema or schema array), additionalItems (schema), contains (schema), uniqueItems (boolean), maxItems/minItems.
  - If items is a single schema, apply it to every array element.
  - If items is an array (tuple typing), apply by index; additionalItems governs elements with index >= items.length.
- objects: properties (map<string, schema>), required (array<string>), additionalProperties (schema|boolean), patternProperties (map<regex, schema>), dependencies (map<string, schema | string[]]), propertyNames (schema). Default values: properties/patternProperties/definitions default to {}.

Combining keywords and conditionals:
- allOf: array of schemas; merge logic for diffing: compare each subschema or match by structural equality when possible.
- anyOf/oneOf: alternative validation sets; for diffing attempt best-effort matching of corresponding subschemas; unmatched alternates are added/removed.
- not: negation of subschema validation; diffs involving not are best handled as nested-changed entries.
- if/then/else: conditional validation. For diffing, treat if/then/else as three subschemas and diff them by position.

Reference and resolution (high-level):
- $ref is declared as a string with format uri-reference. When $ref begins with '#', the fragment is a JSON Pointer (RFC 6901) and must be resolved locally. Resolution replaces the $ref node with the referenced schema node for validation and for diffing purposes. For mission scope: remote $ref values (not starting with '#') are unsupported and must cause the resolver to throw an error.

SUPPLEMENTARY DETAILS

Boolean schemas:
- true acts as permissive schema; false rejects all instances. When inlining or canonicalizing, preserve boolean schemas.

Type handling:
- Canonicalize type to array form: if type is a string, convert to [type]. This simplifies equality checks and diff logic.
- Consider integer as subset of number; the default diff classifier treats any change to the type set as a breaking change.

Items (tuple vs homogeneous arrays):
- When items is an array: apply per-index schema. additionalItems governs further items; default is an empty schema (allow any) when not present.

REFERENCE DETAILS (exact keywords and shapes)

Meta-schema-derived definitions used by implementations:
- simpleTypes enum: [array, boolean, integer, null, number, object, string]
- stringArray: type: array, items: { type: string }, uniqueItems: true, default: []
- nonNegativeInteger/Default0 definitions for max/min lengths and counts.

Canonical shapes the implementation should expect and normalize to:
- properties: object with additionalProperties = schema
- required: array<string> (default [])
- items: schema | schema[] (schemaArray requires minItems 1 when array form used)
- enum: array (minItems 1, uniqueItems true)

DETAILED DIGEST
Source: https://json-schema.org/draft-07/schema
Retrieved: 2026-03-27
Bytes obtained: 4979
Extracted: meta-schema JSON fragment including definitions schemaArray, nonNegativeInteger, nonNegativeIntegerDefault0, simpleTypes and stringArray plus detailed property declarations for top-level keywords. Use the meta-schema definitions to normalize schema documents before performing comparisons (inline local refs, normalize types, ensure required is array, ensure properties is an object).

ATTRIBUTION
Original source: json-schema.org (Draft-07 meta-schema). Data harvested during crawl: 4979 bytes.
