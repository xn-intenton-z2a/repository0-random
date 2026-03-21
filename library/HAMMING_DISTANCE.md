HAMMING_DISTANCE

Table of contents
1. Definition
2. Formula (mathematical)
3. String implementation (code-point aware)
4. Memory-efficient iteration pattern
5. Validations and errors
6. Complexity and performance
7. Examples (practical)
8. Supplementary details
9. Reference digest and attribution

1. Definition
Hamming distance between two sequences of equal length is the number of positions at which the corresponding symbols are different. For strings, the mission requires comparing Unicode code points (not UTF-16 code units).

2. Formula (mathematical)
Given two sequences x and y of length n, the Hamming distance d(x, y) is:

d(x, y) = sum_{i=0..n-1} 1 if x_i != y_i else 0

3. String implementation (code-point aware)
- Input types: both values must be strings (typeof === "string"). Non-strings must cause a TypeError.
- Code-point extraction: use Array.from(s) or the string iterator (for...of) to obtain UTF-16 surrogate-pair-aware code points. Do NOT use s.length (it counts code units).
- Exact implementation pattern (direct, readable):
  - arrA = Array.from(a)
  - arrB = Array.from(b)
  - if arrA.length !== arrB.length -> throw RangeError("Strings must contain same number of code points")
  - count = 0
  - for i from 0 to arrA.length-1: if arrA[i] !== arrB[i] then count++
  - return count

4. Memory-efficient iteration pattern
- To avoid allocating arrays for large strings, iterate both string iterators in lockstep:
  - itA = a[Symbol.iterator]() ; itB = b[Symbol.iterator]()
  - loop: rA = itA.next(); rB = itB.next();
    - if rA.done && rB.done -> break and return count
    - if rA.done || rB.done -> throw RangeError (unequal code-point lengths)
    - if rA.value !== rB.value -> count++
- This yields O(1) extra memory and O(n) time.

5. Validations and errors
- TypeError: if either argument is not a string.
- RangeError: if the two strings contain different numbers of Unicode code points (the code-point-aware length differs).
- The library must explicitly compare code points; grapheme cluster comparison (user-perceived characters) is out of scope unless the caller requests segmentation using Intl.Segmenter.

6. Complexity and performance
- Time: O(n) where n is the number of code points.
- Memory: O(n) if using Array.from; O(1) extra memory if using iterators as shown above.

7. Examples (practical)
- hammingDistanceStrings("karolin", "kathrin") -> 3
- hammingDistanceStrings("", "") -> 0
- hammingDistanceStrings("a\uD83D\uDE00", "a\uD83D\uDE01") where the emoji are different code points -> counts the differing code points (works with surrogate pairs)

8. Supplementary details
- Unicode vs grapheme clusters: the library compares code points. Two visually identical sequences with different combining marks will be counted as different unless pre-normalised by the caller using String.prototype.normalize.
- Normalisation: if callers need canonical equivalence, normalise inputs (e.g., a.normalize("NFC")) before computing the distance.

9. Reference digest and attribution
- Source: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 156,786
- Attribution: Wikipedia content licensed under CC BY-SA; consult the page for exact license and reuse terms.
