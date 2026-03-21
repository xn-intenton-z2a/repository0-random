# CSV_LOADING

Description

Load time series from CSV text or file content. CSV rows must contain two columns named time and value (header optional). Time parsing auto-detects ISO 8601 strings and Unix timestamps (seconds or milliseconds) and returns canonical ISO 8601 time strings in the output.

Interface

parseCsvTimeSeries(csvText, options?)

Options
- timeColumn: column name for time (default "time").
- valueColumn: column name for value (default "value").
- header: boolean (default true) – if false treat rows as raw columns index 0 and 1.
- strict: boolean (default false) – when true, throw on malformed rows; when false, skip rows that cannot be parsed.

Behaviour

- Follows RFC 4180 quoting and escaping rules for quoted fields.
- Time detection heuristics: if cell matches ISO 8601 use Date.parse; if numeric digits only, treat values of length <= 10 as seconds and length >= 13 as milliseconds; otherwise attempt Date.parse and reject if invalid.
- Convert parsed times to ISO 8601 strings in the returned objects.

Output

Array of objects: { time: ISO 8601 string, value: number } ordered by input row order.

Acceptance Criteria

- Given a CSV with ISO 8601 timestamps, parseCsvTimeSeries returns the expected number of rows with time fields preserved as ISO strings and numeric values parsed.
- Given a CSV containing Unix epoch seconds and epoch milliseconds, the loader converts both to ISO 8601 timestamps correctly.
- Quoted fields, embedded commas and CR/LF inside quoted fields are handled per RFC 4180.

Tests

- Unit tests must cover ISO input, epoch seconds, epoch milliseconds, quoted fields and malformed rows handling in strict and permissive modes.

Related documents

- library/RFC4180_CSV.md
- library/ISO_8601.md
