TITLE: JSON_SCHEMA_DIFF

TABLE OF CONTENTS
- Short summary
- CLI usage
- Node API signature
- Change classification semantics
- Example inputs and outputs
- Additional settings and environment variables
- Digest
- Attribution and data size

NORMALISED EXTRACT
Short summary
- json-schema-diff is a language-agnostic CLI tool and Node.js API that computes what was added and what was removed between two JSON Schema (Draft-07) files. It returns additions and removals as JSON Schemas themselves.

CLI usage
- json-schema-diff /path/to/source-schema.json /path/to/destination-schema.json
- Output: two JSON Schemas: the values added and the values removed. The tool exits non-zero if removed differences are detected.

Node API signature
- const jsonSchemaDiff = require('json-schema-diff')
- result = await jsonSchemaDiff.diffSchemas({ sourceSchema: object, destinationSchema: object })
- Result object fields used in examples: result.removalsFound (boolean), result.additionsFound (boolean), and schemas representing additions/removals returned in the result payload.

Change classification semantics
- Addition: destination schema is more permissive (example: type: "string" -> type: ["string","number"]).
- Removal: destination schema is more restrictive (example: type: ["string","number"] -> type: "string").
- The tool returns added/removed schemas representing sets of values added or removed; removed result may be the literal false schema to indicate no values.

Example
- Source: { type: "string" }
- Destination: { type: ["string", "number"] }
- Added schema: { type: ["number"] }
- Removed schema: false

Additional settings
- Environment: JSON_SCHEMA_DIFF_APPLY_ABSORPTION_IN_CARTESIAN_PRODUCT (default true) — toggles an optimization to reduce memory by applying absorption laws in set calculations; may increase CPU use.

REFERENCE DETAILS (API signature)
- diffSchemas(opts: { sourceSchema: object; destinationSchema: object; }): Promise<{ additionsFound: boolean; removalsFound: boolean; additionsSchema?: object; removalsSchema?: object }>

DIGEST
- Extracted CLI and Node API usage and the core semantic rules for additions/removals from the json-schema-diff README and NPM registry.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Sources: https://registry.npmjs.org/json-schema-diff and https://bitbucket.org/atlassian/json-schema-diff/raw/master/README.md
- Retrieved: 2026-03-21
- Bytes fetched: registry JSON 101199 bytes; README 5293 bytes
- Attribution: json-schema-diff (Atlassian), Apache-2.0
