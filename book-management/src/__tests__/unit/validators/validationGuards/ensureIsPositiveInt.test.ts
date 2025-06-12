import { describe, it, expect } from 'vitest';
import { ensureIsPositiveInt } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureIsPositiveInt', () => {
  it('does not throw for positive integers', () => {
    expect(() => ensureIsPositiveInt(5, 'test')).not.toThrow();
  });
  
  it('throws ValidationError for non-positive or non-integer values', () => {
    expect(() => ensureIsPositiveInt(-1, 'test')).toThrow(ValidationError);
    expect(() => ensureIsPositiveInt(0, 'test')).toThrow(ValidationError);
    expect(() => ensureIsPositiveInt(1.5, 'test')).toThrow(ValidationError);
    expect(() => ensureIsPositiveInt('5', 'test')).toThrow(ValidationError);
  });
});
