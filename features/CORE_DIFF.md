# CORE_DIFF

# Overview
Implement the primary schema diff engine that compares two JSON Schema Draft-07 document objects and returns an array of change records. The engine must be exported as named functions from src/lib/main.js and operate without external runtime dependencies.

# Behaviour
- Provide a function diffSchemas(schemaBefore, schemaAfter) that returns an array of change objects. Each change object contains fields: path, changeType, before, after.
- Supported changeType values: property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed.
- Traverse properties, items, allOf, oneOf, anyOf recursively to detect changes deeply. nested-changed entries must include a sub-diff array for the deeper changes.
- Use a JSON Pointer style path for the path field and rely on local ref resolution prior to comparing.

# API
- Export named functions from src/lib/main.js: diffSchemas, classifyChange.
- diffSchemas accepts two plain JavaScript objects representing JSON Schema Draft-07 and returns an array of change records.
- classifyChange accepts a single change record and returns one of: breaking, compatible, informational.

# Acceptance Criteria
- diffSchemas returns an array when given two schema objects.
- Detects added and removed properties producing property-added and property-removed change types.
- Detects type changes producing type-changed with before and after values.
- Detects required array differences producing required-added and required-removed.
- Produces nested-changed for recursive diffs and includes a sub-diff array for nested changes.
- All public API is exported from src/lib/main.js and uses no external runtime dependencies.
