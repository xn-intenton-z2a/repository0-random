// SPDX-License-Identifier: MIT
// Unit tests for JSON Schema diff engine
import { describe, test, expect } from 'vitest';
import { diffSchemas, renderChanges, classifyChange } from '../../src/lib/main.js';

describe('Schema diff engine', () => {
  test('diffSchemas returns an array', () => {
    const before = { type: 'object', properties: {} };
    const after = { type: 'object', properties: {} };
    const changes = diffSchemas(before, after);
    expect(Array.isArray(changes)).toBe(true);
  });

  test('detects property-added and property-removed', () => {
    const before = { type: 'object', properties: { age: { type: 'number' } } };
    const after = { type: 'object', properties: {} };
    const changes = diffSchemas(before, after);
    expect(changes.some(c => c.changeType === 'property-removed' && c.path === '/properties/age')).toBe(true);

    const changes2 = diffSchemas(after, before);
    expect(changes2.some(c => c.changeType === 'property-added' && c.path === '/properties/age')).toBe(true);
  });

  test('detects type-changed', () => {
    const before = { type: 'object', properties: { age: { type: 'number' } } };
    const after = { type: 'object', properties: { age: { type: 'string' } } };
    const changes = diffSchemas(before, after);
    expect(changes.some(c => c.changeType === 'type-changed' && c.path === '/properties/age')).toBe(true);
  });

  test('detects required-added and required-removed', () => {
    const before = { type: 'object', required: ['id'], properties: { id: { type: 'string' } } };
    const after = { type: 'object', required: [], properties: { id: { type: 'string' } } };
    const changes = diffSchemas(before, after);
    expect(changes.some(c => c.changeType === 'required-removed' && c.path === '/required')).toBe(true);
    const rec = changes.find(c => c.changeType === 'required-removed');
    expect(classifyChange(rec)).toBe('breaking');
  });

  test('detects enum value changes', () => {
    const before = { type: 'string', enum: ['a','b'] };
    const after = { type: 'string', enum: ['a','b','c'] };
    const changes = diffSchemas(before, after);
    expect(changes.some(c => c.changeType === 'enum-value-added' && c.after === 'c')).toBe(true);
  });

  test('detects description-changed', () => {
    const before = { description: 'old' };
    const after = { description: 'new' };
    const changes = diffSchemas(before, after);
    expect(changes.some(c => c.changeType === 'description-changed')).toBe(true);
    const rec = changes.find(c => c.changeType === 'description-changed');
    expect(classifyChange(rec)).toBe('informational');
  });

  test('detects nested-changed for nested properties', () => {
    const before = {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: { street: { type: 'string' } }
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
    expect(nested).toBeTruthy();
    expect(nested.changes.some(sc => sc.changeType === 'type-changed' && sc.path === '/properties/address')).toBe(true);
  });

  test('resolves local $ref and reports nested diffs', () => {
    const before = {
      definitions: { adr: { type: 'object', properties: { city: { type: 'string' } } } },
      type: 'object',
      properties: { addr: { $ref: '#/definitions/adr' } }
    };
    const after = {
      definitions: { adr: { type: 'object', properties: { city: { type: 'number' } } } },
      type: 'object',
      properties: { addr: { $ref: '#/definitions/adr' } }
    };
    const changes = diffSchemas(before, after);
    const nested = changes.find(c => c.path === '/properties/addr');
    expect(nested).toBeTruthy();
    expect(nested.changeType).toBe('nested-changed');
    expect(nested.changes.some(c => c.changeType === 'type-changed')).toBe(true);
  });

  test('throws on remote $ref', () => {
    const before = { type: 'object', properties: { a: { $ref: 'https://example.com/schemas/def.json#/x' } } };
    const after = {};
    expect(() => diffSchemas(before, after)).toThrow(/Remote \$ref encountered/);
  });

  test('renderChanges returns text and json', () => {
    const before = { type: 'object', properties: { age: { type: 'number' } } };
    const after = { type: 'object', properties: { age: { type: 'string' } } };
    const changes = diffSchemas(before, after);
    const txt = renderChanges(changes, { format: 'text' });
    expect(typeof txt).toBe('string');
    expect(txt).toContain('type-changed');
    const json = renderChanges(changes, { format: 'json' });
    expect(Array.isArray(json)).toBe(true);
  });
});
