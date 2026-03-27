SEMVER

NORMALISED EXTRACT

Table of contents
1. SemVer core rules (major.minor.patch)
2. Mapping schema changes to SemVer-style classification
3. Rules to map changes to breaking/compatible/informational

SemVer core rules (RFC 2.0 summary)
- A version is MAJOR.MINOR.PATCH. Increment the:
  - MAJOR version when you make incompatible API changes.
  - MINOR version when you add functionality in a backwards-compatible manner.
  - PATCH version when you make backwards-compatible bug fixes.
- For libraries that expose schemas as part of a public API, treat schema-breaking changes as MAJOR increments.

Mapping schema diffs to classification
- This project classifies changes as one of: breaking, compatible, informational. Use SemVer's meaning to inform classification:
  - breaking  -> MAJOR impact (incompatible change)
  - compatible -> MINOR/PATCH impact (backwards-compatible)
  - informational -> no version impact (documentation-only)

Concrete rules (apply in this order)
1. property-removed -> breaking
   - Rationale: clients relying on that property will break when it disappears.
2. required-added -> breaking
   - Rationale: clients that did not provide the property will now violate validation.
3. type-changed -> usually breaking; precise test:
   - Compute allowed type sets before and after. If intersection is empty, classify as breaking.
   - If intersection is non-empty but the after-type set is a strict subset of before-type set, treat as breaking (type narrowing).
   - If after-type set is a superset of before-type set, treat as compatible.
4. enum-value-removed -> breaking
   - Removing a permitted value causes formerly-valid instances to become invalid.
5. enum-value-added -> compatible
   - Adding a new allowed value increases acceptance.
6. required-removed -> compatible
   - Loosening requirements is backwards-compatible.
7. property-added -> compatible unless the new property is required (see required-added)
8. description-changed -> informational
9. nested-changed -> propagate the most severe classification of nested records (breaking > compatible > informational)

SUPPLEMENTARY DETAILS
- When classification is ambiguous (complex combiners, anyOf/oneOf), use conservative defaults: prefer marking as breaking.
- For automation: produce machine-readable change records with a classification field and a semverHint field ("major"|"minor"|"patch").

DETAILED DIGEST
- Source: Semantic Versioning 2.0.0 (retrieved 2026-03-27)
- Retrieved date: 2026-03-27
- Data size (crawl): ~31.9 KB

ATTRIBUTION
- URL: https://semver.org/spec/v2.0.0.html
