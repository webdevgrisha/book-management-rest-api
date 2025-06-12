import { describe, it, expect } from 'vitest';
import { ensureLengthInRange } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureLengthInRange', () => {
  it('does not throw if string length is in range', () => {
    expect(() => ensureLengthInRange('abc', 'test', 2, 5)).not.toThrow();
    expect(() => ensureLengthInRange('abcd', 'test', 4, 4)).not.toThrow();
  });
  
  it('throws ValidationError if string length is out of range', () => {
    expect(() => ensureLengthInRange('a', 'test', 2, 5)).toThrow(ValidationError);
    expect(() => ensureLengthInRange('abcdef', 'test', 2, 5)).toThrow(ValidationError);
  });
});
