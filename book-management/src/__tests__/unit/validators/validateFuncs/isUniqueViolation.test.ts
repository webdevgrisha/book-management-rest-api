import { describe, it, expect } from 'vitest';
import { isUniqueViolation } from '../../../../validators/validateFuncs/index.js';

class UniqueViolationError extends Error {
  code: string;
  constructor() {
    super('Unique violation');
    this.code = '23505';
  }
}

describe('isUniqueViolation', () => {
  it('returns true for error with code 23505', () => {
    const err = new UniqueViolationError();
    expect(isUniqueViolation(err)).toBe(true);
  });
  
  it('returns false for error with other code or no code', () => {
    expect(isUniqueViolation({ code: '12345' })).toBe(false);
    expect(isUniqueViolation({})).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
    expect(isUniqueViolation(undefined)).toBe(false);
  });
});
