TITLE: DRAFT_07

TABLE OF CONTENTS
- Meta-schema definitions
- Core keyword types and shapes
- simpleTypes enumeration
- SchemaArray and StringArray definitions
- Properties and required shape
- Combining keywords
- $ref and URI formats
- Digest
- Attribution and data size

NORMALISED EXTRACT
Meta-schema
- Draft-07 core meta-schema (http://json-schema.org/draft-07/schema#) defines canonical shapes for schema keywords. Key definitions useful for implementation:
  - definitions.schemaArray: an array of 1+ items where each item is a schema ("$ref": "#").
  - definitions.nonNegativeInteger and nonNegativeIntegerDefault0 for numeric constraints.
  - definitions.simpleTypes: enum of allowed type strings: array, boolean, integer, null, number, object, string.
  - definitions.stringArray: array of strings, uniqueItems true, default [].

Core properties (as defined in the meta-schema)
- $id: string with format uri-reference
- $schema: string with format uri
- $ref: string with format uri-reference
- $comment/title/description: strings
- default: any
- readOnly/writeOnly: boolean
- examples: array of any
- numeric keywords: multipleOf, maximum, exclusiveMaximum, minimum, exclusiveMinimum
- string length/pattern: maxLength, minLength, pattern
- array/object structure: additionalItems, items, maxItems, minItems, uniqueItems, contains; maxProperties, minProperties, required (stringArray), additionalProperties, definitions, properties, patternProperties
- dependencies: object whose additionalProperties is anyOf(schema, stringArray)
- const and enum: const for single value; enum is array of distinct values minItems 1
- type: anyOf(simpleTypes, array of simpleTypes) — this establishes that type may be single or multiple
- format/contentMediaType/contentEncoding: strings
- conditional keywords: if, then, else
- composition: allOf, anyOf, oneOf (schemaArray), not

SUPPLEMENTARY DETAILS
- The meta-schema uses "$ref": "#" to refer to the root schema definition; this implies recursive schema shapes and requires the implementation to handle nested schemas as full schemas.
- Required is defined as a stringArray (array of strings, uniqueItems true). When computing diffs, treat required arrays as sets.
- Items can be either a single schema or an array of schemas (tuple form); the meta-schema encodes this via anyOf.

REFERENCE DETAILS (exact shapes)
- simpleTypes enum values: array, boolean, integer, null, number, object, string
- schemaArray: type array, minItems 1, items: $ref="#"
- stringArray: type array, items: {type: string}, uniqueItems: true, default: []
- required: $ref="#/definitions/stringArray"
- properties: type object, additionalProperties: $ref="#"
- definitions: type object, additionalProperties: $ref="#", default: {}
- items: anyOf [ $ref="#", $ref="#/definitions/schemaArray" ]

DIGEST
- Extracted canonical keyword shapes from Draft-07 meta-schema, confirming implementation invariants: type can be atomic or array, properties and definitions map names to full subschemas, required is a unique string array, and composition keywords accept arrays of schemas.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Source: https://json-schema.org/draft-07/schema
- Retrieved: 2026-03-21
- Bytes fetched: 4979 bytes
- Attribution: JSON Schema draft-07 core meta-schema
