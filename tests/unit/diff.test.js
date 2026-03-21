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

  test("formatChanges produces readable output", () => {
    const before = { type: 'object', properties: { x: { type: 'string' } } };
    const after = { type: 'object', properties: { x: { type: 'number' } } };
    const changes = diffSchemas(before, after);
    const text = formatChanges(changes);
    expect(typeof text).toBe('string');
    expect(text).toContain('type-changed');
  });
});
