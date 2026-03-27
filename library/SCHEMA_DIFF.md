SCHEMA_DIFF

NORMALISED EXTRACT

Table of contents
1. Purpose and output shape
2. Supported change types
3. Diffing strategy (walk, normalize, compare)
4. Edge cases and limitations

Purpose and output shape
- The goal: compute a structured array of change records between two JSON Schema Draft-07 documents where each record is an object with fields: path (JSON Pointer style), changeType (one of the supported strings), before, after.

Supported change types (canonical list for the engine)
- property-added
- property-removed
- type-changed
- required-added
- required-removed
- enum-value-added
- enum-value-removed
- description-changed
- nested-changed  (contains an array of nested change records)

Diffing strategy (recommended implementation)
1. Preprocess both documents:
   a. Validate both are JSON objects (or booleans) per Draft-07 top-level.
   b. Expand all local $ref (fragment-only) into inline subschemas, throwing on any remote $ref.
   c. Normalize equivalent shorthand forms (normalize "type" into array form; ensure "required" arrays are sorted; normalize "properties" to maps).
2. Walk both schemas in parallel using a deterministic order: properties (alphabetical), items (positional), combining keywords by index.
3. At each location emit change records for structural differences:
   - When a property key exists in B but not A -> property-added
   - When a property key exists in A but not B -> property-removed
   - When type arrays differ -> type-changed (classify by intersection semantics)
   - required arrays: compute added and removed entries
   - enum arrays: compute added and removed values
4. For nested differences, emit nested-changed with recursive change list.

Edge cases and limitations
- Remote $ref: out-of-scope; throw when encountered.
- Boolean schemas (true/false) must be normalized: true == accept-all schema, false == accept-none schema.
- Combining keywords (anyOf/oneOf/allOf) require recursive analysis: removing an option from anyOf/oneOf may be breaking when it eliminates previously-valid instances.

SUPPLEMENTARY DETAILS
- Change classification depends on semantics (see CHANGE_CLASSIFICATION and SEMVER documents for rules to map diffs to breaking/compatible/informational).
- For deterministic diffs, sort property keys and enum arrays prior to comparison.

DETAILED DIGEST
- Source(s): npm package page for json-schema-diff and project design notes (retrieved 2026-03-27)
- Observations: npmjs.com served a Cloudflare interstitial during crawl; full API extraction was blocked by automated challenge. Use local package README when available, or rely on in-repo spec for change record shape.
- Retrieved date: 2026-03-27
- Crawl note: npm page returned Cloudflare challenge HTML; API details could not be reliably scraped in this run.

ATTRIBUTION
- URL: https://www.npmjs.com/package/json-schema-diff (cloudflare-protected on crawl)
- Data size (observed HTML): small HTML interstitial (Cloudflare challenge)
