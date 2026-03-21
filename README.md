# repo

A minimal library demonstrating Hamming distance utilities for strings and integers.

This repository provides two helpers:

- `hammingString(a, b)` — counts differing Unicode code points between two strings of equal length.
  - Throws `TypeError` if inputs are not strings.
  - Throws `RangeError` if strings have different lengths (measured in Unicode code points).

- `hammingBits(a, b)` — counts differing bits between two non-negative integers.
  - Throws `TypeError` if inputs are not integers.
  - Throws `RangeError` if either integer is negative.

Usage (Node / ESM):

```js
import { hammingString, hammingBits } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0

console.log(hammingBits(1, 4)); // 2
console.log(hammingBits(0, 0)); // 0
```

Browser (demo):

Open `src/web/index.html` in a browser (or run `npm run start`) to see a small demo that shows the library identity and example outputs.

License: MIT
