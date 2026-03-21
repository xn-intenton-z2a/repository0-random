# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot.

## Hamming distance library

This project implements Hamming distance utilities for both strings (Unicode-aware) and non-negative integers (bitwise).

API (named exports from src/lib/main.js):

- hamming(a: string, b: string): number
  - Computes the Hamming distance between two strings by comparing Unicode code points (uses the string iterator).
  - Throws TypeError if either argument is not a string.
  - Throws RangeError if the strings have different lengths (in code points).

- hammingBits(x: number|bigint, y: number|bigint): number
  - Computes the bitwise Hamming distance between two non-negative integers.
  - Accepts Number (integers) or BigInt; if one argument is BigInt both must be BigInt.
  - Throws TypeError for wrong argument types or non-integer numbers.
  - Throws RangeError for negative integers.

- getIdentity(), name, version, description — library identity helpers

Examples

```js
import { hamming, hammingBits } from './src/lib/main.js';

console.log(hamming('karolin', 'kathrin')); // 3
console.log(hamming('', '')); // 0
console.log(hammingBits(1, 4)); // 2
console.log(hammingBits(0, 0)); // 0
```

Browser demo

Open `src/web/index.html` in a modern browser. The page imports the library and displays example outputs for the Hamming functions.

Tests

Run unit tests:

```bash
npm test
```

Mission

This work implements the Hamming distance functionality required by the mission: Unicode-aware string comparisons, bitwise integer comparisons, input validation, exports, website demo, and unit tests.
