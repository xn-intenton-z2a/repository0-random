#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

// Cron engine implementation (UTC-only)

const SHORTCUTS = {
  '@yearly': '0 0 1 1 *',
  '@annually': '0 0 1 1 *',
  '@monthly': '0 0 1 * *',
  '@weekly': '0 0 * * 0',
  '@daily': '0 0 * * *',
  '@hourly': '0 * * * *'
};

function range(start, end, step = 1) {
  const out = [];
  for (let i = start; i <= end; i += step) out.push(i);
  return out;
}

function uniqSorted(arr) {
  return Array.from(new Set(arr)).sort((a, b) => a - b);
}

function parseField(token, name, min, max) {
  if (typeof token !== 'string' || token.length === 0) {
    throw new SyntaxError(`Invalid ${name} token: ${String(token)}`);
  }

  token = token.trim();
  if (token === '*') return range(min, max);

  const parts = token.split(',').map(p => p.trim()).filter(Boolean);
  const values = [];

  for (const part of parts) {
    // support steps: base/step
    const [base, stepStr] = part.split('/').map(s => s.trim());
    let step = stepStr ? parseInt(stepStr, 10) : null;
    if (stepStr !== undefined && (Number.isNaN(step) || step <= 0)) {
      throw new SyntaxError(`Invalid ${name} token: ${part}`);
    }

    if (base === '*') {
      // */step or *
      if (step == null) {
        values.push(...range(min, max));
      } else {
        values.push(...range(min, max, step));
      }
      continue;
    }

    const dashIdx = base.indexOf('-');
    if (dashIdx !== -1) {
      const [aStr, bStr] = base.split('-').map(s => s.trim());
      const a = parseInt(aStr, 10);
      const b = parseInt(bStr, 10);
      if (Number.isNaN(a) || Number.isNaN(b) || a < min || b > max || a > b) {
        throw new SyntaxError(`Invalid ${name} token: ${part}`);
      }
      if (step == null) {
        values.push(...range(a, b));
      } else {
        values.push(...range(a, b, step));
      }
      continue;
    }

    // single number
    const v = parseInt(base, 10);
    if (Number.isNaN(v) || v < min || v > max) {
      throw new SyntaxError(`Invalid ${name} token: ${part}`);
    }

    // stepping on a single number doesn't make sense; ignore step if provided
    values.push(v);
  }

  return uniqSorted(values);
}

export function parseCron(expression) {
  if (typeof expression !== 'string') {
    throw new SyntaxError(`Invalid cron expression: ${String(expression)}`);
  }

  const expr = expression.trim();
  if (expr.length === 0) throw new SyntaxError('Empty cron expression');

  let expanded = expr;
  if (expr.startsWith('@')) {
    const lower = expr.toLowerCase();
    if (!(lower in SHORTCUTS)) throw new SyntaxError(`Unknown shortcut: ${expr}`);
    expanded = SHORTCUTS[lower];
  }

  const fields = expanded.split(/\s+/).filter(Boolean);
  if (fields.length !== 5) {
    if (fields.length === 6) throw new SyntaxError('6-field cron (seconds) is not supported');
    throw new SyntaxError('Cron expression must have 5 fields');
  }

  const [minuteTok, hourTok, domTok, monthTok, dowTok] = fields;

  const minutes = parseField(minuteTok, 'minute', 0, 59);
  const hours = parseField(hourTok, 'hour', 0, 23);
  const dayOfMonth = parseField(domTok, 'dayOfMonth', 1, 31);
  const month = parseField(monthTok, 'month', 1, 12);
  const dayOfWeek = parseField(dowTok, 'dayOfWeek', 0, 6);

  return {
    minutes,
    hours,
    dayOfMonth,
    month,
    dayOfWeek,
    original: expr
  };
}

function dateMatchesParsed(parsed, date) {
  const m = date.getUTCMinutes();
  const h = date.getUTCHours();
  const dom = date.getUTCDate();
  const mon = date.getUTCMonth() + 1; // months 1-12
  const dow = date.getUTCDay();

  if (!parsed.minutes.includes(m)) return false;
  if (!parsed.hours.includes(h)) return false;
  if (!parsed.month.includes(mon)) return false;
  if (!parsed.dayOfWeek.includes(dow)) return false;
  // day of month: ensure month actually has that day
  if (!parsed.dayOfMonth.includes(dom)) return false;

  return true;
}

