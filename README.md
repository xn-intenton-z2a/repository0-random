# JSON Schema Diff Library

This repository implements a small library that computes structured diffs between two JSON Schema (Draft-07) documents.

Features
- Compare two JSON Schema objects and return an array of change records.
- Resolve local `$ref` JSON Pointers (remote refs are rejected).
- Classify changes as `breaking`, `compatible` or `informational`.
- Format changes as readable text or JSON.

Quick example

```js
import { diffSchemas, formatChanges } from './src/lib/main.js';

const before = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id', 'email']
};

const after = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // email removed
    age: { type: 'number' }
  },
  required: ['id']
};

const changes = diffSchemas(before, after);
console.log(formatChanges(changes));
// -> /properties/email: property removed (was required) (breaking)
// -> /properties/age: property added ({"type":"number"}) (compatible)
```

API
- diffSchemas(beforeSchema, afterSchema) -> Array of change records
- formatChanges(changes, opts = { style: 'text' }) -> string
- classifyChange(change) -> 'breaking' | 'compatible' | 'informational'

See `tests/unit/diff.test.js` for many usage examples and edge cases.
