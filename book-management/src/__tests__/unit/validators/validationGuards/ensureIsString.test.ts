import { describe, it, expect } from 'vitest';
import { ensureIsString } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureIsString', () => {
  it('does not throw for strings', () => {
    expect(() => ensureIsString('abc', 'test')).not.toThrow();
    expect(() => ensureIsString('', 'test')).not.toThrow();
  });
  
  it('throws ValidationError for non-strings', () => {
    expect(() => ensureIsString(5, 'test')).toThrow(ValidationError);
    expect(() => ensureIsString(null, 'test')).toThrow(ValidationError);
    expect(() => ensureIsString(undefined, 'test')).toThrow(ValidationError);
    expect(() => ensureIsString({}, 'test')).toThrow(ValidationError);
  });
});
