# EXPONENTIAL_SMOOTHING

Description

Implement single exponential smoothing and a simple forecast interface. Optionally include Holt's linear method for level+trend if needed later; initial scope is SES and SES-based forecasting.

Interface

exponentialSmoothingForecast(series, alpha, horizon, options?) -> Array of { time, value }

Options
- alpha: number in range 0.0 to 1.0 (inclusive).
- horizon: integer >= 0.
- intervalMs: optional ms step for predicted timestamps.
- init: optional initial level choice ('first'|'mean').

Behaviour

- Compute SES as S_t = alpha * X_t + (1 - alpha) * S_{t-1} with chosen initialization.
- Forecast horizon M returns M values equal to the last smoothed level for SES.

Acceptance Criteria

- alpha outside [0,1] is rejected with a clear error.
- exponentialSmoothingForecast with valid alpha and horizon M returns exactly M predicted points.
- When applied to a known sine wave, SES forecast for a 10-point horizon should produce RMSE < 0.5 in unit tests (verify using mission sine fixture and tolerances).

Tests

- Unit tests must validate alpha bounds, horizon length of output, and RMSE against the sine fixture.

Related documents

- library/EXPONENTIAL_SMOOTHING.md
