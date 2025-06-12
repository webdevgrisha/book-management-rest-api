import { describe, it, expect, vi } from 'vitest';
import { ensureValidPassword } from '../../../../validators/validationGuards/index.js';
import { AuthError } from '../../../../errors/authError/authError.js';

describe('ensureValidPassword', () => {
  it('does not throw for valid password', () => {
    expect(() => ensureValidPassword('StrongPass1!', 'test@email.com')).not.toThrow();
  });

  it('throws AuthError for weak password', () => {
    expect(() => ensureValidPassword('weak', 'test@email.com')).toThrow(AuthError);
  });
  
  it('throws AuthError for too long password', () => {
    const longPass = 'A1!a'.repeat(30);
    expect(() => ensureValidPassword(longPass, 'test@email.com')).toThrow(AuthError);
  });
});
