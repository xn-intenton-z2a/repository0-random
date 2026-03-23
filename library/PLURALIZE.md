PLURALIZE

TABLE OF CONTENTS
1. Scope and goal
2. Deterministic pluralisation rules (implementation-ready)
3. Function signatures and behaviour
4. Edge cases and limitations
5. Reference details
6. Detailed digest
7. Attribution

NORMALISED EXTRACT:
Goal: provide a deterministic English pluralisation function covering regular rules (irregular forms out of scope). Apply the following ordered rules when pluralising a singular noun:
1) If word ends with s, x, z, ch, sh -> append 'es' (e.g., box -> boxes, bush -> bushes)
2) If word ends with consonant + 'y' -> replace 'y' with 'ies' (e.g., party -> parties)
3) If word ends with 'f' or 'fe' -> replace with 'ves' (e.g., leaf -> leaves, knife -> knives)
4) Otherwise append 's'
Return the plural form; input null/undefined -> ''

IMPLEMENTATION NOTES:
- Preprocess: w = String(input || '').trim()
- Case handling: preserve original case pattern if required (optional extension), or return lowercased result for deterministic comparisons.
- For 'f'/'fe' rule, ensure exceptions (roof -> roofs) are handled only when exception lists are present; without exceptions follow the rule generally.

FUNCTION SIGNATURES AND BEHAVIOUR:
- Name: pluralize
- Signature: pluralize(word: string | null | undefined) -> string
- Behaviour: returns plural according to deterministic rules above; empty string for null/undefined

EDGE CASES:
- Compound nouns (mother-in-law) not handled specially — apply rule to final word segment.
- Words already plural should be detected if desired (not implemented here).

DETAILED DIGEST (retrieved 2026-03-23):
- Rules condensed from common English pluralisation patterns and reference README material from pluralize implementations. Bytes retrieved during crawl: raw README fetched where available; otherwise canonical rules used.

ATTRIBUTION:
blakeembrey/pluralize and common English pluralisation rules
URL: https://github.com/blakeembrey/pluralize

