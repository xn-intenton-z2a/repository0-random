Table of contents
- Definition and formula
- Sample vs population and biases
- Numerical stable computation
- Edge cases (zero variance)
- Implementation steps
- Reference method signature
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Definition and formula
Pearson correlation coefficient r between two paired samples X and Y is:
r = sum_i (x_i - mu_x)*(y_i - mu_y) / sqrt( sum_i (x_i - mu_x)^2 * sum_i (y_i - mu_y)^2 )
Range: -1 <= r <= 1.

Sample vs population
Use sample means mu_x and mu_y computed over the paired observations. For small sample sizes, r is noisy; report sample size and consider significance testing separately.

Numerical stable computation
One-pass algorithms reduce floating-point error. Use compensated summation or compute means then deviations in a second pass. When implementing, prefer two-pass: compute means, then accumulate covariance and variances.

Edge cases
- If variance of X or Y is zero (constant series), denominator is zero and r is undefined; return NaN or 0 per API contract.
- For missing values, remove pairs where either is NaN and recompute means on the reduced set.

Implementation steps
1. Align series into paired arrays of equal length by trimming or dropping missing data.
2. Compute mu_x and mu_y.
3. Compute covariance and variances with a loop.
4. Return r or NaN if denominator is zero.

Reference method signature
pearsonCorrelation(seriesA: Array<number>|Array<{time,value}>, seriesB: same) => number

Detailed digest (retrieval)
Source: https://en.wikipedia.org/wiki/Pearson_correlation_coefficient
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 601570
Technical content extracted: Pearson formula, statistical interpretation, numerical stability considerations and edge-case handling for zero variance.

Attribution
Content derived and normalised from: Wikipedia — Pearson correlation coefficient (https://en.wikipedia.org/wiki/Pearson_correlation_coefficient). Data size recorded above.