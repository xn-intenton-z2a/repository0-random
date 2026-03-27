# repo — JSON Schema Diff Demo

This repository contains a small JavaScript library that computes structured diffs between two JSON Schema (Draft-07 subset) documents.

## Features

- diffSchemas(before, after) -> ChangeRecord[]
- renderChanges(changes, { format: 'text' | 'json' })
- classifyChange(change) -> 'breaking' | 'compatible' | 'informational'
- Resolves local `$ref` pointers (starting with `#`) and throws on remote refs.

## Usage example

```js
import { diffSchemas, renderChanges, classifyChange } from './src/lib/main.js';

const before = {
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id: { type: 'string' },
    age: { type: 'number' },
    email: { type: 'string' }
  }
};

const after = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
    age: { type: 'string' }
    // email removed
  }
};

const changes = diffSchemas(before, after);
console.log(renderChanges(changes, { format: 'text' }));
console.log(JSON.stringify(renderChanges(changes, { format: 'json' }), null, 2));

for (const ch of changes) {
  console.log(ch.path, ch.changeType, classifyChange(ch));
}
```

Note: If a schema contains a remote `$ref` (for example `"$ref": "https://example.com/defs.json#/Foo"`) the library throws an error: `Remote $ref encountered: <ref>`.

## Website demo

Open `src/web/index.html` in a browser (the page imports the library directly) to try a small interactive demo.

## Documentation

See `docs/schema-diff.md` for the change record format and classification rules.
