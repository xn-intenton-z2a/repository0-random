# CHANGE_CLASSIFICATION

Summary

Rules and API for mapping raw change records to a stability classification: "breaking", "compatible", or "informational".

Specification

- Public function: classifyChange(change, context?) -> "breaking" | "compatible" | "informational".
- Classification rules (deterministic heuristics):
  - property-added -> compatible
  - property-removed -> breaking if the property was listed as required in the "before" schema; otherwise compatible
  - type-changed -> breaking
  - required-added -> breaking
  - required-removed -> compatible
  - enum-value-added -> compatible
  - enum-value-removed -> breaking
  - description-changed -> informational
  - nested-changed -> classification is the highest-severity classification of the nested changes (breaking > compatible > informational)
- The classifier must accept a change record and optional context (for example, the before-schema required array) so rules that need contextual information can be evaluated.

Public API (named export)

- classifyChange

Acceptance Criteria

- [ ] classifyChange returns "breaking" for a removed property that was required in the before schema
- [ ] classifyChange returns appropriate values for all changeType values listed in the mission
- [ ] nested-changed classification aggregates nested severities correctly

Notes

- Keep rules intentionally conservative: err on the side of marking ambiguous changes as breaking to surface risk to API consumers.