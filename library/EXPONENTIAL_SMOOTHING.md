Table of contents
- Definitions
- Single Exponential Smoothing (SES)
- Holt's linear (double exponential)
- Parameter ranges and initialization
- Forecast formulas
- Implementation steps
- Complexity and edge cases
- Reference method signatures
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Definitions
Single exponential smoothing (SES) produces a smoothed series S_t from observations X_t using a smoothing factor alpha in (0,1). SES is appropriate for series without trend or seasonality.

Single exponential smoothing (SES)
Formula: S_t = alpha * X_t + (1 - alpha) * S_{t-1}
Forecast at horizon h: F_{t+h} = S_t
Initialization: S_0 can be set to X_0 or the mean of the first window.

Holt's linear (double exponential smoothing)
Level and trend decomposition:
Level update: l_t = alpha * X_t + (1 - alpha) * (l_{t-1} + b_{t-1})
Trend update: b_t = beta * (l_t - l_{t-1}) + (1 - beta) * b_{t-1}
Forecast at horizon h: F_{t+h} = l_t + h * b_t
alpha, beta in (0,1). Initialize l_0 = X_0, b_0 = X_1 - X_0 or 0.

Parameter ranges and initialization
alpha and beta should be within (0,1). Edge choices: alpha near 1 tracks raw data; near 0 yields flat forecasts. For small samples, prefer larger alpha to adapt quickly.

Forecast formulas
- SES: F_{t+h} = S_t
- Holt: F_{t+h} = l_t + h * b_t

Implementation steps
1. Accept series as array of numeric values or {time,value} pairs ordered by time.
2. Choose initialization S_0 or l_0 and b_0.
3. Iterate from t=1..N-1 to compute S_t (or l_t, b_t) using above recurrences.
4. Produce forecast vector for horizon M by applying forecast formulas.
5. Validate numeric stability: guard against NaN and constant-series where sd=0.

Complexity and edge cases
- Complexity O(N) to compute smoothing and O(M) to produce horizon values.
- If series length < 2, return constant forecast equal to the last known value.

Reference method signatures
exponentialSmoothing(series: Array<number>|Array<{time:number,value:number}>, alpha: number) => Array<number>
exponentialSmoothingForecast(series, alpha, horizon: number) => Array<{time:number,value:number}>
holtLinearForecast(series, alpha: number, beta: number, horizon: number) => Array<{time:number,value:number}>

Supplementary details
- Use numeric types in milliseconds for time values when attaching timestamps to forecasts.
- For reproducible parameter selection, grid-search alpha (and beta) by minimizing MSE on a holdout.

Detailed digest (retrieval)
Source: https://en.wikipedia.org/wiki/Exponential_smoothing
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 338081
Technical content extracted: SES recurrence relation, Holt linear equations for level and trend, parameter ranges, initialization recommendations, forecast expressions and implementation notes.

Attribution
Content derived and normalised from: Wikipedia — Exponential smoothing (https://en.wikipedia.org/wiki/Exponential_smoothing). Data size recorded above.