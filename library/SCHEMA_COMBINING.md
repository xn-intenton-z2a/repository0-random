SCHEMA_COMBINING

NORMALISED EXTRACT

Table of contents
1. allOf semantics
2. anyOf semantics
3. oneOf semantics
4. not semantics
5. Practical rules for diffing combining keywords

allOf
- allOf is an array of subschemas; an instance is valid only if it validates against every subschema. For diffing, treat allOf as conjunctive constraints: tightening any subschema is potentially breaking; loosening any subschema is potentially compatible but must be assessed in context.

anyOf
- anyOf is an array of subschemas; an instance is valid if at least one subschema validates. For diffing: removing an option (a subschema) is breaking if there exists any instance that previously validated only because of the removed subschema and no longer validates against remaining subschemas.

oneOf
- oneOf is like anyOf but requires exactly one subschema to validate. Changes that alter subschema overlap or the count of matching subschemas can be breaking or behavioural; conservative classification: treat removal of an option as breaking and addition as compatible unless it creates intersection ambiguity.

not
- not inverts the schema: an instance is valid iff it does not validate against the subschema. For diffing: changing the not subschema can flip valid instances; treat any change to not as potentially breaking.

PRACTICAL RULES FOR DIFF ENGINE
- Recursively diff each subschema within combiners and report nested-changed entries.
- For anyOf/oneOf, compute representative instance shapes (where feasible) or conservatively classify removal of an option as breaking.
- When a combiner's internal order changes but content remains semantically equivalent, do not emit a change if normalized equality is detected.

DETAILED DIGEST
- Source: JSON Schema — Combining schemas (Understanding JSON Schema) (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data size (crawl): ~217.8 KB

ATTRIBUTION
- URL: https://json-schema.org/understanding-json-schema/reference/combining.html
