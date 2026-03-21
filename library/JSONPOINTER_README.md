TITLE: JSONPOINTER_README (node-jsonpointer)

TABLE OF CONTENTS
- Short summary
- API surface and signatures
- Semantics and extensions (append with '-')
- Usage examples (text-only)
- Digest
- Attribution and data size

NORMALISED EXTRACT
Short summary
- node-jsonpointer is a small utility implementing JSON Pointer semantics with convenience helpers for get, set and compile.

API surface and signatures
- jsonpointer.get(obj: any, pointer: string): any
  - Returns the value at pointer in obj or undefined if not present.
- jsonpointer.set(obj: any, pointer: string, value: any): void
  - Sets the value at pointer; if pointer resolves into an array position "/arr/-" some implementations append; node-jsonpointer supports using '-' to append to an array when setting.
- jsonpointer.compile(pointer: string): { get(obj: any): any, set(obj: any, value: any): void }
  - Pre-compiles a pointer for repeated use; returned object exposes get and set bound to the compiled token sequence.

Semantics and extensions
- get: resolves the pointer using RFC6901 unescaping rules and returns undefined when the path does not exist.
- set: if the pointer targets a numeric index that is in range, it replaces the item; if target index is '-' the library appends to the array (this is an extension beyond RFC6901, inherited from JSON Patch semantics).
- compile: performance optimization to avoid repeated tokenization/unescaping when performing many operations.

USAGE EXAMPLES (text-only)
- jsonpointer.get(obj, '/foo') returns primitive or object at property foo.
- jsonpointer.set(obj, '/qux/0', 42) sets first item of qux array to 42.
- jsonpointer.set(obj, '/qux/-', 6) appends 6 to array qux.

DIGEST
- Extracted usage patterns and signatures from the node-jsonpointer README to support implementing pointer-based resolution and set/get helpers in JavaScript.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Source: https://raw.githubusercontent.com/janl/node-jsonpointer/master/README.md
- Retrieved: 2026-03-21
- Bytes fetched: 1276 bytes
- Attribution: node-jsonpointer (Jan Lehnardt et al.), MIT License
