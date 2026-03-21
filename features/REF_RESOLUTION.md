# REF_RESOLUTION

# Overview
Resolve local $ref JSON Pointers within the same document before diffing. Remote references are explicitly out of scope and must cause an error to surface to callers.

# Behaviour
- Provide a resolver that accepts a single schema object and returns a canonicalized schema where local $ref pointers are replaced with their target definitions or an equivalent inlined representation.
- The resolver must support JSON Pointer semantics for pointers beginning with # and must be able to resolve refs that appear inside properties, items, allOf, oneOf, and anyOf.
- Circular references must be detected and handled gracefully; the resolver should throw a clear error if a cycle cannot be safely inlined or should use a stable representation that prevents infinite recursion.
- If a $ref value does not start with a local pointer (does not begin with #) the resolver throws an informative error indicating remote refs are unsupported.

# API
- Export resolver utilities from src/lib/main.js so the public API remains a single module for consumers.
- Intended function name: resolveLocalRefs(schema) or an equivalent named export re-exported from main.js.

# Acceptance Criteria
- Local JSON Pointer $ref entries are resolved so the diff engine compares the actual target definitions rather than unresolved $ref placeholders.
- Resolver throws an exception for remote $ref values.
- Unit tests cover resolving refs in properties, items, nested allOf/oneOf/anyOf, and detection of circular refs that would otherwise cause infinite recursion.
