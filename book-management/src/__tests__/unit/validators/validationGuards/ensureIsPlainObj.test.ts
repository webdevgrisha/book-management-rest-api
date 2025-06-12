import { describe, it, expect } from 'vitest';
import { ensureIsPlainObj } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureIsPlainObj', () => {
  it('does not throw for plain objects', () => {
    expect(() => ensureIsPlainObj({}, 'test')).not.toThrow();
    expect(() => ensureIsPlainObj({ a: 1 }, 'test')).not.toThrow();
  });
  
  it('throws ValidationError for non-objects', () => {
    expect(() => ensureIsPlainObj([], 'test')).toThrow(ValidationError);
    expect(() => ensureIsPlainObj(null, 'test')).toThrow(ValidationError);
    expect(() => ensureIsPlainObj(5, 'test')).toThrow(ValidationError);
    expect(() => ensureIsPlainObj('str', 'test')).toThrow(ValidationError);
  });
});
