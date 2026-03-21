// SPDX-License-Identifier: MIT
// Unit tests for JSON Schema diffing engine
import { describe, test, expect } from "vitest";
import { diffSchemas, formatChanges, classifyChange } from "../../src/lib/main.js";

describe("JSON Schema diff engine", () => {
  test("detects property added", () => {
    const before = { type: "object", properties: { name: { type: "string" } } };
    const after = { type: "object", properties: { name: { type: "string" }, age: { type: "integer" } } };
    const changes = diffSchemas(before, after);
    const added = changes.find((c) => c.changeType === "property-added" && c.path === "/properties/age");
    expect(added).toBeTruthy();
    expect(added.after).toEqual({ type: "integer" });
  });

  test("detects property removed and classifies breaking when it was required", () => {
    const before = { type: "object", properties: { email: { type: "string" } }, required: ["email"] };
    const after = { type: "object", properties: {} };
    const changes = diffSchemas(before, after);
    const removed = changes.find((c) => c.changeType === "property-removed" && c.path === "/properties/email");
    expect(removed).toBeTruthy();
    expect(removed.wasRequired).toBe(true);
    expect(classifyChange(removed)).toBe("breaking");
  });

  test("detects type changes in nested properties", () => {
    const before = { type: "object", properties: { age: { type: "string" } } };
    const after = { type: "object", properties: { age: { type: "number" } } };
    const changes = diffSchemas(before, after);
    const nested = changes.find((c) => c.changeType === "nested-changed" && c.path === "/properties/age");
    expect(nested).toBeTruthy();
    const typeChange = nested.changes.find((s) => s.changeType === "type-changed");
    expect(typeChange).toBeTruthy();
    expect(typeChange.before).toBe("string");
    expect(typeChange.after).toBe("number");
  });

  test("detects required added/removed", () => {
    const before = { type: "object", properties: { id: { type: "string" } }, required: [] };
    const after = { type: "object", properties: { id: { type: "string" } }, required: ["id"] };
    const changes = diffSchemas(before, after);
    const reqAdded = changes.find((c) => c.changeType === "required-added" && c.property === "id");
    expect(reqAdded).toBeTruthy();

    const changes2 = diffSchemas(after, before);
    const reqRemoved = changes2.find((c) => c.changeType === "required-removed" && c.property === "id");
    expect(reqRemoved).toBeTruthy();
  });

  test("detects enum value added and removed", () => {
    const before = { type: "string", enum: ["a", "b"] };
    const after = { type: "string", enum: ["a", "b", "c"] };
    const changes = diffSchemas(before, after);
    const added = changes.find((c) => c.changeType === "enum-value-added" && c.value === "c");
    expect(added).toBeTruthy();

    const changes2 = diffSchemas(after, before);
    const removed = changes2.find((c) => c.changeType === "enum-value-removed" && c.value === "c");
    expect(removed).toBeTruthy();
  });

  test("description changes are informational and formatted", () => {
    const before = { description: "old" };
    const after = { description: "new" };
    const changes = diffSchemas(before, after);
    const desc = changes.find((c) => c.changeType === "description-changed");
    expect(desc).toBeTruthy();
    const out = formatChanges(changes);
    expect(out).toContain("description changed");
  });

  test("resolves local $ref and diffs nested content", () => {
    const before = {
      definitions: { person: { type: "object", properties: { name: { type: "string" } } } },
      type: "object",
      properties: { p: { $ref: "#/definitions/person" } }
    };
    const after = {
      definitions: { person: { type: "object", properties: { name: { type: "number" } } } },
      type: "object",
      properties: { p: { $ref: "#/definitions/person" } }
    };
    const changes = diffSchemas(before, after);
    const nested = changes.find((c) => c.changeType === "/nested-changed" || c.changeType === "nested-changed");
    // find the nested change for property p
    const pChange = changes.find((c) => c.path === "/properties/p" && c.changeType === "nested-changed");
    expect(pChange).toBeTruthy();
    const nameChange = pChange.changes.find((c) => c.path === "/properties/p/properties/name" || c.changeType === "type-changed");
    // Walk nested to find type-changed
    const tc = pChange.changes.find((c) => c.changeType === "type-changed") || pChange.changes.flatMap(x => x.changes || []).find(cc => cc.changeType === "type-changed");
    expect(tc).toBeTruthy();
    expect(tc.before).toBe("string");
    expect(tc.after).toBe("number");
  });

  test("throws on remote $ref", () => {
    const before = { $ref: "http://example.com/schema" };
    const after = { $ref: "http://example.com/schema2" };
    expect(() => diffSchemas(before, after)).toThrow();
  });
});
