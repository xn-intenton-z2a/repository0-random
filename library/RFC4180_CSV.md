Table of contents
- RFC 4180 CSV rules summary
- Quoting rules and escaping
- Line endings and headers
- Safe parsing algorithm (state machine)
- Implementation steps and edge cases
- Reference method signatures
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
RFC 4180 CSV rules summary
- Each record is located on a separate line, delimited by a line break (CRLF). Many implementations accept LF only.
- Within the header and each record, there may be one or more fields, separated by commas.
- Fields that contain embedded commas, double-quotes, or line breaks must be enclosed in double-quotes.
- If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.
- Optional header record may be present as first line.

Quoting rules and escaping
- Quoted field example: "a,b" yields field a,b.
- Embedded double-quote example: "She said ""Hi""" yields She said "Hi".

Line endings and headers
- RFC specifies CRLF but robust parsers accept LF alone; preserve original line endings if required.
- If header option true, map subsequent rows to object keyed by header names.

Safe parsing algorithm (finite state machine)
States: START_FIELD, IN_QUOTED_FIELD, IN_UNQUOTED_FIELD, AFTER_QUOTE
Algorithm (char-by-char):
1. START_FIELD: if char == '"' -> IN_QUOTED_FIELD; else if char == ',' -> emit empty field; else if char == CR or LF -> emit field and record; else -> IN_UNQUOTED_FIELD and append char.
2. IN_QUOTED_FIELD: if char == '"' -> AFTER_QUOTE; else append char (including CR/LF allowed inside quoted field).
3. AFTER_QUOTE: if char == '"' -> append '"' (escaped quote) and return to IN_QUOTED_FIELD; else if char == ',' -> emit field and move to START_FIELD; else if CR/LF -> emit field and record; else error per strict mode or treat as end-of-field then continue per permissive mode.
4. IN_UNQUOTED_FIELD: if char == ',' -> emit field; else if CR/LF -> emit field and record; else append char.
End-of-input: emit last field and record.

Implementation steps
1. Read text as UTF-8 string.
2. Iterate characters using the FSM above.
3. Optionally trim fields if configured and map rows to objects if header present.
4. Provide options for delimiter override, strict mode, and line-ending handling.

Reference method signatures
parseCSV(text: string, options?: {delimiter?: string, header?: boolean, strict?: boolean}) => Array<Array<string>> | Array<Object>
parseCSVStream(stream, options?) => async iterator of rows

Detailed digest (retrieval)
Source: https://datatracker.ietf.org/doc/html/rfc4180
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 58764
Technical content extracted: RFC 4180 CSV canonical rules, quoting and escaping conventions, CRLF recommendation and a robust FSM parsing algorithm for implementation.

Attribution
Content derived and normalised from: RFC 4180 — Common Format and MIME Type for Comma-Separated Values (CSV) Files (https://datatracker.ietf.org/doc/html/rfc4180). Data size recorded above.