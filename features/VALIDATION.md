# VALIDATION

Summary
Defines exact validation and error semantics for the Hamming library so tests and consumers rely on consistent exception types.

Specification
- Error types and conditions:
  - TypeError:
    - String API: if either argument is not typeof string.
    - Integer API: if an argument is not a Number or BigInt, or if a Number argument is not an integer.
  - RangeError:
    - String API: if the two inputs have different Unicode code-point lengths.
    - Integer API: if any numeric input is negative.
- Error messages may vary; tests must assert the error constructor (TypeError or RangeError) rather than exact message text.

Acceptance criteria
- Calling hammingString with non-string inputs throws TypeError.
- Calling hammingString with strings of different code-point lengths throws RangeError.
- Calling hammingBits with non-integer Number or non-numeric types throws TypeError.
- Calling hammingBits with negative numbers throws RangeError.

Notes
- The library must throw the specified error objects and not return sentinel values like NaN for invalid inputs.