export function matches(expressionOrParsed, dateInput) {
  const parsed = typeof expressionOrParsed === 'string' ? parseCron(expressionOrParsed) : expressionOrParsed;
  if (!parsed || typeof parsed !== 'object') throw new SyntaxError('Invalid parsed cron');

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput instanceof Date ? dateInput : new Date();
  if (isNaN(date.getTime())) throw new SyntaxError('Invalid date');

  // match exact minute instants only (seconds and milliseconds must be zero)
  if (date.getUTCSeconds() !== 0 || date.getUTCMilliseconds() !== 0) return false;

  return dateMatchesParsed(parsed, date);
}

export function nextRun(expressionOrParsed, fromDate = new Date()) {
  const parsed = typeof expressionOrParsed === 'string' ? parseCron(expressionOrParsed) : expressionOrParsed;
  if (!parsed || typeof parsed !== 'object') throw new SyntaxError('Invalid parsed cron');

  let current = new Date(fromDate.getTime());
  // zero seconds/milliseconds
  current.setUTCSeconds(0, 0);
  // move strictly after
  current = new Date(current.getTime() + 60_000);

  const horizonYears = 5;
  const horizonMs = horizonYears * 365 * 24 * 60 * 60 * 1000;
  const deadline = fromDate.getTime() + horizonMs;

  while (current.getTime() <= deadline) {
    // skip months that don't include any of the parsed.dayOfMonth values
    const mon = current.getUTCMonth() + 1;
    const domsInThisMonth = parsed.dayOfMonth.filter(d => d <= daysInMonth(current.getUTCFullYear(), mon));
    if (domsInThisMonth.length === 0) {
      // jump to first day of next month
      const y = current.getUTCFullYear();
      const m = current.getUTCMonth();
      current = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0));
      continue;
    }

    // Check match
    if (dateMatchesParsed(parsed, current)) return new Date(current.getTime());

    // advance by 1 minute
    current = new Date(current.getTime() + 60_000);
  }

  throw new Error('No run time found within horizon');
}

function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function nextRuns(expressionOrParsed, n, fromDate = new Date()) {
  if (!Number.isInteger(n) || n <= 0) throw new SyntaxError('n must be a positive integer');
  const result = [];
  let parsed = typeof expressionOrParsed === 'string' ? parseCron(expressionOrParsed) : expressionOrParsed;
  let cursor = new Date(fromDate.getTime());
  for (let i = 0; i < n; i++) {
    const next = nextRun(parsed, cursor);
    result.push(next);
    // move cursor to the instant just after the found run
    cursor = new Date(next.getTime() + 60_000);
  }
  return result;
}

function detectTokenFromValues(values, min, max) {
  // full range
  if (values.length === (max - min + 1)) return '*';
  // detect step pattern starting at min
  if (values.length > 1 && values[0] === min) {
    const step = values[1] - values[0];
    if (step > 0) {
      let ok = true;
      for (let i = 0; i < values.length; i++) {
        if (values[i] !== min + i * step) { ok = false; break; }
      }
      if (ok) return `*/${step}`;
    }
  }
  // detect contiguous range
  const first = values[0];
  const last = values[values.length - 1];
  if (values.length > 1 && values.length === (last - first + 1)) {
    return `${first}-${last}`;
  }
  // otherwise list
  return values.join(',');
}

export function stringifyCron(parsed) {
  if (!parsed || typeof parsed !== 'object') throw new SyntaxError('Invalid parsed cron');
  // if original was a shortcut, return expanded canonical
  if (typeof parsed.original === 'string' && parsed.original.startsWith('@')) {
    const lower = parsed.original.toLowerCase();
    if (SHORTCUTS[lower]) return SHORTCUTS[lower];
  }

  const mTok = detectTokenFromValues(parsed.minutes, 0, 59);
  const hTok = detectTokenFromValues(parsed.hours, 0, 23);
  const domTok = detectTokenFromValues(parsed.dayOfMonth, 1, 31);
  const monTok = detectTokenFromValues(parsed.month, 1, 12);
  const dowTok = detectTokenFromValues(parsed.dayOfWeek, 0, 6);

  return `${mTok} ${hTok} ${domTok} ${monTok} ${dowTok}`;
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
