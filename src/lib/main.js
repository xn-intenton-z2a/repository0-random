#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch (e) {
    pkg = { name: "repo", version: "0.0.0", description: "" };
  }
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title || "repo", version: "0.0.0", description: "" };
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

// --- JSON Pointer and $ref resolver ---
function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}

function decodePointerSegment(seg) {
  return seg.replace(/~1/g, "/").replace(/~0/g, "~");
}

export function getByPointer(root, pointer) {
  if (!pointer) return undefined;
  // pointer may start with '#'
  let p = pointer.replace(/^#/, "");
  if (p === "") return root;
  const parts = p.split(/\//).filter(Boolean).map(decodePointerSegment);
  let cur = root;
  for (const part of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, part)) {
      cur = cur[part];
    } else {
      return undefined;
    }
  }
  return cur;
}

function resolveNode(node, root, stack = []) {
  if (node && typeof node === "object") {
    if (Array.isArray(node)) {
      return node.map((item) => resolveNode(item, root, stack));
    }
    if (node.$ref && typeof node.$ref === "string") {
      const ref = node.$ref;
      if (!ref.startsWith("#")) {
        throw new Error(`Remote $ref not supported: ${ref}`);
      }
      if (stack.includes(ref)) {
        throw new Error(`Circular $ref detected: ${ref}`);
      }
      const target = getByPointer(root, ref);
      if (typeof target === "undefined") {
        throw new Error(`$ref pointer not found: ${ref}`);
      }
      stack.push(ref);
      const resolved = resolveNode(deepClone(target), root, stack);
      stack.pop();
      return resolved;
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = resolveNode(v, root, stack);
    }
    return out;
  }
  return node;
}

export function resolveLocalRefs(schema) {
  return resolveNode(deepClone(schema), schema, []);
}

// --- Diff engine helpers ---
function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function getType(schema) {
  if (!schema || typeof schema !== "object") return undefined;
  if (schema.type) return Array.isArray(schema.type) ? schema.type.join("|") : schema.type;
  if (schema.enum) return "enum";
  if (schema.properties) return "object";
  if (schema.items) return "array";
  return undefined;
}

function aggregateClassification(changes) {
  // breaking > compatible > informational
  if (!changes || changes.length === 0) return "informational";
  if (changes.some((c) => c.classification === "breaking")) return "breaking";
  if (changes.some((c) => c.classification === "compatible")) return "compatible";
  return "informational";
}

export function classifyChange(change) {
  switch (change.changeType) {
    case "property-removed":
      return change.required === true ? "breaking" : "compatible";
    case "property-added":
      return "compatible";
    case "type-changed":
      // conservative choice: treat type changes as breaking
      return "breaking";
    case "required-added":
      return "breaking";
    case "required-removed":
      return "compatible";
    case "enum-value-added":
      return "compatible";
    case "enum-value-removed":
      return "breaking";
    case "description-changed":
      return "informational";
    case "nested-changed":
      return aggregateClassification(change.changes || []);
    default:
      return "informational";
  }
}

function pushChange(changes, change) {
  if (!change.classification) change.classification = classifyChange(change);
  changes.push(change);
}

