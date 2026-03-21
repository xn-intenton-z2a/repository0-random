# DATA_REPORT

Description

Generate a compact markdown report summarising one or more time series. Each dataset summary includes row count, min, max, mean, standard deviation, and a simple trend direction computed by a linear regression slope sign.

Interface

generateReport(datasets, options?) -> string

Inputs
- datasets: array of objects { name?: string, series: Array<{time,value}> }
- options: formatting options like decimalPlaces and includeHistogram (optional)

Output
- A markdown string containing a section per dataset with the following fields: name, row count, start time, end time, min value, max value, mean, stddev, linear-slope and trend direction (up/down/flat).

Acceptance Criteria

- generateReport returns a single markdown string containing one titled section per dataset and the numeric summaries described above.
- The markdown uses human-readable labels and includes a line with trend direction derived from the sign of the linear regression slope and the slope numeric value.

Tests

- Unit tests must assert that the returned value is a string and contains expected substrings for a small fixture dataset (row count, mean, and trend label).

Related documents

- library/PEARSON_CORRELATION.md (for trend validation via regression correlation)
