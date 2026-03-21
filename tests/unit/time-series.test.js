// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import {
  sineWave,
  randomWalk,
  parseCSV,
  normalise,
  movingAverageForecast,
  exponentialSmoothingForecast,
  crossCorrelation,
  generateReport
} from '../../src/lib/main.js';

function rmse(a, b) {
  if (a.length !== b.length) throw new Error('Length mismatch');
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i].value - b[i].value;
    s += d * d;
  }
  return Math.sqrt(s / a.length);
}

describe('Time-series core', () => {
  test('sine wave: 2 periods, 0 noise, 100 samples per period -> 200 samples', () => {
    const s = sineWave({ periods: 2, samplesPerPeriod: 100, noise: 0, seed: 1 });
    expect(s.length).toBe(200);
    // Check a few canonical points: quarter period should reach ~1 or -1
    const idx25 = s[25].value;
    const idx75 = s[75].value;
    expect(Math.abs(idx25 - 1) < 1e-6).toBe(true);
    expect(Math.abs(idx75 + 1) < 1e-6).toBe(true);
  });

  test('random walk deterministic with seed', () => {
    const a = randomWalk({ seed: 42, steps: 50 });
    const b = randomWalk({ seed: 42, steps: 50 });
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  test('normalise fills gaps with linear interpolation', () => {
    const data = [ { time: 0, value: 0 }, { time: 2, value: 2 }, { time: 4, value: 4 } ];
    const n = normalise(data, { interval: 1, startTime: 0, endTime: 4 });
    expect(n.length).toBe(5);
    expect(n[1].value).toBe(1);
    expect(n[3].value).toBe(3);
  });

  test('moving average forecast returns requested horizon', () => {
    const s = sineWave({ periods: 1, samplesPerPeriod: 100, noise: 0, seed: 2 });
    const history = s.slice(0, 100);
    const preds = movingAverageForecast(history, { window: 10, horizon: 20 });
    expect(preds.length).toBe(20);
  });

  test('exponential smoothing forecast returns requested horizon', () => {
    const s = sineWave({ periods: 1, samplesPerPeriod: 100, noise: 0, seed: 3 });
    const history = s.slice(0, 100);
    const preds = exponentialSmoothingForecast(history, { alpha: 0.5, horizon: 5 });
    expect(preds.length).toBe(5);
  });

  test('forecast of sine wave has RMSE < 0.5 for 10-point horizon', () => {
    // generate a longer sine to have history + future
    const s = sineWave({ periods: 3, samplesPerPeriod: 200, noise: 0, seed: 4 });
    const history = s.slice(0, 200); // 200 points
    const actualFuture = s.slice(200, 210);
    const preds = movingAverageForecast(history, { window: 20, horizon: 10 });
    const error = rmse(preds, actualFuture);
    expect(error).toBeLessThan(0.5);
  });

  test('cross-correlation peak at correct lag for offset sine waves', () => {
    const offset = 5;
    const s = sineWave({ periods: 2, samplesPerPeriod: 100, noise: 0, seed: 5 });
    // create shifted version: b[t] = a[t + offset] (clip)
    const a = s.slice(0, 200);
    const b = a.map((d, i) => ({ time: d.time, value: (a[i + offset] || { value: 0 }).value }));
    const corrs = crossCorrelation(a, b, { maxLag: 20 });
    // find lag with maximum r (by absolute value)
    let best = corrs[0];
    for (const c of corrs) if (Math.abs(c.r) > Math.abs(best.r)) best = c;
    expect(Math.abs(best.lag)).toBe(offset);
  });

  test('generateReport returns markdown with dataset summary', () => {
    const s = sineWave({ periods: 1, samplesPerPeriod: 10, seed: 6 });
    const md = generateReport([{ name: 'sine', data: s }]);
    expect(typeof md).toBe('string');
    expect(md).toContain('| Dataset | Rows |');
    expect(md).toContain('sine');
  });

  test('parseCSV handles ISO8601 and unix timestamps', () => {
    const csv = 'time,value\n2020-01-01T00:00:00Z,1\n1580515200,2\n1580515200000,3\n';
    const parsed = parseCSV(csv);
    expect(parsed.length).toBe(3);
    expect(parsed[0].value).toBe(1);
    expect(parsed[1].value).toBe(2);
    expect(parsed[2].value).toBe(3);
  });
});