function compareSchemas(oldNode = {}, newNode = {}, path = "", checkNodeType = true) {
  const changes = [];

  // node-level type change (useful for items and composition elements)
  if (checkNodeType) {
    const oldNodeType = getType(oldNode);
    const newNodeType = getType(newNode);
    if (oldNodeType !== undefined && newNodeType !== undefined && oldNodeType !== newNodeType) {
      pushChange(changes, {
        path: path || "",
        changeType: "type-changed",
        before: oldNodeType,
        after: newNodeType,
      });
    }
  }

  // properties
  const oldProps = (isObject(oldNode) && oldNode.properties) || {};
  const newProps = (isObject(newNode) && newNode.properties) || {};
  const oldKeys = Object.keys(oldProps);
  const newKeys = Object.keys(newProps);

  for (const key of oldKeys) {
    if (!newProps.hasOwnProperty(key)) {
      const required = Array.isArray(oldNode.required) && oldNode.required.includes(key);
      pushChange(changes, {
        path: `${path}/properties/${key}`,
        changeType: "property-removed",
        before: getType(oldProps[key]) || null,
        required: !!required,
      });
    }
  }

  for (const key of newKeys) {
    if (!oldProps.hasOwnProperty(key)) {
      pushChange(changes, {
        path: `${path}/properties/${key}`,
        changeType: "property-added",
        after: getType(newProps[key]) || null,
      });
    }
  }

  // properties present in both
  for (const key of oldKeys.filter((k) => newKeys.includes(k))) {
    const oldProp = oldProps[key] || {};
    const newProp = newProps[key] || {};
    const currentPath = `${path}/properties/${key}`;

    // type change for the property itself
    const oldType = getType(oldProp);
    const newType = getType(newProp);
    if (oldType !== undefined && newType !== undefined && oldType !== newType) {
      pushChange(changes, {
        path: currentPath,
        changeType: "type-changed",
        before: oldType,
        after: newType,
      });
    }

    // description changed
    if ((oldProp.description || "") !== (newProp.description || "")) {
      pushChange(changes, {
        path: currentPath,
        changeType: "description-changed",
        before: oldProp.description || "",
        after: newProp.description || "",
      });
    }

    // enum changes
    if (Array.isArray(oldProp.enum) || Array.isArray(newProp.enum)) {
      const oldEnum = Array.isArray(oldProp.enum) ? oldProp.enum : [];
      const newEnum = Array.isArray(newProp.enum) ? newProp.enum : [];
      for (const v of newEnum.filter((x) => !oldEnum.includes(x))) {
        pushChange(changes, {
          path: currentPath,
          changeType: "enum-value-added",
          value: v,
        });
      }
      for (const v of oldEnum.filter((x) => !newEnum.includes(x))) {
        pushChange(changes, {
          path: currentPath,
          changeType: "enum-value-removed",
          value: v,
        });
      }
    }

    // nested schemas (recurse but avoid duplicate type checks already handled above)
    const nestedChanges = compareSchemas(oldProp, newProp, currentPath, false);
    if (nestedChanges.length > 0) {
      pushChange(changes, {
        path: currentPath,
        changeType: "nested-changed",
        changes: nestedChanges,
      });
    }
  }

  // items (arrays)
  const oldItems = oldNode && oldNode.items;
  const newItems = newNode && newNode.items;
  if (oldItems && !newItems) {
    pushChange(changes, {
      path: `${path}/items`,
      changeType: "nested-changed",
      changes: [{ path: `${path}/items`, changeType: "property-removed", before: getType(oldItems) || null }],
    });
  } else if (!oldItems && newItems) {
    pushChange(changes, {
      path: `${path}/items`,
      changeType: "nested-changed",
      changes: [{ path: `${path}/items`, changeType: "property-added", after: getType(newItems) || null }],
    });
  } else if (oldItems && newItems) {
    const itemChanges = compareSchemas(oldItems, newItems, `${path}/items`, true);
    if (itemChanges.length > 0) {
      pushChange(changes, {
        path: `${path}/items`,
        changeType: "nested-changed",
        changes: itemChanges,
      });
    }
  }

  // composition keywords: allOf, oneOf, anyOf
  for (const kw of ["allOf", "oneOf", "anyOf"]) {
    const oldArr = Array.isArray(oldNode && oldNode[kw]) ? oldNode[kw] : [];
    const newArr = Array.isArray(newNode && newNode[kw]) ? newNode[kw] : [];
    const maxLen = Math.max(oldArr.length, newArr.length);
    const compChanges = [];
    for (let i = 0; i < maxLen; i++) {
      const o = oldArr[i];
      const n = newArr[i];
      if (o && !n) {
        compChanges.push({ path: `${path}/${kw}/${i}`, changeType: "property-removed", before: getType(o) || null });
      } else if (!o && n) {
        compChanges.push({ path: `${path}/${kw}/${i}`, changeType: "property-added", after: getType(n) || null });
      } else if (o && n) {
        const sub = compareSchemas(o, n, `${path}/${kw}/${i}`, true);
        if (sub.length > 0) compChanges.push(...sub);
      }
    }
    if (compChanges.length > 0) {
      pushChange(changes, { path: `${path}/${kw}`, changeType: "nested-changed", changes: compChanges });
    }
  }

  // required array changes for this object
  const oldReq = Array.isArray(oldNode.required) ? oldNode.required : [];
  const newReq = Array.isArray(newNode.required) ? newNode.required : [];
  for (const added of newReq.filter((r) => !oldReq.includes(r))) {
    pushChange(changes, {
      path: `${path}/required`,
      changeType: "required-added",
      property: added,
    });
  }
  for (const removed of oldReq.filter((r) => !newReq.includes(r))) {
    pushChange(changes, {
      path: `${path}/required`,
      changeType: "required-removed",
      property: removed,
    });
  }

  return changes;
}

export function diffSchemas(oldSchema, newSchema) {
  if (!oldSchema || !newSchema) return [];
  const left = resolveLocalRefs(oldSchema);
  const right = resolveLocalRefs(newSchema);
  const changes = compareSchemas(left, right, "", true);
  return changes;
}

export function formatChanges(changes, indent = 0) {
  const pad = (n) => "".padStart(n, " ");
  let out = "";
  for (const c of changes) {
    const line = `${pad(indent)}- [${c.classification}] ${c.changeType} at ${c.path}`;
    out += line + "\n";
    if (c.changeType === "type-changed") {
      out += `${pad(indent + 2)}before: ${c.before}\n`;
      out += `${pad(indent + 2)}after: ${c.after}\n`;
    }
    if (c.changeType === "property-added" || c.changeType === "property-removed") {
      if (c.before !== undefined) out += `${pad(indent + 2)}before: ${c.before}\n`;
      if (c.after !== undefined) out += `${pad(indent + 2)}after: ${c.after}\n`;
    }
    if (c.changeType === "description-changed") {
      out += `${pad(indent + 2)}before: ${c.before}\n`;
      out += `${pad(indent + 2)}after: ${c.after}\n`;
    }
    if (c.changeType === "enum-value-added" || c.changeType === "enum-value-removed") {
      out += `${pad(indent + 2)}value: ${JSON.stringify(c.value)}\n`;
    }
    if (c.changeType === "required-added" || c.changeType === "required-removed") {
      out += `${pad(indent + 2)}property: ${c.property}\n`;
    }
    if (c.changeType === "nested-changed" && Array.isArray(c.changes)) {
      out += `${pad(indent + 2)}nested:\n`;
      out += formatChanges(c.changes, indent + 4) + "\n";
    }
  }
  return out.trimEnd();
}

// Run as CLI
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
