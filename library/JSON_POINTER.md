TITLE: JSON_POINTER (RFC 6901)

TABLE OF CONTENTS
- Syntax and grammar summary
- Token unescaping rules
- Step-by-step evaluation algorithm
- Integration with $ref (URI fragment handling)
- Error conditions and edge cases
- Implementation notes and pseudocode steps
- Digest
- Attribution and data size

NORMALISED EXTRACT
Syntax
- A JSON Pointer is either the empty string "" (which references the entire document) or a sequence of reference tokens prefixed by "/". Example: "/definitions/person/name".

Token unescaping
- For each reference token, perform the following textual unescaping steps in this order:
  1. Replace each occurrence of "~1" with "/".
  2. Replace each occurrence of "~0" with "~".
- When a pointer is obtained from a URI fragment (the part after '#'), percent-decode the fragment first per RFC 3986, then apply the JSON Pointer unescaping above.

Evaluation algorithm (step-by-step)
1. If pointer is the empty string, evaluation result is the whole target document.
2. Otherwise split the pointer on '/' and ignore the leading empty element; each remaining item is a reference token.
3. For each token in sequence:
   a. Unescape the token using the rules above.
   b. If the current value is an object, interpret the token as the property name; if the property exists, set current to current[token]; else pointer evaluation fails (undefined/resolution error depending on caller).
   c. If the current value is an array, interpret the token as a base-10 array index; if it is a non-negative integer string and within bounds, set current to current[index]; else evaluation fails.
4. Return the final current value after processing all tokens.

Integration with $ref
- For JSON Schema $ref local resolution, the fragment component of the $ref URI is interpreted as a JSON Pointer after percent-decoding. Example: "$ref": "#/definitions/address" refers to pointer "/definitions/address" within the same document.
- Implementation must: extract fragment after '#', percent-decode it, then unescape ~1/~0, then traverse the document as above.
- Remote references (non-empty authority or scheme) are out-of-scope for resolving in this project and must cause an error.

Error conditions and edge cases
- Pointers whose token resolves to a missing property or out-of-range array index must be treated as unresolved — resolution should raise an error during schema pre-processing.
- Empty tokens are valid: a token can be the empty string when a path contains adjacent slashes ("//"), which corresponds to an empty property name.
- The implementation must detect and guard against cycles when repeatedly resolving $ref that reference each other; track resolution stack and throw on cycles.

IMPLEMENTATION NOTES (pseudocode steps)
- resolvePointer(doc, ptr):
  - if ptr == "": return doc
  - tokens = split(ptr, '/')[1:]
  - current = doc
  - for token in tokens:
      token = token.replace('~1','/').replace('~0','~')
      if isObject(current):
         if token in current: current = current[token] else throw
      else if isArray(current):
         if token is non-negative integer and token < current.length: current = current[parseInt(token)] else throw
      else throw
  - return current

DIGEST
- Extracted the JSON Pointer syntax and unescaping/evaluation algorithm required to implement local $ref resolution in JSON Schema processors.
- Retrieval date: 2026-03-21

ATTRIBUTION AND DATA SIZE
- Source: https://datatracker.ietf.org/doc/html/rfc6901
- Retrieved: 2026-03-21
- Bytes fetched: 69801 bytes
- Attribution: RFC 6901 - JSON Pointer
