# SINE_WAVE

Description

Generate deterministic sine wave time series suitable for analysis and forecasting. The generator produces an ordered array of objects with fields time and value. Time values are returned as ISO 8601 strings by default; values are numeric.

Interface

generateSineWave(options)

Options
- periods: integer > 0. Number of full cycles to generate.
- samplesPerPeriod: integer > 0. Samples per cycle; total points = periods * samplesPerPeriod.
- amplitude: number (default 1.0).
- phase: number radians (default 0).
- noise: number >= 0 (standard deviation of additive Gaussian noise, default 0). When noise > 0, a seeded PRNG must be used to make noise deterministic when seed is provided.
- seed: optional number or string to seed the library PRNG used for noise.
- startTime: optional ISO 8601 string or numeric epoch (ms). If omitted, use current time.
- intervalMs: optional integer ms between samples; if omitted, derive interval so samplesPerPeriod maps to a logical period length (implementation-defined) or default to 1000ms between samples.

Output

Array of objects: each object has time (ISO 8601 string) and value (number).

Acceptance Criteria

- Calling generateSineWave with periods = 2, samplesPerPeriod = 100, noise = 0 returns exactly 200 data points.
- With amplitude A and noise = 0 the returned values have max approximately A and min approximately -A within floating point tolerance.
- When noise > 0 and seed is supplied, repeated calls with the same seed produce identical value sequences.

Tests

- Unit tests must assert length for the 2 periods x 100 samples case, check max/min values for zero noise, and verify deterministic output when seed=42 and noise>0.

Related documents

- library/SEED_RANDOM.md
- library/ISO_8601.md
