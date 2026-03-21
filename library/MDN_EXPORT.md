NORMALISED EXTRACT

Table of contents
- Export declaration forms
- Re-exporting and aggregation
- Import forms and resolution
- Module resolution in Node (type: module / .mjs)

Export declaration forms (technical details)
- Named export of declaration: export function name(args) { ... }
- Named export of existing binding: export { name } or export { name as alias }
- Named export of binding expression: export const name = expression
- Default export: export default expression
- Re-export: export { name } from './module.js'
- Re-export all: export * from './module.js'

Import forms (technical details)
- Named import: import { name } from './module.js'
- Default import: import defaultExport from './module.js'
- Namespace import: import * as ns from './module.js'
- Dynamic import: const mod = await import('./module.js')

Module resolution (Node / ESM specifics)
- Node requires either package.json with "type": "module" or the .mjs extension for files using import/export syntax.
- This repository already contains package.json with "type": "module" (ESM mode), so named exports and import paths must be valid ESM module specifiers (include file extension when required by loader).

REFERENCE DETAILS (exact signatures and behaviours)
- Export statements are static and create exported bindings, not copies; imported bindings reflect live values from the exporting module.
- Exact recommended API signatures for this mission (plain text):
  - export function fizzBuzz(n) -> Array<string>
  - export function fizzBuzzSingle(n) -> string
- Recommended module export pattern (plain text):
  - export { fizzBuzz, fizzBuzzSingle }
  - or define functions as: export function fizzBuzz(n) { ... }

DETAILED DIGEST
Source: MDN Web Docs — export (retrieved 2026-03-21)
Crawl bytes: 205607
Extracted technical content (condensed): full list of export syntaxes (named, default, re-export forms) and the runtime implications: exports create live bindings; module resolution rules for Node and browsers; import syntax variants and dynamic import behaviour.

ATTRIBUTION
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
Retrieved: 2026-03-21
Bytes retrieved: 205607
