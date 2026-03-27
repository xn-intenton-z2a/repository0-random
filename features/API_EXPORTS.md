# API_EXPORTS

Summary

Define the public API surface that must be exported as named exports from src/lib/main.js so consumers can import functions directly.

Specification

- Required named exports from src/lib/main.js:
  - diffSchemas
  - resolveLocalRefs
  - classifyChange
  - formatChangesText
  - formatChangesJSON
- Each export must be a pure function (no side effects) and have concise JSDoc describing inputs and outputs.

Acceptance Criteria

- [ ] src/lib/main.js exports the five named functions above
- [ ] Each exported function has minimal inline documentation and unit tests that import them by name

Notes

- Keep the public API stable and well documented; future additions should be additive only.