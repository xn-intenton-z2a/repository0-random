# repo

This repository implements a small library that computes structured diffs between two JSON Schema (Draft-07) documents.

## Features implemented

- diffSchemas(oldSchema, newSchema): returns an array of change records describing differences between schemas
- resolveLocalRefs(schema): resolves local JSON Pointer $ref values (throws on remote $ref)
- classifyChange(change): returns "breaking" | "compatible" | "informational"
- formatChanges(changes): human-readable text formatter

All public API is exported as named exports from `src/lib/main.js` and re-exported for the website via `src/web/lib.js`.

## Quick example

```js
import { diffSchemas, formatChanges } from './src/lib/main.js';

const before = {
  type: 'object',
  properties: {
    email: { type: 'string' }
  },
  required: ['email']
};

const after = {
  type: 'object',
  properties: {
    email: { type: 'number' },
    name: { type: 'string' }
  },
  required: ['email', 'name']
};

const changes = diffSchemas(before, after);
console.log(formatChanges(changes));
// Output includes:
// - [breaking] type-changed at /properties/email
// - [compatible] property-added at /properties/name
```

See `tests/unit/diff.test.js` for more examples and expected behaviours.
