import bcrypt from 'bcrypt';
import { db } from '../../config/db.js';
import { isUserExistService } from './isUserExist.service.js';
import { TABLES } from '../../config/tables.js';
import { AuthError } from '../../errors/authError/index.js';
import validator from 'validator';
import { passwordValidation } from '../../validators/auth/passwordValidation.js';
import { logger } from '../../utils/logger.js';

async function registerUserService(email: string, password: string) {
  const isEmailValid = validator.isEmail(email);
  const isPasswordValid = passwordValidation(password);

  if (!isEmailValid) {
    logger.warn(`Registration failed: invalid email (${email})`);

    throw new AuthError("Email isn't valid", 'auth/invalid-email');
  }

  if (!isPasswordValid) {
    logger.warn(`Registration failed: invalid password for email (${email})`);

    throw new AuthError(
      'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      'auth/invalid-password',
    );
  }

  const isUserExist = await isUserExistService(email);

  if (isUserExist) {
    logger.warn(`Registration failed: user already exists (${email})`);

    throw new AuthError(`User with email ${email} already exists.`, 'auth/email-already-exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    `
        INSERT INTO ${TABLES.USERS} (email, password_hash) 
        VALUES ($1, $2);
        `,
    [email, hashedPassword],
  );

  logger.info(`User registered successfully: ${email}`);
  
  return { message: 'User created' };
}

export { registerUserService };
