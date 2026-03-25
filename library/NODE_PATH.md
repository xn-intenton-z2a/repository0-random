NODE_PATH

Normalized extract
- The path module normalises and composes filesystem paths across platforms. Primary functions used in CLIs: path.join, path.resolve, path.basename, path.extname, path.dirname.

Table of Contents
- Common path helpers and exact return types
- Recommended usage patterns for safe file paths
- Reference signatures
- Detailed digest and retrieval metadata

Common path helpers and exact return types
- path.join(...paths: string[]): string — joins path segments using platform separator and normalises.
- path.resolve(...paths: string[]): string — resolves to an absolute path.
- path.basename(p: string, ext?: string): string — returns last portion of a path; ext removes extension if provided.
- path.extname(p: string): string — returns the extension including leading dot or empty string.
- path.dirname(p: string): string — returns directory portion.

Recommended usage patterns for safe file paths
- Create output paths with path.join(process.cwd(), 'out', filename) to avoid accidental relative path issues.
- Use path.extname to infer output type from filename and validate supported extensions (.svg, .png).

Reference signatures
- path.join(...paths: string[]): string
- path.resolve(...paths: string[]): string
- path.basename(path: string, ext?: string): string
- path.extname(path: string): string

Detailed digest and retrieval metadata
- Source: https://nodejs.org/api/path.html
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 95923

Attribution
- Condensed from Node.js official path module documentation.