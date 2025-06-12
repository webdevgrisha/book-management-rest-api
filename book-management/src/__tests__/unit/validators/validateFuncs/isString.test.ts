import { describe, it, expect } from 'vitest';
import { isString } from '../../../../validators/validateFuncs/index.js';

describe('isString', () => {
  it('returns true for strings', () => {
    expect(isString('abc')).toBe(true);
    expect(isString('')).toBe(true);
  });
  
  it('returns false for non-strings', () => {
    expect(isString(5)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
  });
});
