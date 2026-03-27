JSON_SCHEMA

NORMALISED EXTRACT

Table of contents
1. Core keywords and types (properties, type, items, required, enum, const)
2. Structural keywords (properties, patternProperties, additionalProperties, dependencies)
3. Combining keywords (allOf, anyOf, oneOf, not)
4. Array keywords (items, additionalItems, contains, minItems, maxItems, uniqueItems)
5. Validation semantics relevant to diffing

Core keywords (concise semantics)
- type: string or array of strings. Allowed simple types: array, boolean, integer, null, number, object, string. When type is an array, an instance is valid if its runtime type matches any listed type.
- properties: an object mapping property names to subschemas. Evaluation: for an object instance, apply the named subschema to the named property value when present.
- required: an array of property names; instance is invalid if any listed property is absent.
- enum: array of values. Instance must equal one of the enum entries.
- const: single value; instance must be strictly equal to it.

Structural keywords
- additionalProperties: boolean or schema. If boolean false and an instance object contains properties not listed in properties/patternProperties, validation fails.
- patternProperties: object where keys are regex patterns; each matching property must validate against the associated schema.
- dependencies: property dependencies can be either a list of required properties or a schema that must validate when the key exists.

Combining keywords
- allOf: an array of schemas. Instance must validate against every subschema.
- anyOf: an array of schemas. Instance must validate against at least one subschema.
- oneOf: an array of schemas. Instance must validate against exactly one subschema.
- not: a single schema. Instance must NOT validate against the subschema.

Array handling
- items: may be a schema (applies to all elements) or an array of schemas (positional validation). If items is an array and additionalItems is false, instance arrays longer than items.length are invalid.

Validation semantics relevant to diffing
- required presence: if a property moves from optional to required (i.e., added to required array), that is a breaking change for clients that do not send the property.
- property removal: removing a property from properties is breaking only if clients relied on it being present or it was required; generally property removal is breaking.
- type narrowing: when the set of allowed instance types shrinks such that the intersection of old and new allowed types is empty for some instance shapes, treat as breaking.
- enum changes: removing an allowed enum value is breaking; adding a value is compatible.

SUPPLEMENTARY DETAILS
- Normalization helpers for code:
  - normalizeType(schema) -> Array<string>
  - getPropertySchema(schema, path) -> subschema or null
  - isRequired(schema, propertyName) -> boolean
- When resolving $ref before diffing, treat all $ref replacements as deep copies so comparisons operate on concrete schemas.

REFERENCE DETAILS (API used by the diff engine)
- extractProperties(schema) -> Map<string, subschema>
  - Returns the explicit properties object from a schema, or empty map if none.
- compareRequiredArrays(beforeRequired, afterRequired) -> {added:[], removed:[]}
- compareTypes(beforeType, afterType) -> {compatibility: 'breaking'|'compatible'|'informational', reason: string}

DETAILED DIGEST
- Source: JSON Schema Draft-07 meta-schema and draft-07 validation pages (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data obtained during crawl: draft-07 meta-schema (JSON), draft-07 validation (approx 90.9 KB)

ATTRIBUTION
- JSON Schema Draft-07 meta-schema: https://json-schema.org/draft-07/schema
- Draft-07 Validation: https://json-schema.org/draft-07/json-schema-validation.html
- Data sizes (crawl): meta-schema (inline JSON), validation page (~90.9 KB)
