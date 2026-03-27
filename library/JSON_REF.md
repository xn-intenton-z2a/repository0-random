JSON_REF

NORMALISED EXTRACT

Table of contents
1. $ref semantics (Draft-07)
2. Local $ref resolution (JSON Pointer fragment semantics)
3. Resolution rules and replacement behavior
4. Error handling (remote refs, missing targets, cycles)

$key points
- The $ref keyword's value is a URI-reference. If the reference contains a fragment (the portion after '#'), the fragment is a JSON Pointer that selects a location within the target document.
- For this project only local $ref (fragment-only references that begin with '#') are in-scope. Encountering a non-fragment $ref (a reference with a scheme, host, or path) must be treated as an error and cause the diff engine to throw RemoteRefError.
- Semantics: a schema object whose only purpose is a $ref is considered a reference and, for validation, is replaced by the target schema. For resolution before diffing, implementations should replace the $ref node with a deep-copy of the resolved subschema.

Local $ref resolution steps (implementation)
1. Ensure $ref is a string. If it does not start with '#', throw RemoteRefError.
2. Extract fragment after '#'. If fragment is empty ("#" or "#"+empty) then target is the document root.
3. Pass the fragment (drop optional leading '/') as a JSON Pointer to resolve against the document root using resolvePointer(document, fragment).
4. If resolution succeeds, return a deep-cloned subschema; if it fails, throw PointerNotFoundError.
5. Track visited reference paths (set of pointer strings) during recursive resolution; if a pointer is seen twice on the same resolution stack, throw CircularRefError.

Merging and other keywords
- When a $ref is present in a schema object, per the specification the $ref acts as a complete replacement for that node. Do not attempt to merge sibling keywords with the referenced schema; treat siblings as inert for resolution.

SUPPLEMENTARY DETAILS
- Implementation pattern: prewalk the schema, detect $ref nodes, replace them with the resolved subschema, and continue walking the replaced content recursively until no local $ref remain.
- To avoid mutating the original input, construct a new schema object and copy-resolve nodes into it. Use a visited map keyed by JSON Pointer to detect cycles.

REFERENCE DETAILS (API)
- resolveLocalRef(rootSchema: Object, ref: string) -> Object
  - Parameters: rootSchema: the top-level schema document; ref: a $ref string beginning with '#'.
  - Returns: deep-cloned subschema object
  - Throws: RemoteRefError (if ref is not fragment-only), PointerNotFoundError, CircularRefError
- expandLocalRefs(schema: Object) -> Object
  - Parameters: schema: the schema (may be the root or a subschema)
  - Returns: a new schema object with all local $ref replaced inline
  - Behavior: throws on any non-fragment $ref encountered

DETAILED DIGEST
- Sources: JSON Schema "Structuring" and AJV refs guide (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data obtained during crawl: structuring page (~424.3 KB), AJV refs guide (HTML, inline retrieval)

ATTRIBUTION
- Understanding JSON Schema — Structuring: https://json-schema.org/understanding-json-schema/structuring.html
- Ajv ref handling guide: https://ajv.js.org/guide/refs.html
- Note: this document codifies local-only resolution rules for the mission; remote $ref must cause an explicit error in the diff engine.
