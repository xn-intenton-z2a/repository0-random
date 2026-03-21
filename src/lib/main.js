#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited

// Browser-safe identity plumbing (reads package.json in Node, fetches in browser)
const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description || "";

export function getIdentity() {
  return { name, version, description };
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

// -----------------------------
// JSON Pointer and $ref resolver
// -----------------------------

function decodePointerToken(token) {
  return token.replace(/~1/g, "/").replace(/~0/g, "~");
}

function getPointer(root, pointer) {
  // pointer must start with '#'
  if (pointer === "#") return root;
  if (!pointer.startsWith("#")) {
    throw new Error(`Remote $ref not supported: ${pointer}`);
  }
  const parts = pointer.slice(1).split("/").filter(Boolean).map(decodePointerToken);
  let node = root;
  for (const part of parts) {
    if (node && typeof node === "object" && Object.prototype.hasOwnProperty.call(node, part)) {
      node = node[part];
    } else {
      throw new Error(`Invalid JSON Pointer: ${pointer}`);
    }
  }
  return node;
}

function resolveLocalRefs(obj, root = obj, seen = new Map()) {
  if (obj && typeof obj === "object") {
    if (Object.prototype.hasOwnProperty.call(obj, "$ref") && typeof obj.$ref === "string") {
      const ref = obj.$ref;
      if (!ref.startsWith("#")) {
        throw new Error(`Remote $ref not supported: ${ref}`);
      }
      if (seen.has(ref)) {
        // return previously-resolved value to avoid cycles
        return seen.get(ref);
      }
      const target = getPointer(root, ref);
      // mark seen early with a placeholder to break cycles
      seen.set(ref, {});
      const resolved = resolveLocalRefs(target, root, seen);
      seen.set(ref, resolved);
      return resolved;
    }
    if (Array.isArray(obj)) {
      return obj.map((v) => resolveLocalRefs(v, root, seen));
    }
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = resolveLocalRefs(obj[k], root, seen);
    }
    return out;
  }
  return obj;
}

// -----------------------------
// Diffing core
// -----------------------------

function summariseSchema(schema) {
  if (!schema || typeof schema !== "object") return schema;
  if (schema.type) return { type: schema.type };
  return schema;
}

function arrayDiff(a = [], b = []) {
  const add = b.filter((x) => !a.includes(x));
  const removed = a.filter((x) => !b.includes(x));
  return { added: add, removed };
}

function compareSchemasInternal(b, a, path = "") {
  const diffs = [];

  // primitive/object type difference
  if (b && a && typeof b === "object" && typeof a === "object") {
    if (b.type !== undefined || a.type !== undefined) {
      if (b.type !== a.type) {
        diffs.push({ path, changeType: "type-changed", before: b.type, after: a.type });
      }
    }

    if ((b.description || "") !== (a.description || "")) {
      diffs.push({ path, changeType: "description-changed", before: b.description, after: a.description });
    }

    if (Array.isArray(b.enum) || Array.isArray(a.enum)) {
      const bEnum = Array.isArray(b.enum) ? b.enum : [];
      const aEnum = Array.isArray(a.enum) ? a.enum : [];
      for (const val of aEnum.filter((v) => !bEnum.includes(v))) {
        diffs.push({ path, changeType: "enum-value-added", value: val, before: bEnum.slice(), after: aEnum.slice() });
      }
      for (const val of bEnum.filter((v) => !aEnum.includes(v))) {
        diffs.push({ path, changeType: "enum-value-removed", value: val, before: bEnum.slice(), after: aEnum.slice() });
      }
    }

    // properties
    const bProps = b.properties || {};
    const aProps = a.properties || {};
    const bKeys = Object.keys(bProps);
    const aKeys = Object.keys(aProps);

    for (const key of aKeys.filter((k) => !bKeys.includes(k))) {
      diffs.push({ path: `${path}/properties/${key}`, changeType: "property-added", before: undefined, after: summariseSchema(aProps[key]) });
    }
    for (const key of bKeys.filter((k) => !aKeys.includes(k))) {
      const wasRequired = Array.isArray(b.required) && b.required.includes(key);
      diffs.push({ path: `${path}/properties/${key}`, changeType: "property-removed", before: summariseSchema(bProps[key]), after: undefined, wasRequired });
    }
    for (const key of bKeys.filter((k) => aKeys.includes(k))) {
      const nested = compareSchemasInternal(bProps[key], aProps[key], `${path}/properties/${key}`);
      if (nested.length) diffs.push({ path: `${path}/properties/${key}`, changeType: "nested-changed", changes: nested });
    }

    // required array changes (at this object level)
    const bReq = Array.isArray(b.required) ? b.required : [];
    const aReq = Array.isArray(a.required) ? a.required : [];
    for (const added of aReq.filter((x) => !bReq.includes(x))) {
      diffs.push({ path: `${path}/required`, changeType: "required-added", property: added, before: bReq.slice(), after: aReq.slice() });
    }
    for (const removed of bReq.filter((x) => !aReq.includes(x))) {
      diffs.push({ path: `${path}/required`, changeType: "required-removed", property: removed, before: bReq.slice(), after: aReq.slice() });
    }

    // items
    if (b.items || a.items) {
      if (b.items && a.items) {
        const nested = compareSchemasInternal(b.items, a.items, `${path}/items`);
        if (nested.length) diffs.push({ path: `${path}/items`, changeType: "nested-changed", changes: nested });
      } else if (!b.items && a.items) {
        diffs.push({ path: `${path}/items`, changeType: "property-added", before: undefined, after: summariseSchema(a.items) });
      } else if (b.items && !a.items) {
        diffs.push({ path: `${path}/items`, changeType: "property-removed", before: summariseSchema(b.items), after: undefined });
      }
    }

    // combinators
    for (const comb of ["allOf", "oneOf", "anyOf"]) {
      const bComb = Array.isArray(b[comb]) ? b[comb] : [];
      const aComb = Array.isArray(a[comb]) ? a[comb] : [];
      const max = Math.max(bComb.length, aComb.length);
      for (let i = 0; i < max; i++) {
        const bi = bComb[i];
        const ai = aComb[i];
        if (bi && ai) {
          const nested = compareSchemasInternal(bi, ai, `${path}/${comb}/${i}`);
          if (nested.length) diffs.push({ path: `${path}/${comb}/${i}`, changeType: "nested-changed", changes: nested });
        } else if (!bi && ai) {
          diffs.push({ path: `${path}/${comb}/${i}`, changeType: "property-added", before: undefined, after: summariseSchema(ai) });
        } else if (bi && !ai) {
          diffs.push({ path: `${path}/${comb}/${i}`, changeType: "property-removed", before: summariseSchema(bi), after: undefined });
        }
      }
    }
  } else {
    // one or both are non-objects
    if (b !== a) {
      diffs.push({ path, changeType: "type-changed", before: b, after: a });
    }
  }

  return diffs;
}

