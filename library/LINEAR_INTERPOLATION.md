Table of contents
- Definition and linear formula
- Uniform resampling algorithm (linear interpolation)
- Binary-search vs linear-scan selection of bracketing samples
- Extrapolation policies
- Implementation steps
- Reference method signatures
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Definition and formula
Linear interpolation between two known points (x0,y0) and (x1,y1) for x in [x0,x1]:
value = y0 + (x - x0) * (y1 - y0) / (x1 - x0)
If x1 == x0, treat as constant segment and return y0.

Uniform resampling algorithm (to fill gaps)
Given ordered series of {time,value} and target uniform step dt (ms):
1. Construct targetTimes from startTime to endTime inclusive at interval dt.
2. Maintain an index pointer i into source samples. For each target t:
   a. Advance i until source[i].time <= t <= source[i+1].time (monotonic times simplifies this).
   b. Compute fraction f = (t - source[i].time) / (source[i+1].time - source[i].time).
   c. Interpolated value = source[i].value + f * (source[i+1].value - source[i].value).
3. Edge cases: if t < first sample, apply left-policy (null/hold/linear-extrapolate); if t > last sample apply right-policy.

Binary-search vs linear-scan
- Binary search: O(log N) per target time, overall O(M log N).
- Linear scan (pointer): O(N+M) when both source and target times increase monotonically; preferred for resampling entire series.

Extrapolation policies
- 'hold': repeat nearest known value
- 'nan': return NaN for out-of-range targets
- 'linear': allow linear extrapolation using first or last two samples

Reference method signatures
interpolateLinear(series: Array<{time:number,value:number}>, targetTimes: Array<number>, options?: {extrapolate?: 'hold'|'nan'|'linear'}) => Array<{time:number,value:number}>
normaliseToUniform(series, dtMs: number, options?) => Array<{time:number,value:number}>

Detailed digest (retrieval)
Source: https://en.wikipedia.org/wiki/Linear_interpolation
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 141403
Technical content extracted: interpolation formula, algorithm for resampling to uniform intervals, complexity trade-offs and extrapolation policies.

Attribution
Content derived and normalised from: Wikipedia — Linear interpolation (https://en.wikipedia.org/wiki/Linear_interpolation). Data size recorded above.