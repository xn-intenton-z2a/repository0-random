# EXAMPLES

# Overview
Provide a curated set of small before/after schema pairs that demonstrate each supported change type and resolver behaviour. Examples are intended for unit tests, documentation, and the website demo.

# Behaviour
- Populate an examples directory (examples/) with named example pairs, each containing a before.json and after.json and a short README describing the expected change records.
- Required example pairs: add-property, remove-required-property, type-change, enum-add, enum-remove, description-change, nested-change, local-ref-usage, remote-ref-error, circular-ref.
- Each example README must state which changeType(s) are expected and whether the expected classification is breaking, compatible, or informational.

# Acceptance Criteria
- The repository contains example pairs covering all supported changeType values and resolver behaviours.
- Tests and the documentation reference these example pairs; integration tests use them to verify CLI and renderer outputs match expectations described in the example READMEs.
- Examples are small, focused, and usable by a human reader to reproduce diff outputs without additional context.
