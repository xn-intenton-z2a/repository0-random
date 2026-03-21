# NORMALISATION

Description

Resample and normalise a time series onto a uniform interval grid using linear interpolation to fill missing values. Provide options for extrapolation policy and target interval.

Interface

normaliseToUniform(series, options)

Options
- intervalMs: required integer. Target sample interval in milliseconds.
- startTime: optional ISO 8601 or epoch ms. If omitted use the earliest sample time.
- endTime: optional ISO 8601 or epoch ms. If omitted use the latest sample time.
- extrapolate: one of 'nan'|'hold'|'linear' (default 'nan') – policy for out-of-range targets.

Behaviour

- Accepts input series as array of { time, value } with time as ISO string or numeric epoch.
- Produces a series that contains entries at every intervalMs step between startTime and endTime inclusive.
- For target times between two known samples, compute value by linear interpolation per library/LINEAR_INTERPOLATION.md.

Acceptance Criteria

- If source has gaps on the target grid, normaliseToUniform returns an entry for each target time and values for previously-missing entries are filled by linear interpolation between bracketing samples.
- If extrapolate is 'nan', targets outside the source range contain NaN values.
- Tests must validate a simple three-point example where the middle point of a uniform grid is missing and is filled linearly.

Tests

- Unit test: input series with times at t0 and t2 and intervalMs = (t2 - t0)/2 should produce three points with middle value equal to average if values are linear.

Related documents

- library/LINEAR_INTERPOLATION.md
