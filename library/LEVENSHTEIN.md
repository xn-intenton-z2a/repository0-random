LEVENSHTEIN

TABLE OF CONTENTS
1. Definition
2. Standard dynamic programming algorithm
3. Space-optimized algorithm (two-row)
4. Complexity
5. Implementation notes and Unicode handling
6. Reference details
7. Detailed digest
8. Attribution

NORMALISED EXTRACT:
Definition: The Levenshtein distance between strings a (length m) and b (length n) is the minimum number of single-character edits (insertions, deletions or substitutions) required to change a into b.

STANDARD DYNAMIC PROGRAMMING (DP) ALGORITHM (pseudocode):
- Create (m+1) x (n+1) matrix d
- Initialize d[i][0] = i for i in 0..m, d[0][j] = j for j in 0..n
- For i from 1..m:
    For j from 1..n:
      cost = (a[i-1] == b[j-1]) ? 0 : 1
      d[i][j] = min(d[i-1][j] + 1,      // deletion
                    d[i][j-1] + 1,      // insertion
                    d[i-1][j-1] + cost) // substitution
- Result: d[m][n]

SPACE-OPTIMIZED (two-row) ALGORITHM (pseudocode):
- Let prev[0..n] and curr[0..n]
- Initialize prev[j] = j for j in 0..n
- For i from 1..m:
    curr[0] = i
    for j from 1..n:
      cost = (a[i-1] == b[j-1]) ? 0 : 1
      curr[j] = min(prev[j] + 1, curr[j-1] + 1, prev[j-1] + cost)
    swap(prev, curr)
- Return prev[n]

COMPLEXITY:
- Time: O(m * n)
- Space: O(min(m, n)) if using the two-row optimization (or O(n) for the above where n = length of shorter string when swapped accordingly).

IMPLEMENTATION NOTES:
- Coerce inputs: a = String(a || ''), b = String(b || '') to satisfy null/undefined rules.
- Unicode: decide whether to compare by code unit (default JS string index) or by Unicode code points (use Array.from(string) to iterate code points) when surrogate pairs and combining sequences must be treated as single user-perceived characters.
- For most ASCII and simple Unicode cases, code unit comparison is acceptable; for correct user-perceived edit distance, use code-point aware iteration.

REFERENCE DETAILS:
- Helper spec: levenshtein(a: string | null | undefined, b: string | null | undefined) -> number
- Behaviour: returns integer edit distance; null/undefined treated as empty string

DETAILED DIGEST (retrieved 2026-03-23):
- Algorithm description and optimization strategies taken from the Levenshtein Wikipedia article. Bytes retrieved during crawl: 228.2 KB.

ATTRIBUTION:
Wikipedia — Levenshtein distance
URL: https://en.wikipedia.org/wiki/Levenshtein_distance

