NORMALISED EXTRACT

Key technical points (directly actionable):
- csv-parse (csv.js.org/parse) provides synchronous and streaming CSV parsing for Node.js. Input may be string, Buffer, or stream.
- For a two-column time series CSV with header time,value use the columns option to get objects and cast values to Number.

TABLE OF CONTENTS
1. Primary parse invocation forms
2. Important options for time-series parsing
3. Input and output types
4. Error handling and streaming

DETAILS
1. Primary parse invocation forms
- Stream API: parse(inputStream, options) returns a readable object-mode stream that emits parsed records.
- Callback API: parse(inputStringOrBuffer, options, callback(err, output)) — callback receives array of records.
- Synchronous API (csv-parse/sync): parse(inputString, options) returns array of records.

2. Important options (types and effects)
- delimiter: string | Buffer — default ','; sets field separator.
- columns: boolean | string[] | function(record) — if true, first record used as keys; if array, maps columns; if function, allows custom header mapping.
- from_line: number — 1-based line where parsing starts (useful to skip headers or comments).
- skip_empty_lines: boolean — default false; set true to ignore empty lines.
- trim: boolean — trim whitespace from fields.
- relax_quotes: boolean — allows unbalanced quotes.
- cast: boolean | function(value, context) — if true attempt to cast numbers/bools; custom function used to coerce values to required types.
- on_record: function(record, context) — called for each record; can be used to transform or abort.

3. Input and output types
- Input: string | Buffer | ReadableStream.
- Output: Array of arrays or array of objects (if columns option used), or stream of records for streaming mode.

4. Error handling and streaming
- Parser emits 'error' event on stream on parse failures. Use callback err param for callback API.
- For large CSVs prefer streaming API to avoid buffering entire file.

SUPPLEMENTARY DETAILS
- For 'time,value' rows: set columns: true and use cast function to parse numeric: cast: (value, context) => { return context.column === 'value' ? parseFloat(value) : value }
- Use from_line: 2 to skip header when columns is not true and you want raw arrays.

REFERENCE DETAILS (API SPECIFICATIONS)
- parse(input, options?, callback?)
  - input: string|Buffer|ReadableStream
  - options: object (see options list above)
  - callback(err, records) optional for non-streaming use
- parse.sync(input, options?) -> records array

IMPLEMENTATION PATTERNS
- Loading time series CSV file:
  - Use fs.createReadStream(csvPath) and pipe to parse({ columns: true, trim: true, cast: ... }) to stream parsed objects.
  - For small files, use parse(fs.readFileSync(csvPath, 'utf8'), { columns: true, cast: true }) to obtain array synchronously.

TROUBLESHOOTING
- If numeric parsing yields empty strings, ensure trim and skip_empty_lines are set consistently and cast function handles empty values.
- If columns mapping is wrong, check delimiter and header row formatting.

DETAILED DIGEST
Source excerpt (top of page): csv-parse is a full-featured CSV parsing library for Node.js.
Retrieved: 2026-03-25
Crawl size: 59015 bytes

ATTRIBUTION
Source: https://csv.js.org/parse/
CSV (csv-parse) documentation (content retrieved 2026-03-25).