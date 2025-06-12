import { describe, it, expect } from 'vitest';
import { ensureUserIdProvided } from '../../../../validators/validationGuards/index.js';
import { AuthError } from '../../../../errors/authError/index.js';

describe('ensureUserIdProvided', () => {
  it('does not throw for valid userId', () => {
    expect(() => ensureUserIdProvided(5)).not.toThrow();
  });
  
  it('throws AuthError for invalid userId', () => {
    expect(() => ensureUserIdProvided('5')).toThrow(AuthError);
    expect(() => ensureUserIdProvided(null)).toThrow(AuthError);
    expect(() => ensureUserIdProvided(undefined)).toThrow(AuthError);
  });
});
