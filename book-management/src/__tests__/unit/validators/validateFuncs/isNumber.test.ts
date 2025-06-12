import { describe, it, expect } from 'vitest';
import { isNumber } from '../../../../validators/validateFuncs/index.js';

describe('isNumber', () => {
  it('returns true for numbers', () => {
    expect(isNumber(5)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-10)).toBe(true);
  });
  
  it('returns false for non-numbers and NaN', () => {
    expect(isNumber('5')).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
  });
});
