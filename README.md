# repo

Time-series library: generation, normalisation, forecasting, correlation, and reporting utilities.

## Overview

This repository provides a small time-series toolkit implemented without external runtime dependencies. It is browser-safe and designed for deterministic output via seeded random generators.

Exports (from `src/lib/main.js`):

- sineWave(options)
- randomWalk(options)
- parseCSV(text)
- normalise(data, options)
- movingAverageForecast(history, options)
- exponentialSmoothingForecast(history, options)
- crossCorrelation(seriesA, seriesB, options)
- generateReport(datasets)

## Usage examples

Import the functions and call them directly (Node or browser ESM):

```js
import { sineWave, randomWalk, normalise, movingAverageForecast, generateReport } from './src/lib/main.js';

// Generate a sine wave: 2 periods, 100 samples per period
const s = sineWave({ periods: 2, samplesPerPeriod: 100, noise: 0, seed: 1 });
console.log(s.length); // 200

// Generate a deterministic random walk
const rw1 = randomWalk({ seed: 42, steps: 100 });
const rw2 = randomWalk({ seed: 42, steps: 100 });
console.log(JSON.stringify(rw1) === JSON.stringify(rw2)); // true

// Normalise to 1-second intervals
const norm = normalise(rw1, { interval: 1 });

// Forecast with moving average (window N, horizon M)
const preds = movingAverageForecast(norm.slice(0, 50), { window: 10, horizon: 20 });

// Exponential smoothing
const es = exponentialSmoothingForecast(norm.slice(0, 50), { alpha: 0.5, horizon: 10 });

// Cross-correlation between two series
const corr = crossCorrelation(s, s, { maxLag: 20 });

// Generate markdown report
const md = generateReport([{ name: 'sine', data: s }]);
console.log(md);
```

## Notes

- All RNGs accept a `seed` option for determinism.
- Time values are treated as seconds in the library.
- CSV loader auto-detects ISO 8601 and Unix timestamps (seconds or milliseconds).

For full API docs see `src/lib/main.js` and the unit tests under `tests/unit/` which demonstrate typical usage.
