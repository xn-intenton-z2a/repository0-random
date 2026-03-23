# SLUGIFY

Summary

Provide a robust slugify function that converts arbitrary input strings into URL-friendly slugs. Behavior: treat null or undefined as an empty string; normalize Unicode to remove diacritics where possible; convert to lowercase; replace any sequence of non-alphanumeric characters with a single hyphen; trim leading and trailing hyphens; collapse multiple hyphens.

Acceptance Criteria

- Slugifying "Hello World!" returns "hello-world".
- Slugifying "  Foo -- Bar  " returns "foo-bar".
- Slugifying "café" returns "cafe".
- Null or undefined input returns an empty string.
- Unicode diacritics are removed where possible and results remain URL-safe.
- The function is exported as a named export from src/lib/main.js.
