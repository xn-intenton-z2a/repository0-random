# README_COMPARISON

Purpose

Update the repository README to include a concise comparison table that shows the encoded length of a canonical test UUID across encodings and instructions for reproducing the measurements using the public API.

Table requirements

- Include rows for Hex (32), base64 without padding (22), base62, base85, base91 and the densest extended encoding implemented by the library.
- Show the actual encoded length for a canonical example UUID for each encoding.
- Highlight which encoding produces the shortest representation and confirm it is below 22 characters.

Acceptance Criteria

1) README contains a comparison table documented in the README that matches live results produced by the library.
2) The README includes a short instruction block referencing the public API functions encode, decode and defineEncoding and explains how to reproduce the table values.
