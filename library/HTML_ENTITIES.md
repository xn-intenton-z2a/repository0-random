Title: HTML_ENTITIES

Source: MDN Glossary — Entity
URL: https://developer.mozilla.org/en-US/docs/Glossary/Entity
Retrieved: 2026-03-24
Size (bytes): approximate (fetched HTML saved to /tmp/src2.html)

Table of contents:
- Definition and usage
- Common named entities and numeric entities
- Decoding strategies in JavaScript
- Edge cases and invalid entities

Normalised extract (technical points):
Definition and usage
HTML character entities are sequences beginning with & and ending with ; that represent characters not easily typed or that have special meaning in HTML (e.g., &amp; for &).

Common named and numeric entities
- Named entities: &amp; &lt; &gt; &quot; &apos; and many others for accented letters and symbols.
- Numeric entities: decimal (&#DDDD;) and hexadecimal (&#xHHHH;).

Decoding strategies in JavaScript
- DOM parsing approach: create a DOM element, set innerHTML to the string, and read textContent (safe in browser environment) to decode entities.
  - Example approach: const d = document.createElement('div'); d.innerHTML = s; const decoded = d.textContent;
- Map-based approach: for a small set of entities, provide a lookup map and replace occurrences using regex match /(amp|lt|gt|quot|apos)/ and map lookup.
- Library approach: use a robust entity decoder (e.g., node 'he' package) for comprehensive support; but mission forbids runtime deps — prefer DOM approach in browser and a conservative map for Node.

Edge cases and invalid entities
- Some browsers are permissive with missing semicolons; robust decoders validate and optionally tolerate missing semicolons.
- Use Unicode normalization after decoding if subsequent processing must be stable.

Reference details (implementation-ready):
- Minimal decode function (Node-compatible without DOM):
  - Provide a small map for common entities: {"amp":"&","lt":"<","gt":">","quot":"\"","apos":"'"}
  - Replacement regex: /&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);?/g
  - For numeric entities: parseInt(hex or dec) then String.fromCodePoint(value)
  - For named entities: map lookup
- Browser DOM method: createElement + innerHTML -> textContent; safe for decoding most entities.

Detailed digest:
- Key decoding techniques and the canonical entity list concept extracted from MDN Glossary — Entity (retrieved 2026-03-24). HTML saved to /tmp/src2.html.

Attribution:
MDN Web Docs — Entity (Glossary). URL as above. Data fetched on 2026-03-24.
