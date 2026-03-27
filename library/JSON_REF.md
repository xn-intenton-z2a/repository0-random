NORMALISED EXTRACT

Table of contents:
- $ref allowed forms and mission constraint (local-only)
- Local resolution algorithm (JSON Pointer-based)
- Replacement semantics when inlining
- Cycle detection and recommended policy
- Dereference API signatures

$ref allowed forms and mission constraint
- $ref is a string representing a URI reference. For this project, only local references (fragment-only, i.e., strings beginning with '#') are supported. Any $ref not starting with '#' must cause the resolver to throw an UnsupportedRefError; remote fetching is out of scope.

Local resolution algorithm (implementation-ready):
1. Validate $ref is a string; if not, throw.
2. If $ref does not start with '#', throw UnsupportedRefError.
3. pointerText = $ref.substring(1). If pointerText is non-empty, percent-decode pointerText using UTF-8 percent-decoding.
4. If pointerText is empty, resolvedNode = rootSchema.
5. Else split pointerText on '/' into tokens; ignore the leading empty token from the initial '/'. For each token apply tilde-unescape: replace '~1' with '/' then '~0' with '~'.
6. Traverse the root schema using tokens: for object nodes, use token as key; for array nodes, parse token as integer index. If any step fails, throw RefNotFound.
7. Return deep-cloned resolvedNode (unless cycle policy preserves identity).

Replacement semantics
- The resolved schema node replaces the $ref node entirely; do not merge sibling keywords with the resolved target for evaluation.
- When inlining, perform deep clones of resolved nodes to prevent accidental shared mutation unless using identity-preserving cycle handling.

Cycle detection and policy
- Maintain a map of in-progress resolution paths during inlining. If a resolution attempts to re-resolve a path already in progress, a cycle exists. Recommended policies:
  - Preserve identity: when detecting a cycle, insert a reference pointer object that preserves identity instead of deep-cloning to avoid infinite recursion; or
  - Throw on cycle: detect and surface a clear CycleError if cycles are not supported.

Dereference API signatures (exact):
- resolveLocalRef(schema: object, ref: string): object | boolean
    - Throws UnsupportedRefError if ref is not local.
    - Throws RefNotFound if pointer path cannot be navigated.
    - Returns a deep clone of the referenced schema node.
- dereferenceSchema(schema: object): object
    - Walks the input schema and replaces all local $ref nodes with resolved nodes. Must preserve boolean schemas and handle cycles as per policy.

DETAILED DIGEST
Primary evidence: Draft-07 meta-schema declares $ref as type string with format uri-reference; pointer semantics must follow RFC 6901. Ajv user-guide page for refs attempted but returned 404 during crawl. Use meta-schema + RFC 6901 rules to implement deterministic local-only ref resolution.
Retrieved: 2026-03-27
Meta-schema bytes: 4979; RFC 6901 bytes: 4772; Ajv guide attempted: 404 Not Found.

ATTRIBUTION
Primary sources: json-schema.org (Draft-07 meta-schema) and RFC 6901 (JSON Pointer). Ajv guide fetch failed (404) during crawl.
