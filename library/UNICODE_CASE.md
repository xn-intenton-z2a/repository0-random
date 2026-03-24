UNICODE_CASE

TABLE OF CONTENTS
- Purpose and scope
- Case mapping rules (practical)
- Special-case examples
- Implementation guidance (use of locale and full case folding)
- Reference details and artifacts
- Digest and retrieval metadata

NORMALISED EXTRACT
- Unicode case mappings are not always 1:1; some characters map to multi-character sequences when changing case (for example, German ß -> "SS" in uppercase). Locale-specific rules exist (Turkish dotted/dotless I) and must be handled via locale-aware APIs when required.
- For robust, language-independent equality checks, use Unicode case folding (CaseFolding.txt) which provides mappings appropriate for case-insensitive matching.

IMPLEMENTATION GUIDANCE
- For display-case transformations, prefer toLocaleLowerCase/toLocaleUpperCase with the relevant locale when language-specific behaviour is desired (e.g., toLocaleLowerCase('tr'))
- For case-insensitive comparisons where a single canonical mapping is desired, implement full case folding using Unicode CaseFolding.txt and apply the mappings to input strings before comparison.
- When implementing case folding in JavaScript, consider using a precomputed mapping table or a library that exposes full Unicode case folding data; simple toLowerCase may suffice for many Latin-only cases but will fail for special mappings and multi-character expansions.

SPECIAL CASES
- Turkish/Azeri dotted/dotless I: 'I' <-> 'ı' and 'İ' <-> 'i' differ from default mappings.
- German sharp s (ß): uppercasing may produce 'SS' depending on mapping and locale.

REFERENCE DETAILS
- Authoritative resource: Unicode Standard Annex #21 / TR21 (Case Mappings) and CaseFolding.txt in Unicode data files. These resources provide exact mapping tables and rules.

DIGEST (excerpt; retrieved 2026-03-24)
- Source: https://unicode.org/reports/tr21/
- Excerpt (start): "Superseded Unicode Standard Annex" and links to case mapping sections; full case mapping data available via Unicode data files and CaseFolding.txt.

ATTRIBUTION
- Source: Unicode TR21 and Unicode data files
- Retrieved: 2026-03-24
- Bytes downloaded: 7113
