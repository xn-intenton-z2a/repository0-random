WORD_WRAP

TABLE OF CONTENTS
- Function signature
- Soft-wrapping algorithm (detailed)
- Edge cases and rules
- Complexity and performance
- Digest and retrieval metadata

NORMALISED EXTRACT
Function signature (descriptive): wordWrap(text, width = 80) -> string
Algorithm (soft wrap at word boundaries, do not break words):
1. If text is null/undefined, return empty string.
2. Split the input into paragraphs by existing line breaks; process each paragraph independently so existing explicit newlines are preserved.
3. For each paragraph: split on whitespace runs to get words. Iterate words and build a current line string. For each word:
   a. If current line is empty, set current line = word.
   b. Else if (current_line.length + 1 + word.length) <= width then append a single space + word to current line.
   c. Else push current line to output lines and set current line = word.
4. After processing all words push the final current line.
5. If a single word's length > width, place it on a line by itself unbroken.
6. Join output lines with '\n'.

EDGE CASES
- Preserve existing paragraph breaks; do not merge paragraphs.
- Treat sequences of whitespace as single separators when wrapping; but preserve single leading/trailing spaces within a paragraph only if explicit preservation is needed.
- Unicode: use measured string length in code points when width refers to characters; prefer codePoint-aware length calculations when supporting astral symbols.

PERFORMANCE
- Single-pass O(n) time relative to number of characters; O(n) memory for constructing output.

DIGEST (retrieved 2026-03-24)
- Source attempted: https://www.npmjs.com/package/word-wrap
- Note: npmjs.org returned an interactive/Cloudflare challenge page in this environment; package metadata was not directly retrievable. Bytes downloaded (challenge page): 7159. The algorithm above is a concise, dependency-free implementation matching common word-wrap packages.

ATTRIBUTION
- Source (attempted): npm word-wrap package
- Retrieved: 2026-03-24 (challenge page cached response)
- Bytes downloaded: 7159
