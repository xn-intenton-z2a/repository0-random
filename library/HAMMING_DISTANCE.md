Title: HAMMING_DISTANCE

Table of contents
- Definition
- Mathematical formula and properties
- String-based Hamming distance (Unicode-safe)
- Integer/bit-level Hamming distance
- Complexity and performance
- Validation and error behavior (exact rules)
- Reference API signatures and usage patterns
- Examples
- Supplementary details
- Digest: source, retrieval date, bytes
- Attribution

Definition
The Hamming distance between two equal-length sequences is the number of positions at which the corresponding symbols are different. For bit-strings or non-negative integers represented in binary, it equals the number of differing bits.

Mathematical formula and properties
Given two sequences x and y of length n (indices 0..n-1), HammingDistance(x,y) = sum_{i=0..n-1} [x_i != y_i] where [·] is 1 if true else 0. Properties: non-negative, symmetric, zero iff sequences equal, satisfies triangle inequality when sequences are over same alphabet and compared position-wise.

String-based Hamming distance (Unicode-safe)
- Compare by Unicode code points (not UTF-16 code units). Treat each code point as one position.
- Implementation pattern: normalize both strings to NFC/NFKC if required by application semantics; obtain code point arrays via Array.from(string) or for...of iteration; let A = Array.from(a); let B = Array.from(b); if A.length != B.length throw RangeError; iterate indices and count positions where A[i] !== B[i].
- Exact validation rules: if typeof a !== 'string' or typeof b !== 'string' throw TypeError. If code-point-lengths differ throw RangeError.

Integer/bit-level Hamming distance
- For non-negative integers a and b, compute XOR = a ^ b then return popcount(XOR) (number of 1 bits).
- Numbers (JS Number): bitwise operators operate on signed 32-bit integers. For values that fit within 32 bits (0 <= a,b <= 0xFFFFFFFF) use Number XOR and 32-bit popcount.
- BigInt path: for integers potentially larger than 32 bits or safe integer range, accept BigInt or coerce: let A = BigInt(a); let B = BigInt(b); let X = A ^ B; compute popcount with: count = 0; while (X) { count++; X &= X - 1n }. Return Number(count).
- Validation rules: if arguments are not integers (Number with Number.isInteger or BigInt) or are negative, throw TypeError for wrong types and RangeError for negative values.

Complexity and performance
- String algorithm: O(n) time where n = number of code points; O(n) memory if using Array.from; O(1) extra memory if iterating both strings with iterators.
- Integer algorithm: cost proportional to number of set bits for Kernighan's method (popcount using x &= x-1) — O(k) where k is number of set bits; worst-case O(w) where w is bit-width (32 or number of bits in BigInt).

Reference API signatures and exact behavior
- hammingDistanceStrings(a: string, b: string): number
  - Throws TypeError if typeof a !== 'string' or typeof b !== 'string'.
  - Throws RangeError if code-point-lengths differ.
  - Returns 0..n integer count.
  - Implementation notes: use Array.from or a code-point iterator; do not use s.length for Unicode-sensitive length checks.

- hammingDistanceIntegers(a: number|bigint, b: number|bigint): number
  - Accepts either both Numbers or both BigInts. Mixed types are converted to BigInt and handled in BigInt path (explicitly documented).
  - If Number: require Number.isInteger(a) and Number.isInteger(b) and a >= 0 and b >= 0; if not, throw TypeError or RangeError.
  - If Number path and values <= 0xFFFFFFFF, compute x = a ^ b (32-bit JS semantics) then popcount using efficient 32-bit popcount.
  - For larger values or BigInt: coerce to BigInt and compute x = BigInt(a) ^ BigInt(b); compute popcount with loop using x &= x - 1n.
  - Returns a non-negative integer (Number). For large counts that exceed Number.MAX_SAFE_INTEGER the implementation documents behavior (return Number(count) if safe; otherwise throw or clamp — choose to return Number(count) up to safe limits; prefer using BigInt if huge counts expected).

Examples
- Strings: hammingDistanceStrings('karolin','kathrin') => 3
- Strings: hammingDistanceStrings('','') => 0
- Integers: hammingDistanceIntegers(1,4) => 2 (binary 001 vs 100)
- Integers: hammingDistanceIntegers(0,0) => 0

Supplementary details
- Unicode normalization: application must decide whether combining sequences should be normalized before comparison. The Hamming definition assumes position alignment; differing canonical forms will be counted as differences unless normalized.
- Iteration without full allocation: use iterators: let ai = a[Symbol.iterator](), bi = b[Symbol.iterator](); loop fetching next() values and compare; this avoids making intermediate arrays.

Digest
- Source: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 156656

Attribution
Content adapted and condensed from the Wikipedia article on Hamming distance (see source above). Data retrieved 2026-03-21; size 156656 bytes.
