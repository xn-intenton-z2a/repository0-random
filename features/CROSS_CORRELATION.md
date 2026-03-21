# CROSS_CORRELATION

Description

Compute Pearson cross-correlation between two time series for integer lags in the range [-maxLag..+maxLag]. Return ranked lag correlation pairs so callers can identify alignment and lead/lag relationships.

Interface

crossCorrelation(seriesA, seriesB, options?) -> Array of { lag, r }

Options
- maxLag: integer (default 20).
- minOverlap: integer minimum overlapping pairs to compute a stable r (default 3).
- alignByIndex: boolean if true align by index positions; if false align by timestamps using resampling or interpolation prior to correlation.

Behaviour

- For each lag L compute Pearson r over overlapping samples as described in library/CROSS_CORRELATION.md and library/PEARSON_CORRELATION.md.
- Return an array sorted by lag ascending from -maxLag to +maxLag with r values in [-1,1] or NaN when variance is zero.

Acceptance Criteria

- Default invocation (maxLag 20) returns 41 entries for lags -20..20.
- For two sine wave series where one is a time-shifted copy of the other, the returned r array shows a clear peak at the expected lag (in sample units) and r near 1.0.
- Implementations should guard against tiny overlap window sizes; return NaN or a special marker when overlap < minOverlap.

Tests

- Unit test: create two identical sine series shifted by known sample offset and assert the maximum-r lag equals the offset.

Related documents

- library/CROSS_CORRELATION.md
- library/PEARSON_CORRELATION.md
