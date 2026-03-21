# README_EXAMPLES

# Overview
Ensure the project README documents practical usage of the library for both programmatic consumers and CLI/web demonstration. Provide a concise before/after schema example and show how to produce and render change records in both text and json formats.

# Behaviour
- README must document the public API exported from src/lib/main.js by name: diffSchemas, renderChanges, classifyChange, resolveLocalRefs (or equivalent names used in the implementation).
- README must include a minimal before and after schema example and explain expected output shape (an array of change records with path and changeType) without embedding large code blocks.
- README must describe local $ref resolution behaviour and explicitly state that remote $ref values are unsupported and cause an error.
- README should briefly document CLI usage (example: running the main script with two file paths and format option) and link to the examples directory for more pairs used by tests and demos.

# Acceptance Criteria
- README contains the names of the public API functions and a short usage example demonstrating producing change records and rendering them in text and json formats.
- README contains a note describing local $ref resolution and that remote $ref values throw an error.
- README references the examples directory and provides at least one before/after schema pair described in prose so a consumer can reproduce expected output.
