# MOVING_AVERAGE

Description

Provide a simple moving average (SMA) based forecaster and utilities to compute SMA series. The forecast produces horizon M predictions by repeating the last SMA value or computing a windowed extrapolation variant.

Interface

movingAverage(series, windowSize) -> series of SMA aligned to input times
movingAverageForecast(series, windowSize, horizon, options?) -> Array of { time, value }

Options
- windowSize: integer > 0.
- horizon: integer >= 0.
- intervalMs: optional ms used to advance forecast timestamps.
- align: 'right'|'center'|'left' for SMA alignment; default 'right'.

Acceptance Criteria

- movingAverageForecast called with windowSize 10 and horizon 20 returns exactly 20 forecasted points.
- Implementation handles series shorter than windowSize by computing SMA over available points (no error) unless strict mode is requested.
- When applied to a known clean sine wave, the forecast for a 10-point horizon should achieve RMSE < 0.5 in unit tests (verify against mission dataset fixture).

Tests

- Unit tests must assert length of forecast output, correct handling of short series and check RMSE against a provided sine fixture.

Related documents

- library/MOVING_AVERAGE.md
