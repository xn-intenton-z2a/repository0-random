# VALIDATION

Summary
A feature to define exact validation and error semantics for the Hamming library so tests can rely on consistent exception types and conditions.

Specification
- Error types and when they are thrown:
  - TypeError:
    - String API: if either argument is not typeof string.
    - Integer API: if an argument is not a Number or BigInt, or a Number that is not an integer.
  - RangeError:
    - String API: if the two inputs have different Unicode code-point lengths.
    - Integer API: if any numeric input is negative.
- Messages: error message text may be implementation-defined; tests must rely on the error constructor (TypeError or RangeError) only.

Acceptance criteria
- Calling hammingDistanceStrings with non-string inputs throws TypeError.
- Calling hammingDistanceStrings with strings of different code-point lengths throws RangeError.
- Calling hammingDistanceIntegers with non-integer Number or non-numeric types throws TypeError.
- Calling hammingDistanceIntegers with negative numbers throws RangeError.

Notes
- The library must not return NaN or other sentinel values for invalid inputs; it must throw the specified error objects to make behavior explicit and testable.