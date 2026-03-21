# UNICODE_SUPPORT

Purpose

Ensure string Hamming distance compares Unicode code points correctly so that characters outside the Basic Multilingual Plane count as a single position.

Behavior

- The string Hamming implementation must iterate by Unicode code points (for...of or Array.from) and compare positions by full code points.
- Surrogate pairs and supplementary plane characters must be treated as single characters when deciding length and position.
- Provide unit tests that demonstrate surrogate-pair behaviour: two strings that are identical except for a single supplementary character must return distance 1.

Acceptance criteria

- Comparing two strings that differ only by a single emoji returns 1.
- Code uses code-point-aware iteration and does not rely on str.length or indexing by code unit.
- Tests include at least one case using supplementary-plane characters (emojis or historical scripts) to prove correct handling.
- Behaviour is documented in README and in the feature tests.