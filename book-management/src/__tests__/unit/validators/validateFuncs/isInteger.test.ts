import { describe, it, expect } from 'vitest';
import { isInteger } from '../../../../validators/validateFuncs/index.js';

describe('isInteger', () => {
  it('returns true for integers', () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-10)).toBe(true);
  });

  it('returns false for non-integers', () => {
    expect(isInteger(5.5)).toBe(false);
    expect(isInteger('5')).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger({})).toBe(false);
    expect(isInteger(NaN)).toBe(false);
  });
});