export function diffSchemas(before, after) {
  if (!before || !after) throw new Error("Both before and after schemas must be provided");
  const bResolved = resolveLocalRefs(before, before);
  const aResolved = resolveLocalRefs(after, after);
  return compareSchemasInternal(bResolved, aResolved, "");
}

// -----------------------------
// Classification
// -----------------------------

function severityRank(level) {
  switch (level) {
    case "informational": return 0;
    case "compatible": return 1;
    case "breaking": return 2;
    default: return 0;
  }
}

export function classifyChange(change) {
  if (!change) return "informational";
  const type = change.changeType;
  switch (type) {
    case "property-removed":
      return change.wasRequired ? "breaking" : "compatible";
    case "required-added":
      return "breaking";
    case "required-removed":
      return "compatible";
    case "type-changed":
      return "breaking";
    case "enum-value-removed":
      return "breaking";
    case "enum-value-added":
      return "compatible";
    case "description-changed":
      return "informational";
    case "property-added":
      return "compatible";
    case "nested-changed": {
      if (!Array.isArray(change.changes) || change.changes.length === 0) return "informational";
      let worst = "informational";
      for (const c of change.changes) {
        const s = classifyChange(c);
        if (severityRank(s) > severityRank(worst)) worst = s;
      }
      return worst;
    }
    default:
      return "informational";
  }
}

export function classifyChanges(changes) {
  if (!Array.isArray(changes)) return classifyChange(changes);
  let worst = "informational";
  for (const c of changes) {
    const s = classifyChange(c);
    if (severityRank(s) > severityRank(worst)) worst = s;
  }
  return worst;
}

// -----------------------------
// Formatting
// -----------------------------

export function formatChanges(changes, opts = { style: "text" }) {
  if (!Array.isArray(changes)) changes = [changes];
  if (opts.style === "json") return JSON.stringify(changes, null, 2);

  const lines = [];
  function render(c, indent = "") {
    const sev = classifyChange(c);
    switch (c.changeType) {
      case "type-changed":
        lines.push(`${indent}${c.path || "/"}: type changed from ${String(c.before)} to ${String(c.after)} (${sev})`);
        break;
      case "property-added":
        lines.push(`${indent}${c.path}: property added (${JSON.stringify(c.after)}) (${sev})`);
        break;
      case "property-removed":
        lines.push(`${indent}${c.path}: property removed (${c.wasRequired ? "was required" : "optional"}) (${sev})`);
        break;
      case "required-added":
        lines.push(`${indent}${c.path}: required added: ${c.property} (${sev})`);
        break;
      case "required-removed":
        lines.push(`${indent}${c.path}: required removed: ${c.property} (${sev})`);
        break;
      case "enum-value-added":
        lines.push(`${indent}${c.path}: enum value added: ${JSON.stringify(c.value)} (${sev})`);
        break;
      case "enum-value-removed":
        lines.push(`${indent}${c.path}: enum value removed: ${JSON.stringify(c.value)} (${sev})`);
        break;
      case "description-changed":
        lines.push(`${indent}${c.path}: description changed (${sev})`);
        break;
      case "nested-changed":
        lines.push(`${indent}${c.path}: nested changes (${sev}):`);
        for (const sub of c.changes) render(sub, indent + "  ");
        break;
      default:
        lines.push(`${indent}${c.path}: ${c.changeType} (${sev})`);
        break;
    }
  }

  for (const c of changes) render(c, "");
  return lines.join("\n");
}

export default { name, version, description, getIdentity, main, diffSchemas, formatChanges, classifyChange, classifyChanges };

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
