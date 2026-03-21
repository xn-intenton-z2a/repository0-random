# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot.

## Hamming distance functions

The library exports two Hamming distance helpers:

- `hammingString(a, b)` — counts differing Unicode code points between two strings of equal length.
  - Throws `TypeError` if inputs are not strings.
  - Throws `RangeError` if strings have different lengths (measured in Unicode code points).

- `hammingBits(a, b)` — counts differing bits between two non-negative integers.
  - Throws `TypeError` if inputs are not integers.
  - Throws `RangeError` if either integer is negative.

Examples (Node/Esm):

```js
import { hammingString, hammingBits } from './src/lib/main.js';

console.log(hammingString('karolin', 'kathrin')); // 3
console.log(hammingString('', '')); // 0

console.log(hammingBits(1, 4)); // 2
console.log(hammingBits(0, 0)); // 0
```

Browser (the demo page at `src/web/index.html` shows these functions in action):

```html
<script type="module">
  import { hammingString, hammingBits } from './lib.js';
  console.log(hammingString('karolin', 'kathrin'));
  console.log(hammingBits(1,4));
</script>
```

## Getting Started

Follow the original Getting Started instructions in this README for setup and testing.

(Other documentation unchanged.)
