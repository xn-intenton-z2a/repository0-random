TITLE: AJV

TABLE OF CONTENTS
- Short summary
- Installation
- Core API signatures
- Options affecting schema resolution and validation
- $ref handling (local vs remote)
- Errors object shape
- Digest
- Attribution and data size

NORMALISED EXTRACT
Short summary
- Ajv is a fast JSON Schema validator supporting Draft-07 and later; main runtime API is Ajv constructor, compile, validate, addSchema, getSchema.

Installation
- npm install ajv

Core API signatures
- new Ajv(options?) : Ajv
- Ajv.prototype.addSchema(schema: object, key?: string) : Ajv
- Ajv.prototype.compile(schema: object) : ValidateFunction
- Ajv.prototype.validate(schemaOrKey: object | string, data: any) : boolean
- Ajv.prototype.getSchema(keyRef: string) : ValidateFunction | undefined
- Ajv.prototype.validateSchema(schema: object) : boolean
- ValidateFunction: (data: any) => boolean ; ValidateFunction.errors: Array<ErrorObject> | null

Options affecting schema resolution and validation
- allErrors: boolean — when true, collect all validation errors instead of stopping at first.
- loadSchema: (uri: string) => Promise<object> — optional async loader for remote $ref (not used for local-only resolution in this project).
- strict: boolean — enable strict schema validity checks (recommend true during development).

$ref handling (local vs remote)
- Ajv resolves $ref by schema id and registered schemas. Use addSchema(schema, key) to register a schema and make it addressable by $ref.
- Ajv supports asynchronous loading of remote references via loadSchema and addSchema; for this mission remote $ref are out of scope — throw or reject instead.
- For local $ref (fragment-only or fragment after same-document URI), Ajv expects registered schemas or inline resolution via compile; for deterministic diffing prefer pre-resolving local $ref before comparing.

Errors object shape
- ErrorObject fields commonly present: instancePath (string), schemaPath (string), keyword (string), params (object), message (string). ValidateFunction.errors holds array or null.

SUPPLEMENTARY DETAILS
- Ajv generates validation functions (compile) that can be reused; calling compile(schema) returns a function that validates data synchronously and populates validate.errors on failure.
- addSchema(schema, key) registers a schema under key; keys often are URI identifiers. getSchema(keyRef) returns compiled ValidateFunction for a registered schema.

REFERENCE DETAILS (exact signatures)
- constructor: new Ajv(options?: {allErrors?: boolean; strict?: boolean; loadSchema?: (uri: string) => Promise<object>; } ) : Ajv
- addSchema(schema: object, key?: string) : Ajv
- compile(schema: object) : ValidateFunction
- validate(schemaOrKey: object | string, data: any) : boolean
- getSchema(keyRef: string) : ValidateFunction | undefined
- validateSchema(schema: object) : boolean
- ValidateFunction: (data: any) => boolean ; ValidateFunction.errors: Array<{ instancePath: string; schemaPath: string; keyword: string; params: object; message?: string; }> | null

DIGEST
- Extracted API signatures and $ref handling notes from Ajv README (GitHub) and Ajv website to guide implementation choices for local $ref resolution and schema compilation.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Source: https://raw.githubusercontent.com/ajv-validator/ajv/master/README.md and https://ajv.js.org
- Retrieved: 2026-03-21
- Bytes fetched: README 13781 bytes; website 132862 bytes
- Attribution: Ajv project (epoberezkin and contributors), MIT License
