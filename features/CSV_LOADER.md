# CSV_LOADER

Summary
Load time series CSV files with a header containing time and value columns and convert them to numeric data arrays for plotting.

Specification
- Input: File path or string content of CSV with a header row.
- Behavior: Accept headers "time" and "value" (case-insensitive). Time values may be numeric epoch milliseconds or ISO8601 timestamps; convert ISO strings to epoch milliseconds. Convert value cells to Number. Ignore blank lines. Preserve input order.
- Output: Array of objects {time:number, value:number}.

Acceptance Criteria
- Loading a CSV string with content:
time,value
0,1
1,2
returns [{time:0,value:1},{time:1,value:2}].
- Loading CSV with ISO8601 timestamps converts time to epoch milliseconds.
- Malformed rows (missing columns or non-numeric value) cause the loader to throw a clear error.

Implementation Notes
- Keep the parser dependency-free: implement a small, robust CSV parser that trims whitespace and tolerates CRLF or LF line endings.
- Export loadCsv as a named export from src/lib/main.js.
