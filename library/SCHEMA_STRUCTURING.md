SCHEMA_STRUCTURING

NORMALISED EXTRACT

Table of contents
1. Modules and reuse ($id, $ref, definitions)
2. Best-practice structuring patterns
3. Scope and resolution order for $id and $ref
4. Practical advice for author's schemas

Modules and reuse
- Use definitions (or components) to keep reusable subschemas in one place and reference them with $ref using JSON Pointers (local) or URIs (remote, out-of-scope here).
- $id may be used to define a base URI for subschemas. For the purposes of local resolution in a single document, a well-placed $id changes the base for subsequent relative refs; however the mission restricts resolution to local JSON Pointer fragments only.

Best-practice patterns
- Keep definitions under a top-level "definitions" (or "$defs" in newer drafts) object and reference with "#/definitions/Name".
- Keep property-level schemas small and prefer referencing named definitions for complex structures.
- Avoid mixing local and remote $ref styles if the toolchain must operate offline.

Scope and resolution order (notes for implementers)
- When resolving references in an authoring environment, the nearest enclosing $id may establish a base URI for relative references; but for local fragment-only $ref resolution, treat the document root as the target base for JSON Pointers.

SUPPLEMENTARY DETAILS
- For the diff engine: adopt a pre-processing step that expands local $ref (fragment-only) and inlines referenced subschemas; document root is the resolution root.
- Keep a map of definition pointers to node locations to speed resolution during pre-walk.

DETAILED DIGEST
- Source: Understanding JSON Schema — Structuring (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data obtained during crawl: structuring page (~424.3 KB)

ATTRIBUTION
- URL: https://json-schema.org/understanding-json-schema/structuring.html
- Data size (crawl result): ~424.3 KB
