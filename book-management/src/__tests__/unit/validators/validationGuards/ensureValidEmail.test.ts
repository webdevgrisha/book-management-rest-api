import { describe, it, expect, vi } from 'vitest';
import { ensureValidEmail } from '../../../../validators/validationGuards/index.js';
import { AuthError } from '../../../../errors/authError/authError.js';

describe('ensureValidEmail', () => {
  it('does not throw for valid email', () => {
    expect(() => ensureValidEmail('test@email.com')).not.toThrow();
  });

  it('throws AuthError for invalid email', () => {
    expect(() => ensureValidEmail('invalid-email')).toThrow(AuthError);
  });
  
  it('throws AuthError for too long email', () => {
    const longEmail = 'a'.repeat(250) + '@mail.com';
    expect(() => ensureValidEmail(longEmail)).toThrow(AuthError);
  });
});
