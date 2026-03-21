REF_PARSER

NORMALISED EXTRACT

Table of contents
- Features
- Core operations and effects
- Options that affect dereferencing and bundling
- Resolution behaviors (local vs remote, JSON/YAML, circular refs)
- Runtime requirements and polyfills

Features
- Purpose: Parse, resolve, and dereference JSON Schema $ref pointers into usable JavaScript objects.
- Supports JSON and YAML input; can mix both formats in a single resolution run.
- Supports external file and URL references as well as custom resolution plugins.
- Provides two primary consolidation modes: bundling (produce schema with only internal $refs) and dereferencing (replace $refs with concrete targets).
- Handles circular references, nested references, back-references, and cross-file references while preserving object identity (the same referenced value resolves to the same JS object instance).

Core operations and effects
- dereference(schema[, options])
  - Effect: Walks the schema tree, follows $ref pointers, and replaces each $ref with a reference to the target value.
  - Mutation: By default the input schema object is modified in place; the returned value is a reference to the same mutated object.
  - Option to avoid mutation: passing mutateInputSchema: false returns a dereferenced copy while preserving the original unchanged.
- bundle(schema[, options])
  - Effect: Produces a single schema document in which external $ref pointers are replaced by internal $ref pointers pointing to bundled definitions; the bundle still contains $ref pointers but none pointing to external documents.

Options that affect dereferencing and bundling (observed option names and effects)
- mutateInputSchema: boolean
  - Default: true (input schema is mutated)
  - When false: method returns a new object and original schema is left unchanged.
- custom resolvers/plugins
  - Custom resolvers can be registered to resolve $refs from non-HTTP/file sources (databases, custom storage).

Resolution behaviors
- Local $ref resolution: resolves JSON Pointer fragments within the same document by parsing the fragment as a JSON Pointer and locating the target value.
- Remote $ref resolution: URL references are fetched using standard HTTP retrieval (uses global fetch in modern runtimes); Node.js environments prior to Node 18 require a fetch polyfill.
- Format handling: YAML sources are parsed and treated equivalently to JSON; YAML-to-JS parsing is done before resolution.
- Circular references: Dereferencing preserves circular structures; references that point back to already-resolved objects will reuse existing object references rather than duplicating data.

Runtime requirements and polyfills
- Requires fetch or equivalent to retrieve remote URLs; for Node < 18 the README recommends providing a fetch polyfill (for example node-fetch) and assigning it to globalThis.fetch.
- Works in browser and Node environments; building for browser with bundlers may require polyfills and minor bundler configuration (e.g., path-browserify for Webpack when core node modules are used).

SUPPLEMENTARY DETAILS

Resolution algorithm (summary, implementation-relevant)
- Traverse schema tree depth-first, inspect every object for a $ref property.
- For each $ref encountered:
  - If $ref value starts with '#', parse the fragment as a JSON Pointer and resolve within the current (already-parsed) document.
  - If $ref value is a relative or absolute file path, resolve path against the base URI of the current document and load the target file content.
  - If $ref value is an HTTP(S) URL, fetch the target document content and parse it (supporting JSON or YAML).
  - Maintain a resolution cache keyed by fully-resolved URI + fragment to prevent duplicate downloads and to correctly detect and preserve circular references.
- When dereferencing, replace the $ref node with the resolved target object but ensure that multiple $ref entries that resolve to the same target reference the same JavaScript object (object identity preservation).

Error conditions relevant to implementation
- Remote fetch failures should raise/reject with an informative error indicating the failing URI and the upstream HTTP/IO error.
- If a resolver plugin returns no value for a given reference, treat as unresolved and surface an error.
- For the mission scope (local-only $ref resolution), implementations should detect remote scheme prefixes (http:, https:, git:, file:) and throw when a non-local (non-# and non-relative-local-file) $ref is encountered, unless explicitly supported.

REFERENCE DETAILS (API patterns and concrete options)

Observed usage pattern from README (Promise-based):
- import $RefParser from "@apidevtools/json-schema-ref-parser"
- await $RefParser.dereference(schema)

Concrete behavior and parameters to mirror when implementing local-only resolver:
- dereference(schema, options?) -> Promise<schema>
  - options.mutateInputSchema: boolean (default true). When false, return a new dereferenced schema without mutating the original.
  - returns: a Promise resolving to the dereferenced schema object (same reference as input when mutated in place).
- bundle(schema, options?) -> Promise<schema>
  - produces a single schema with external refs converted to internal refs; useful when consuming validators that cannot reach external URIs.
- resolve and parse phases (conceptual, not strict signatures):
  - parse: read and parse JSON/YAML content into JS objects
  - resolve: walk $ref pointers and produce mapping from ref URI to target object

Implementation best-practices (concrete patterns)
- Maintain a map keyed by absolute URI + fragment to the resolved object for both performance and correct circular reference handling.
- When resolving a local JSON Pointer, use RFC6901 semantics: unescape ~1 to / and ~0 to ~, and walk the object path segments sequentially.
- Normalize base URIs when resolving relative file references using standard URL resolution: join the ref against the baseURI of the containing document.
- Provide explicit guard for remote refs: if the ref URI contains a scheme (http, https, ftp, git, etc.) then throw an UnsupportedRefError (mission scope) or allow resolution if the implementation intends to support remote refs.

DETAILED DIGEST

Source: https://raw.githubusercontent.com/APIDevTools/json-schema-ref-parser/master/README.md
Retrieved: 2026-03-21
Bytes fetched: 6221

Top-level summary from source: JSON Schema $Ref Parser is a robust resolver and dereferencer for JSON Schema $ref pointers supporting JSON and YAML, remote and local references, bundling, dereferencing, and plugin resolvers; example usage shows await $RefParser.dereference(mySchema) and the mutateInputSchema option to avoid in-place mutations.

ATTRIBUTION
- Authoritative package: APIDevTools/json-schema-ref-parser (README)
- URL: https://raw.githubusercontent.com/APIDevTools/json-schema-ref-parser/master/README.md
- Retrieved: 2026-03-21
- Size: 6221 bytes

USAGE NOTE FOR THIS MISSION
- For the mission requirement of "resolve local $ref pointers and throw on remote $ref", adopt the dereference algorithm above but detect remote URL schemes and throw an explicit error when non-local refs are encountered. Preserve object identity and implement mutateInputSchema option behavior to avoid surprising callers.
