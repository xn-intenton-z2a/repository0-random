# CLASSIFICATION

# Overview
Define deterministic rules to map schema change records to a classification of breaking, compatible, or informational. These rules enable programmatic decisions and clear unit tests for the library's classifyChange utility.

# Behaviour
- Implement classifyChange(change) that accepts a single change record produced by diffSchemas and returns one of: breaking, compatible, informational.
- Rules (deterministic and testable):
  - property-removed: if the removed property was required in the "before" schema then classification is breaking; otherwise classification is compatible.
  - property-added: if the added property is required in the "after" schema then classification is breaking; otherwise compatible.
  - required-added: breaking.
  - required-removed: compatible.
  - type-changed: if the after type does not include the before type (i.e. there is no overlap) then breaking; if the after type is a superset that still accepts the old values then compatible.
  - enum-value-added: compatible.
  - enum-value-removed: breaking.
  - description-changed: informational.
  - nested-changed: derive classification from the nested sub-diff: if any nested change is breaking then the nested-changed is breaking; else if any nested change is compatible then compatible; else informational.
- classifyChange may use the before and after fields included in the change record to make decisions; implementors must not require external context beyond the change object.

# Acceptance Criteria
- classifyChange returns "breaking" for a property-removed change when the change record indicates the property was required in the before schema.
- classifyChange returns "breaking" for required-added and "compatible" for required-removed.
- classifyChange returns "breaking" for type-changed when the after type is incompatible with the before type; returns "compatible" when the after type includes the before type.
- enum-value-removed is classified as "breaking" and enum-value-added as "compatible".
- nested-changed returns "breaking" if any nested change in the sub-diff is breaking; otherwise follows the compatible/informational rules above.
- Unit tests assert each rule with minimal before/after schema pairs and exact expected classification strings.
