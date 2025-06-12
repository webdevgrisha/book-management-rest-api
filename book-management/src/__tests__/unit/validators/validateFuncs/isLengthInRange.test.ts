import { describe, it, expect } from 'vitest';
import { isLengthInRange } from '../../../../validators/validateFuncs/index.js';

describe('isLengthInRange', () => {
  it('returns true if string length is within range', () => {
    expect(isLengthInRange('abc', 2, 5)).toBe(true);
    expect(isLengthInRange('abcd', 4, 4)).toBe(true);
  });

  it('returns false if string length is out of range', () => {
    expect(isLengthInRange('a', 2, 5)).toBe(false);
    expect(isLengthInRange('abcdef', 2, 5)).toBe(false);
  });
});
