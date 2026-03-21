// SPDX-License-Identifier: MIT
// Unit tests for JSON Schema diff engine
import { describe, test, expect } from "vitest";
import { diffSchemas, formatChanges, resolveLocalRefs, classifyChange } from "../../src/lib/main.js";

describe("JSON Schema diff core", () => {
  test("detects property removed and classifies required-removed as breaking", () => {
    const before = {
      type: "object",
      properties: {
        a: { type: "string" }
      },
      required: ["a"]
    };
    const after = {
      type: "object",
      properties: {}
    };
    const changes = diffSchemas(before, after);
    const removed = changes.find(c => c.changeType === 'property-removed' && c.path === '/properties/a');
    expect(removed).toBeDefined();
    expect(removed.classification).toBe('breaking');
  });

  test("detects property added and classifies as compatible", () => {
    const before = { type: 'object', properties: {} };
    const after = { type: 'object', properties: { name: { type: 'string' } } };
    const changes = diffSchemas(before, after);
    const added = changes.find(c => c.changeType === 'property-added' && c.path === '/properties/name');
    expect(added).toBeDefined();
    expect(added.classification).toBe('compatible');
  });

  test("detects type changes", () => {
    const before = { type: "object", properties: { age: { type: "string" } } };
    const after = { type: "object", properties: { age: { type: "number" } } };
    const changes = diffSchemas(before, after);
    const t = changes.find(c => c.changeType === 'type-changed' && c.path === '/properties/age');
    expect(t).toBeDefined();
    expect(t.before).toBe('string');
    expect(t.after).toBe('number');
    expect(t.classification).toBe('breaking');
  });

  test("detects required added as breaking", () => {
    const before = { type: 'object', properties: { name: { type: 'string' } } };
    const after = { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] };
    const changes = diffSchemas(before, after);
    const r = changes.find(c => c.changeType === 'required-added' && c.property === 'name');
    expect(r).toBeDefined();
    expect(r.classification).toBe('breaking');
  });

  test("detects required removed as compatible", () => {
    const before = { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] };
    const after = { type: 'object', properties: { id: { type: 'string' } } };
    const changes = diffSchemas(before, after);
    const r = changes.find(c => c.changeType === 'required-removed' && c.property === 'id');
    expect(r).toBeDefined();
    expect(r.classification).toBe('compatible');
  });

  test("detects enum add/remove and classifies appropriately", () => {
    const before = { type: 'object', properties: { f: { enum: ['a'] } } };
    const after = { type: 'object', properties: { f: { enum: ['a', 'b'] } } };
    const changes = diffSchemas(before, after);
    const added = changes.find(c => c.changeType === 'enum-value-added' && c.value === 'b');
    expect(added).toBeDefined();
    expect(added.classification).toBe('compatible');

    const changes2 = diffSchemas(after, before);
    const removed = changes2.find(c => c.changeType === 'enum-value-removed' && c.value === 'b');
    expect(removed).toBeDefined();
    expect(removed.classification).toBe('breaking');
  });

  test("resolves local $ref before diffing", () => {
    const before = {
      definitions: { emailDef: { type: 'string' } },
      type: 'object',
      properties: { email: { $ref: '#/definitions/emailDef' } }
    };
    const after = {
      definitions: { emailDef: { type: 'number' } },
      type: 'object',
      properties: { email: { $ref: '#/definitions/emailDef' } }
    };
    const changes = diffSchemas(before, after);
    const t = changes.find(c => c.changeType === 'type-changed' && c.path === '/properties/email');
    expect(t).toBeDefined();
    expect(t.before).toBe('string');
    expect(t.after).toBe('number');
  });

  test("throws on remote $ref", () => {
    const before = { type: 'object', properties: { x: { $ref: 'http://example.com/other.json#/def' } } };
    const after = { type: 'object', properties: { x: { $ref: 'http://example.com/other.json#/def' } } };
    expect(() => diffSchemas(before, after)).toThrow(/Remote \$ref not supported/);
  });

  test("formatChanges produces readable output", () => {
    const before = { type: 'object', properties: { x: { type: 'string' } } };
    const after = { type: 'object', properties: { x: { type: 'number' } } };
    const changes = diffSchemas(before, after);
    const text = formatChanges(changes);
    expect(typeof text).toBe('string');
    expect(text).toContain('type-changed');
  });

  test("detects description-changed", () => {
    const before = { type: 'object', properties: { email: { type: 'string', description: 'a' } } };
    const after = { type: 'object', properties: { email: { type: 'string', description: 'b' } } };
    const changes = diffSchemas(before, after);
    const d = changes.find(c => c.changeType === 'description-changed' && c.path === '/properties/email');
    expect(d).toBeDefined();
    expect(d.classification).toBe('informational');
  });

  test("detects nested-changed for nested property change", () => {
    const before = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: { street: { type: 'string' } },
          required: ['street']
        }
      }
    };
    const after = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: { street: { type: 'number' } }
        }
      }
    };
    const changes = diffSchemas(before, after);
    const nested = changes.find(c => c.changeType === 'nested-changed' && c.path === '/properties/address');
    expect(nested).toBeDefined();
    expect(nested.classification).toBe('breaking');
    const inner = nested.changes.find(c => c.changeType === 'type-changed' && c.path === '/properties/address/properties/street');
    expect(inner).toBeDefined();
  });

  test("detects items type change", () => {
    const before = { type: 'array', items: { type: 'string' } };
    const after = { type: 'array', items: { type: 'number' } };
    const changes = diffSchemas(before, after);
    const nested = changes.find(c => c.path === '/items' && c.changeType === 'nested-changed');
    expect(nested).toBeDefined();
    const inner = nested.changes.find(c => c.changeType === 'type-changed');
    expect(inner).toBeDefined();
    expect(inner.before).toBe('string');
    expect(inner.after).toBe('number');
  });

  test("detects allOf composition change", () => {
    const before = { allOf: [{ type: 'object', properties: { a: { type: 'string' } } }] };
    const after = { allOf: [{ type: 'object', properties: { a: { type: 'number' } } }] };
    const changes = diffSchemas(before, after);
    const comp = changes.find(c => c.changeType === 'nested-changed' && c.path === '/allOf');
    expect(comp).toBeDefined();
    const inner = comp.changes.find(c => c.changeType === 'type-changed' || c.changeType === 'nested-changed' || c.changeType === 'property-removed' || c.changeType === 'type-changed');
    expect(inner).toBeDefined();
  });
});
