# REF_RESOLUTION

Summary

Specification for resolving local $ref pointers inside a JSON Schema document. The diff engine depends on resolved schemas to compare real shapes.

Specification

- Public function: resolveLocalRefs(schema) -> resolvedSchema.
- Behaviour: only support JSON Pointer local references that begin with a leading '#'. Follow JSON Pointer semantics to locate the referenced node inside the same document and replace the $ref node with the referenced schema (shallow copy as needed).
- Cycles: detect simple cycles and either break cycles by keeping a placeholder reference or throw a descriptive error to avoid infinite expansion. The unit tests must assert the chosen behaviour.
- Remote references: if a $ref value does not start with '#' (for example "http://..." or a file path), the resolver must throw an Error with a message that clearly states remote $ref is out of scope.

Public API (named export)

- resolveLocalRefs

Acceptance Criteria

- [ ] Resolves local JSON Pointer $ref values to the referenced subschema
- [ ] Throws a clear error when encountering a non-local (remote) $ref
- [ ] Unit tests cover nested pointers and a cycle detection case

Notes

- Keep the resolver deterministic and side-effect free: return a new resolved schema object instead of mutating the input in-place.