import { describe, it, expect } from 'vitest';
import { isPlainObject } from '../../../../validators/validateFuncs/index.js';

describe('isPlainObject', () => {
  it('returns true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });
  
  it('returns false for arrays, null, and non-objects', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(5)).toBe(false);
    expect(isPlainObject('str')).toBe(false);
  });
});
