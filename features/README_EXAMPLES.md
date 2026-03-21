# README_EXAMPLES

Summary

Provide concrete, human-readable usage examples for the Hamming distance library in README.md and the site demo so users and tests can verify outputs quickly.

Behavior

- Add short, copy-pasteable examples for both string and bit Hamming distance in README.md (and the docs/site output) showing inputs and expected outputs on single lines.
- Examples must demonstrate Unicode handling by noting code-point comparison behavior.
- Examples should mirror the library API exported from src/lib/main.js (named exports hammingString and hammingBits).

Examples (present in README.md exactly as shown)

- hammingString("karolin", "kathrin") -> 3
- hammingString("", "") -> 0
- hammingBits(1, 4) -> 2
- hammingBits(0, 0) -> 0

Acceptance criteria

- README.md contains the four examples above and the text that the library exports named functions hammingString and hammingBits from src/lib/main.js.
- The README examples match the outputs produced by unit tests (so a human can verify correctness visually).
- The README explicitly states that string comparisons are Unicode code-point aware (not UTF-16 code units) and that bit distances accept non-negative integers (Number or BigInt) and throw RangeError for negatives and TypeError for invalid types.

Notes

- Keep examples minimal and exact so automated checks or visual inspection can validate them quickly.
- This feature is distinct from LIBRARY_API.md (which specifies the API surface); README_EXAMPLES focuses only on clear, testable usage examples.
