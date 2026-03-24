Title: LEVENSHTEIN

Source: Wikipedia — Levenshtein distance
URL: https://en.wikipedia.org/wiki/Levenshtein_distance
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src5.html)

Table of contents:
- Definition
- Wagner–Fischer algorithm (dynamic programming)
- Algorithmic complexity and memory
- Implementation details and edge cases

Normalised extract (technical points):
Definition
Levenshtein distance is the minimal number of single-character edits (insertions, deletions, substitutions) required to change one string into another.

Wagner–Fischer algorithm (DP)
- Use a matrix d of size (m+1) x (n+1) where m = a.length, n = b.length.
- Initialize: d[i][0] = i; d[0][j] = j
- Recurrence: for i=1..m, j=1..n:
    cost = (a[i-1] === b[j-1]) ? 0 : 1
    d[i][j] = min(d[i-1][j] + 1,          // deletion
                  d[i][j-1] + 1,          // insertion
                  d[i-1][j-1] + cost)     // substitution
- Result: d[m][n]

Optimizations
- Only keep two rows to reduce memory to O(min(m,n)).
- If Unicode and codepoints matter, operate on arrays of code points (Array.from(str) or [...str]) to avoid splitting surrogate pairs.

Reference details (implementation-ready):
- levenshtein(a: string, b: string): number
  - Handle null/undefined: treat as empty string
  - Use code points: const A = Array.from(a || ''); const B = Array.from(b || '');
  - Use two-row DP to compute distance; return integer distance.
- Example: levenshtein('kitten','sitting') => 3

Detailed digest:
- Extracted algorithmic steps and memory/optimization advice from Wikipedia Levenshtein distance page (retrieved 2026-03-24). HTML saved to /tmp/src5.html.

Attribution:
Wikipedia — Levenshtein distance. URL as above. Data fetched on 2026-03-24.
