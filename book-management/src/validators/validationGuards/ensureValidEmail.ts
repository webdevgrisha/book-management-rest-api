import validator from 'validator';
import { AuthError } from '../../errors/authError/authError.js';
import { logger } from '../../utils/logger.js';

function ensureValidEmail(email: string): void {
  const isEmailValid: boolean = validator.isEmail(email);

  if (!isEmailValid) {
    logger.warn(`Invalid email format: ${email}`);
    throw new AuthError('The provided email address is invalid.', 'auth/invalid-email');
  }

  if (email.length > 256) {
    logger.warn(`Email too long (${email.length}): ${email}`);
    throw new AuthError('Email must not exceed 256 characters.', 'auth/email-too-long');
  }
}

export { ensureValidEmail };
