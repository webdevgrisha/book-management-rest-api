import { describe, it, expect } from 'vitest';
import { ensureNumberInRange } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureNumberInRange', () => {
  it('does not throw if value is in range', () => {
    expect(() => ensureNumberInRange(5, 'test', 1, 10)).not.toThrow();
  });
  
  it('throws ValidationError if value is out of range', () => {
    expect(() => ensureNumberInRange(0, 'test', 1, 10)).toThrow(ValidationError);
    expect(() => ensureNumberInRange(11, 'test', 1, 10)).toThrow(ValidationError);
  });
});
