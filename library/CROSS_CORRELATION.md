Table of contents
- Definition
- Discrete cross-correlation formula
- Normalised cross-correlation (Pearson r at lag)
- Algorithm for lag sweep
- Implementation steps and complexity
- FFT note for large series
- Reference method signature
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Definition
Cross-correlation between two discrete time series x_t and y_t measures similarity as a function of lag L.

Discrete cross-correlation (unnormalised)
For lag L (positive or negative): R_xy(L) = sum_{t} x_t * y_{t+L}
Sum taken over indices where both terms exist (overlapping region).

Normalised cross-correlation (Pearson correlation at lag)
Compute Pearson correlation for overlapping segments at each lag to obtain correlation coefficient r(L):
1. For a given L, form overlapping index sets A and B where A_i = x_{i} and B_i = y_{i+L} (or swap for negative L).
2. Compute means mu_A and mu_B over the overlapping elements.
3. Compute covariance = sum (A_i - mu_A)*(B_i - mu_B).
4. Compute sd_A = sqrt(sum (A_i - mu_A)^2), sd_B likewise.
5. Pearson r(L) = covariance / (sd_A * sd_B). If sd_A==0 or sd_B==0, r is undefined (NaN) or set to 0 per option.

Algorithm for lag sweep
For maxLag parameter K, compute r(L) for L in [-K..K]. For each lag:
- Identify overlapping slices (start, end) quickly using index arithmetic.
- Compute means and standard deviations for the slices and covariance.
- Return array of {lag: L, r: r(L)}.

Edge handling and missing values
- Skip pairs where either value is missing or NaN; recompute means over remaining pairs.
- Be explicit about minimum overlap length threshold to avoid unstable r for tiny overlaps.

Complexity and performance
- Naive computation: O(N * K) where N is series length and K is maxLag.
- For very long series use FFT-based cross-correlation to compute unnormalised cross-correlation in O(N log N) and then normalise per lag.

Reference method signature
crossCorrelation(seriesA: Array<{time,value}>|Array<number>, seriesB: same, maxLag: number = 20) => Array<{lag:number, r:number}>

Detailed digest (retrieval)
Source: https://en.wikipedia.org/wiki/Cross-correlation
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 421406
Technical content extracted: discrete cross-correlation definition, normalisation to Pearson r for each lag, overlapping-samples alignment, algorithmic complexity and FFT alternative.

Attribution
Content derived and normalised from: Wikipedia — Cross-correlation (https://en.wikipedia.org/wiki/Cross-correlation). Data size recorded above.