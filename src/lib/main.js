#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

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

// JSON Schema diff implementation
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function escapePointerSegment(str) {
  return String(str).replace(/~/g, "~0").replace(/\//g, "~1");
}

function unescapePointerSegment(str) {
  return String(str).replace(/~1/g, "/").replace(/~0/g, "~");
}

function getByPointer(root, ref) {
  if (typeof ref !== 'string') return undefined;
  if (!ref.startsWith('#')) return undefined;
  const pointer = ref.slice(1);
  if (pointer === '') return root;
  const parts = pointer.split('/').slice(1);
  let cur = root;
  for (const raw of parts) {
    const key = unescapePointerSegment(raw);
    if (cur && typeof cur === 'object' && key in cur) {
      cur = cur[key];
    } else {
      return undefined;
    }
  }
  return cur;
}

function deref(schema, root) {
  if (schema === null || typeof schema !== 'object') return schema;
  if (Array.isArray(schema)) return schema.map((s) => deref(s, root));
  if (schema.$ref) {
    const ref = schema.$ref;
    if (typeof ref !== 'string') throw new Error('Invalid $ref: ' + String(ref));
    if (!ref.startsWith('#')) throw new Error('Remote $ref encountered: ' + ref);
    const target = getByPointer(root, ref);
    if (typeof target === 'undefined') throw new Error('Unresolved local $ref: ' + ref);
    const resolved = deref(deepClone(target), root);
    const merged = deepClone(resolved);
    for (const k of Object.keys(schema)) {
      if (k === '$ref') continue;
      merged[k] = deref(schema[k], root);
    }
    return merged;
  }
  const out = {};
  for (const [k, v] of Object.entries(schema)) {
    out[k] = deref(v, root);
  }
  return out;
}

function joinPath(path, suffix) {
  // path is '' for root
  return (path === '' ? '' : path) + '/' + suffix;
}

function getPropertyParent(path) {
  // returns '/properties/<name>' if path points inside or at that property, else null
  if (!path.startsWith('/properties/')) return null;
  const rest = path.slice('/properties/'.length);
  const idx = rest.indexOf('/');
  const name = idx === -1 ? rest : rest.slice(0, idx);
  return '/properties/' + name;
}

function diffNode(b, a, path, out) {
  // accumulate raw change events into `out` with paths pointing to exact locations
  b = b || {};
  a = a || {};

  // description
  if (typeof b.description !== 'undefined' || typeof a.description !== 'undefined') {
    if (b.description !== a.description) {
      out.push({ path: path || '/', changeType: 'description-changed', before: b.description, after: a.description });
    }
  }

  // type
  if (typeof b.type !== 'undefined' && typeof a.type !== 'undefined' && b.type !== a.type) {
    out.push({ path: path || '/', changeType: 'type-changed', before: b.type, after: a.type });
  }

  // enum
  if (Array.isArray(b.enum) || Array.isArray(a.enum)) {
    const benum = Array.isArray(b.enum) ? b.enum : [];
    const aenum = Array.isArray(a.enum) ? a.enum : [];
    for (const v of benum) {
      if (!aenum.includes(v)) out.push({ path: (path || '') + '/enum', changeType: 'enum-value-removed', before: v, after: undefined });
    }
    for (const v of aenum) {
      if (!benum.includes(v)) out.push({ path: (path || '') + '/enum', changeType: 'enum-value-added', before: undefined, after: v });
    }
  }

  // required
  const breq = Array.isArray(b.required) ? b.required : [];
  const areq = Array.isArray(a.required) ? a.required : [];
  for (const v of breq) {
    if (!areq.includes(v)) out.push({ path: (path || '') + '/required', changeType: 'required-removed', before: breq.slice(), after: areq.slice(), property: v });
  }
  for (const v of areq) {
    if (!breq.includes(v)) out.push({ path: (path || '') + '/required', changeType: 'required-added', before: breq.slice(), after: areq.slice(), property: v });
  }

  // properties
  const bprops = b.properties || {};
  const aprops = a.properties || {};
  const allKeys = new Set([...Object.keys(bprops), ...Object.keys(aprops)]);
  for (const key of allKeys) {
    const bp = bprops[key];
    const ap = aprops[key];
    const ppath = (path === '' ? '' : path) + '/properties/' + escapePointerSegment(key);
    if (typeof bp !== 'undefined' && typeof ap === 'undefined') {
      out.push({ path: ppath, changeType: 'property-removed', before: bp, after: undefined });
      continue;
    }
    if (typeof bp === 'undefined' && typeof ap !== 'undefined') {
      out.push({ path: ppath, changeType: 'property-added', before: undefined, after: ap });
      continue;
    }
    // both exist -> recurse. child changes are pushed into `out` with full paths
    diffNode(bp, ap, ppath, out);
  }

  // items
  if (typeof b.items !== 'undefined' || typeof a.items !== 'undefined') {
    const bi = b.items;
    const ai = a.items;
    if (Array.isArray(bi) || Array.isArray(ai)) {
      const bArr = Array.isArray(bi) ? bi : [];
      const aArr = Array.isArray(ai) ? ai : [];
      const max = Math.max(bArr.length, aArr.length);
      for (let i = 0; i < max; i++) {
        const nb = bArr[i];
        const na = aArr[i];
        const idxPath = (path === '' ? '' : path) + '/items/' + i;
        if (typeof nb === 'undefined' && typeof na !== 'undefined') {
          out.push({ path: idxPath, changeType: 'property-added', before: undefined, after: na });
          continue;
        }
        if (typeof nb !== 'undefined' && typeof na === 'undefined') {
          out.push({ path: idxPath, changeType: 'property-removed', before: nb, after: undefined });
          continue;
        }
        diffNode(nb, na, idxPath, out);
      }
    } else if (bi && ai) {
      const idxPath = (path === '' ? '' : path) + '/items';
      diffNode(bi, ai, idxPath, out);
    }
  }

  // combiners
  for (const combiner of ['allOf', 'oneOf', 'anyOf']) {
    if (Array.isArray(b[combiner]) || Array.isArray(a[combiner])) {
      const barr = Array.isArray(b[combiner]) ? b[combiner] : [];
      const aarr = Array.isArray(a[combiner]) ? a[combiner] : [];
      const max = Math.max(barr.length, aarr.length);
      for (let i = 0; i < max; i++) {
        const nb = barr[i];
        const na = aarr[i];
        const idxPath = (path === '' ? '' : path) + '/' + combiner + '/' + i;
        if (typeof nb === 'undefined' && typeof na !== 'undefined') {
          out.push({ path: idxPath, changeType: 'property-added', before: undefined, after: na });
          continue;
        }
        if (typeof nb !== 'undefined' && typeof na === 'undefined') {
          out.push({ path: idxPath, changeType: 'property-removed', before: nb, after: undefined });
          continue;
        }
        diffNode(nb, na, idxPath, out);
      }
    }
  }
}

function condenseRawChanges(raw) {
  // Group deeper changes under their immediate property parent and emit nested-changed entries
  const retained = [];
  const parentMap = new Map();
  for (const ch of raw) {
    const parent = getPropertyParent(ch.path);
    if (parent && ch.path !== parent) {
      if (!parentMap.has(parent)) parentMap.set(parent, []);
      parentMap.get(parent).push(ch);
    } else {
      retained.push(ch);
    }
  }
  // create nested-changed wrappers
  for (const [parent, children] of parentMap.entries()) {
    const mapped = children.map(c => {
      const copy = { ...c };
      copy.path = parent;
      return copy;
    });
    retained.push({ path: parent, changeType: 'nested-changed', changes: mapped });
  }
  return retained;
}

function diffSchemas(beforeSchema, afterSchema) {
  const beforeRoot = deepClone(beforeSchema || {});
  const afterRoot = deepClone(afterSchema || {});
  const b = deref(beforeRoot, beforeRoot);
  const a = deref(afterRoot, afterRoot);
  const raw = [];
  diffNode(b, a, '', raw);
  const condensed = condenseRawChanges(raw);
  return condensed;
}

function classifyChange(change) {
  if (!change || !change.changeType) return 'informational';
  switch (change.changeType) {
    case 'property-removed':
    case 'required-removed':
    case 'type-changed':
      return 'breaking';
    case 'description-changed':
      return 'informational';
    case 'property-added':
    case 'required-added':
    case 'enum-value-added':
    case 'enum-value-removed':
    case 'nested-changed':
    default:
      return 'compatible';
  }
}

function renderChanges(changes, opts = { format: 'text' }) {
  const format = opts.format || 'text';
  if (format === 'json') {
    return deepClone(changes || []);
  }
  function renderList(list, indent = '') {
    const lines = [];
    for (const ch of list) {
      if (ch.changeType === 'nested-changed' && Array.isArray(ch.changes)) {
        lines.push(`${indent}- nested-changed at ${ch.path}`);
        lines.push(...renderList(ch.changes, indent + '  '));
      } else {
        let line = `${indent}- ${ch.changeType} at ${ch.path}`;
        if (typeof ch.before !== 'undefined' && typeof ch.after !== 'undefined') {
          const before = typeof ch.before === 'object' ? JSON.stringify(ch.before) : String(ch.before);
          const after = typeof ch.after === 'object' ? JSON.stringify(ch.after) : String(ch.after);
          line += ` (before: ${before} -> after: ${after})`;
        } else if (typeof ch.before !== 'undefined') {
          line += ` (before: ${typeof ch.before === 'object' ? JSON.stringify(ch.before) : String(ch.before)})`;
        } else if (typeof ch.after !== 'undefined') {
          line += ` (after: ${typeof ch.after === 'object' ? JSON.stringify(ch.after) : String(ch.after)})`;
        }
        lines.push(line);
      }
    }
    return lines;
  }
  return renderList(changes).join('\n');
}

export { diffSchemas, renderChanges, classifyChange };

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
