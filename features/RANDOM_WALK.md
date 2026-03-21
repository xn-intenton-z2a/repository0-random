# RANDOM_WALK

Description

Generate a seeded random walk (discrete-time cumulative sum of random steps) as a time series. Useful for simulating stochastic trends and validating deterministic generators.

Interface

generateRandomWalk(options)

Options
- steps: integer > 0. Number of points to generate.
- startValue: number (default 0).
- stepStdDev: number >= 0 (standard deviation of Gaussian step increments, default 1).
- seed: required to guarantee deterministic outputs in tests; accept number or string.
- startTime: optional ISO 8601 string or epoch ms.
- intervalMs: ms between samples (optional).

Output

Array of objects with time (ISO 8601 string) and value (number) representing the cumulative walk.

Acceptance Criteria

- Calling generateRandomWalk with seed = 42 and steps = 100 returns an array of length 100 and the same numeric sequence on repeated calls.
- Values are cumulative sums of step increments whose sample standard deviation approximates stepStdDev (within sampling noise) when measured over many runs with different seeds.

Tests

- Deterministic test: call twice with seed 42 and assert deep equality of values.
- Length test: steps N yields N time/value points.

Related documents

- library/SEED_RANDOM.md
