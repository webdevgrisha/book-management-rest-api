import { describe, it, expect } from 'vitest';
import { ensureIsNumber } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureIsNumber', () => {
  it('does not throw for numbers', () => {
    expect(() => ensureIsNumber(5, 'test')).not.toThrow();
  });
  
  it('throws ValidationError for non-numbers', () => {
    expect(() => ensureIsNumber('5', 'test')).toThrow(ValidationError);
    expect(() => ensureIsNumber(NaN, 'test')).toThrow(ValidationError);
    expect(() => ensureIsNumber(null, 'test')).toThrow(ValidationError);
    expect(() => ensureIsNumber(undefined, 'test')).toThrow(ValidationError);
  });
});
