import { describe, it, expect } from 'vitest';
import { isNumberInRange } from '../../../../validators/validateFuncs/index.js';

describe('isNumberInRange', () => {
  it('returns true if number is within range', () => {
    expect(isNumberInRange(5, 1, 10)).toBe(true);
    expect(isNumberInRange(1, 1, 10)).toBe(true);
    expect(isNumberInRange(10, 1, 10)).toBe(true);
  });
  
  it('returns false if number is out of range', () => {
    expect(isNumberInRange(0, 1, 10)).toBe(false);
    expect(isNumberInRange(11, 1, 10)).toBe(false);
  });
});
