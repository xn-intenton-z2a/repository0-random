# CSV_LOADER

Summary
Load time series CSV files with a header containing time and value columns and convert them to numeric data arrays suitable for plotting.

Specification
- Input: File path or string content of CSV with a header row containing the columns time and value (case-insensitive).
- Behavior: Parse CSV rows, convert time cells to numbers. If a time cell is an ISO8601 timestamp convert to epoch milliseconds; if already numeric use the numeric value. Convert value cells to Number. Ignore empty lines and trim whitespace.
- Output: Array of objects {time:number, value:number} in the same order as the CSV.

Acceptance Criteria
- Loading CSV content with lines:
  time,value
  0,1
  1,2
  returns an array equal to [{time:0,value:1},{time:1,value:2}].
- Loading CSV with ISO8601 timestamps converts times to epoch milliseconds.
- Malformed rows (missing time or value) cause the loader to throw an error describing the row and reason.

Implementation Notes
- Implement a small dependency-free parser that tolerates CRLF and LF line endings.
- Export loadCsvTimeSeries as a named export from src/lib/main.js.
