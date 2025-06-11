import { AuthError } from '../../errors/authError/authError.js';
import { logger } from '../../utils/logger.js';
import { isPassword } from '../auth/passwordValidation.js';

function ensureValidPassword(password: string, email: string): void {
  const isPasswordValid: boolean = isPassword(password);

  if (!isPasswordValid) {
    logger.warn(`Weak password attempt for ${email}`);
    throw new AuthError(
      'Password is too weak. It must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.',
      'auth/invalid-password',
    );
  }

  if (password.length > 100) {
    logger.warn(`Password too long (${password.length}) for ${email}`);
    throw new AuthError('Password must not exceed 100 characters.', 'auth/password-too-long');
  }
}

export { ensureValidPassword };
