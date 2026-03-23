# STRIP_HTML

Summary

Implement stripHtml that removes HTML tags and decodes common HTML entities. Behavior: treat null or undefined as an empty string; remove tags including nested tags; decode common named entities such as &amp; &lt; &gt; &quot; &apos; and non-breaking space; decode numeric entities where feasible.

Acceptance Criteria

- stripHtml applied to "<p>Hello &amp; welcome</p>" returns "Hello & welcome".
- stripHtml applied to "<div><span>Text</span></div>" returns "Text".
- Null or empty input returns an empty string.
- The function is exported as a named export from src/lib/main.js.
