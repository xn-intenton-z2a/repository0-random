# repo

This repository provides a small JavaScript library for computing Hamming distances between equal-length Unicode strings and non-negative integers (bitwise differences).

## API

Import from the library entry point:

```js
import { hammingDistanceStrings, hammingDistanceInts } from './src/lib/main.js';
```

Functions:

- hammingDistanceStrings(a, b)
  - a, b: strings
  - returns: number of differing Unicode code points at the same positions
  - throws TypeError if either argument is not a string
  - throws RangeError if strings have different lengths (measured in Unicode code points)

- hammingDistanceInts(a, b)
  - a, b: Number (integer) or BigInt
  - returns: number of differing bits between the two non-negative integers
  - throws TypeError if arguments are not integers
  - throws RangeError if either argument is negative

## Examples

```js
import { hammingDistanceStrings, hammingDistanceInts } from './src/lib/main.js';

console.log(hammingDistanceStrings('karolin', 'kathrin')); // 3
console.log(hammingDistanceStrings('', '')); // 0

console.log(hammingDistanceInts(1, 4)); // 2
console.log(hammingDistanceInts(0, 0)); // 0

// BigInt support
console.log(hammingDistanceInts(12345678901234567890n, 12345678901234567891n));
```

## Website demo

Open `src/web/index.html` in a modern browser (or run `npm run start`) to see a live demo using the library.

## License

MIT
