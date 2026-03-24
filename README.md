# String Utilities (repository0)

This repository implements a small library of string utility functions used by the agentic-lib missions.

Features implemented (exported from src/lib/main.js):

- slugify(str)
- truncate(str, maxLength, suffix = '…')
- camelCase(str)
- kebabCase(str)
- titleCase(str)
- wordWrap(str, width = 80)
- stripHtml(str)
- escapeRegex(str)
- pluralize(str)
- levenshtein(a, b)

Examples

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

slugify('Hello World!'); // 'hello-world'
truncate('Hello World', 8); // 'Hello…'
camelCase('foo-bar-baz'); // 'fooBarBaz'
kebabCase('fooBarBaz'); // 'foo-bar-baz'
titleCase('hello world'); // 'Hello World'
wordWrap('The quick brown fox jumps over the lazy dog', 12);
// 'The quick\nbrown fox\njumps over\nthe lazy dog'
stripHtml('<p>Hello &amp; <strong>World</strong></p>'); // 'Hello & World'
escapeRegex('^hello.$'); // '\\^hello\\.\\$'
pluralize('baby'); // 'babies'
levenshtein('kitten', 'sitting'); // 3
```

Edge cases

- All functions return an empty string when passed null or undefined (except levenshtein which treats null/undefined as empty strings and returns a number).
- Functions are Unicode-aware where applicable.

License: MIT
