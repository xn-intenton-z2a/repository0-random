Table of contents
- Definition
- Simple Moving Average (SMA)
- Moving-average forecasting
- Windowing and edge handling
- Implementation steps
- Complexity and performance
- Reference method signatures
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Definition
A moving average computes the average of the most recent N observations. Use SMA for short-term smoothing and baseline forecasts when no trend exists.

Simple Moving Average (SMA)
Formula for SMA at time t with window N: SMA_t = (1/N) * sum_{i=0..N-1} X_{t-i}
For a series indexed 0..T-1, SMA is defined when t >= N-1.

Moving-average forecasting
For horizon h>0 a common approach is to predict the next h values as the last computed SMA (no trend). That is, F_{t+h} = SMA_t for h>=1.
Variants include cumulative moving average and weighted moving averages (WMA) where weights w_i apply to older samples.

Windowing and edge handling
- If series length < N, compute SMA over available points (use mean of available) or return undefined per option.
- For streaming efficiency, maintain a running sum to update SMA in O(1) per step: remove oldest, add newest.

Implementation steps
1. Accept ordered numeric series or {time,value} pairs.
2. Convert to value vector V[].
3. Maintain running sum and circular buffer of window values or compute using prefix sums.
4. Produce SMA array aligned to sample times.
5. Forecast horizon M by repeating last SMA value M times or apply windowed extrapolation if trend-aware variant used.

Complexity and performance
- Time: O(N) to compute all SMAs using running sum, O(1) per sample.
- Forecast generation O(M).

Reference method signatures
simpleMovingAverage(series: Array<number>|Array<{time,value}>, window: number) => Array<number>
movingAverageForecast(series, window: number, horizon: number) => Array<{time,value}>

Detailed digest (retrieval)
Source: https://en.wikipedia.org/wiki/Moving_average
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 276333
Technical content extracted: SMA formula, forecasting by repeating SMA, running-sum optimization, weighted variants and edge-handling strategies.

Attribution
Content derived and normalised from: Wikipedia — Moving average (https://en.wikipedia.org/wiki/Moving_average). Data size recorded above.