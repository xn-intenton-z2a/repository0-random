// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import {
  slugify,
  truncate,
  camelCase,
  kebabCase,
  titleCase,
  wordWrap,
  stripHtml,
  escapeRegex,
  pluralize,
  levenshtein
} from '../../src/lib/main.js';

describe('String Utilities', () => {
  test('slugify basic', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  test('slugify unicode', () => {
    expect(slugify('Café au lait')).toBe('cafe-au-lait');
  });

  test('truncate basic', () => {
    expect(truncate('Hello World', 8)).toBe('Hello…');
  });

  test('truncate no break mid-word', () => {
    expect(truncate('Hello brave new world', 12)).toBe('Hello brave…');
  });

  test('camelCase basic', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
  });

  test('kebabCase basic', () => {
    expect(kebabCase('Foo Bar Baz')).toBe('foo-bar-baz');
  });

  test('titleCase basic', () => {
    expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  test('wordWrap basic', () => {
    const wrapped = wordWrap('The quick brown fox', 10);
    expect(wrapped).toBe('The quick\nbrown fox');
  });

  test('wordWrap long single word', () => {
    const long = 'supercalifragilisticexpialidocious';
    expect(wordWrap(long, 10)).toBe(long);
  });

  test('stripHtml basic and entities', () => {
    expect(stripHtml('<p>Hello &amp; world</p>')).toBe('Hello & world');
    expect(stripHtml('A &lt; B &gt; C')).toBe('A < B > C');
    expect(stripHtml('Unicode &#x1F600;')).toBe('Unicode 😀');
  });

  test('escapeRegex basic', () => {
    expect(escapeRegex('[test].*')).toBe('\\[test\\]\\.\\*');
  });

  test('pluralize rules', () => {
    expect(pluralize('box')).toBe('boxes');
    expect(pluralize('baby')).toBe('babies');
    expect(pluralize('wolf')).toBe('wolves');
    expect(pluralize('cat')).toBe('cats');
  });

  test('levenshtein canonical', () => {
    expect(levenshtein('kitten', 'sitting')).toBe(3);
  });

  test('handles null and undefined', () => {
    expect(slugify(null)).toBe('');
    expect(truncate(undefined, 5)).toBe('');
    expect(camelCase(undefined)).toBe('');
    expect(kebabCase(null)).toBe('');
    expect(titleCase(null)).toBe('');
    expect(wordWrap(undefined, 10)).toBe('');
    expect(stripHtml(undefined)).toBe('');
    expect(escapeRegex(undefined)).toBe('');
    expect(pluralize(undefined)).toBe('');
    expect(levenshtein(null, undefined)).toBe(0);
  });
});
