NORMALISED EXTRACT

Table of contents
- Rules
- API signatures
- Input validation
- Algorithm (implementation steps)
- Complexity and performance

Rules
1. For integer i in the inclusive range 1..n: return a string per position.
2. If i divisible by 3 return Fizz.
3. If i divisible by 5 return Buzz.
4. If i divisible by both 3 and 5 return FizzBuzz.
5. Otherwise return the decimal representation of i as a string.

API signatures
- fizzBuzz(n) -> Array<string>
  - Behavior: returns array of length n (or empty array for n = 0) with elements produced by applying rules to each integer 1..n.
- fizzBuzzSingle(n) -> string
  - Behavior: returns the single Fizz/Buzz/FizzBuzz/string result for a single positive integer input.

Input validation
- Non-number or non-integer inputs: throw TypeError. Use Number.isInteger(n) to check integerness.
- Negative numbers: throw RangeError.
- Zero behavior: fizzBuzz(0) returns [] (empty array). fizzBuzzSingle(0) behaviour is not typical for mission but validate similarly: reject non-positive if mission requires; otherwise follow rules if 0 were allowed.

Algorithm (implementation steps)
1. Validate input type: if typeof n !== 'number' or !Number.isInteger(n) then throw new TypeError('n must be an integer').
2. Validate range: if n < 0 then throw new RangeError('n must be >= 0').
3. For fizzBuzz(n): if n === 0 return [] else allocate output array length n and iterate i from 1 to n; for each i compute fizzBuzzSingle(i) and assign to output[i-1]. Return output.
4. For fizzBuzzSingle(i): check divisibility in this order: if (i % 15 === 0) return 'FizzBuzz'; else if (i % 3 === 0) return 'Fizz'; else if (i % 5 === 0) return 'Buzz'; else return String(i).

Complexity and performance
- Time complexity: O(n) where n is the function argument for fizzBuzz.
- Space complexity: O(n) (result array).
- Implementation note: prefer simple for-loop for predictability and performance; Array.from with mapping is idiomatic but can allocate intermediate structures in some engines.

SUPPLEMENTARY DETAILS
- Use Number.isInteger to distinguish integers from floats and non-number values.
- Use modulus operator (%) with 15 to detect both-3-and-5 case; checking 15 first is more efficient than checking 3 and 5 separately.
- Avoid string concatenation inside tight loops where possible; assign computed string directly.
- Valid export pattern (ESM): export function fizzBuzz(n) { ... } export function fizzBuzzSingle(n) { ... }

REFERENCE DETAILS (signatures, exact patterns)
- Function signatures:
  - export function fizzBuzz(n) -> Array<string>
  - export function fizzBuzzSingle(n) -> string
- Validation checks (exact recommended implementation lines, presented as plain text):
  - if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('n must be an integer');
  - if (n < 0) throw new RangeError('n must be non-negative');
- Single computation order (exact pattern):
  - if (i % 15 === 0) return 'FizzBuzz'
  - else if (i % 3 === 0) return 'Fizz'
  - else if (i % 5 === 0) return 'Buzz'
  - else return String(i)
- Exporting from module: named exports are required by mission: export { fizzBuzz, fizzBuzzSingle } or export function definitions directly.

DETAILED DIGEST
Source: Wikipedia — Fizz buzz (retrieved 2026-03-21)
Crawl bytes: 63463
Extracted technical content (condensed): the canonical rules (multiples of 3 -> Fizz, multiples of 5 -> Buzz, multiples of both -> FizzBuzz) and common implementation approach: iterate 1..n and apply the rules producing a sequence. Example canonical check uses modulus operations; typical implementations prioritize the combined-check (15) before single divisibility checks.

ATTRIBUTION
Source URL: https://en.wikipedia.org/wiki/Fizz_buzz
Retrieved: 2026-03-21
Bytes retrieved: 63463
