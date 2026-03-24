# README_EXAMPLES

Summary

Add clear, short usage examples for every exported function to README so users can discover behaviour and expected outputs quickly.

Specification

- For each function implemented in the mission create one short example showing input and output and one edge-case example (null/undefined or empty string).
- Put examples under a new section in README named Usage examples or similar, grouped by feature.

Files to change

- README.md: add a Usage examples section showing examples for slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize and levenshtein.
- examples/: optionally add small runnable examples showing usage in Node if the repository has an examples directory.

Acceptance criteria

- README contains example for each of the 10 required utilities.
- Each example demonstrates normal input and one edge case.
- Examples are concise and suitable for inclusion in unit tests as assertions if needed.

Test cases

- README includes the canonical examples from the mission such as slugify Hello World! -> hello-world, truncate Hello World to length 8 -> Hello with an ellipsis, and levenshtein kitten vs sitting -> 3.
