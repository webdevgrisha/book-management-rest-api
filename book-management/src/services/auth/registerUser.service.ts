import bcrypt from 'bcrypt';
import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { AuthError } from '../../errors/authError/index.js';
import { logger } from '../../utils/logger.js';
import { isUniqueViolation } from '../../validators/validateFuncs/index.js';
import { ensureValidEmail, ensureValidPassword } from '../../validators/validationGuards/index.js';

interface MessageResult {
  message: string;
}

async function registerUserService(email: string, password: string): Promise<MessageResult> {
  ensureValidEmail(email);
  ensureValidPassword(password, email);

  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    await db.query(
      `
        INSERT INTO ${TABLES.USERS} (email, password_hash) 
        VALUES ($1, $2);
      `,
      [email, hashedPassword],
    );

    logger.info(`User registered successfully: ${email}`);

    return { message: 'User created.' };
  } catch (err) {
    if (isUniqueViolation(err)) {
      logger.warn(`Registration failed: user already exists (${email})`);

      throw new AuthError(`User with email ${email} already exists.`, 'auth/email-already-exists');
    }

    throw err;
  }
}

export { registerUserService };
