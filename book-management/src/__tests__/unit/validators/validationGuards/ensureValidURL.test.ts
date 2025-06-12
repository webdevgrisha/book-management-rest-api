import { describe, it, expect } from 'vitest';
import { ensureValidURL } from '../../../../validators/validationGuards/index.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('ensureValidURL', () => {
  it('does not throw for valid URLs', () => {
    expect(() => ensureValidURL('https://example.com', 'test')).not.toThrow();
    expect(() => ensureValidURL('http://example.com', 'test')).not.toThrow();
  });
  
  it('throws ValidationError for invalid URLs', () => {
    expect(() => ensureValidURL('example.com', 'test')).toThrow(ValidationError);
    expect(() => ensureValidURL('not a url', 'test')).toThrow(ValidationError);
  });
});
