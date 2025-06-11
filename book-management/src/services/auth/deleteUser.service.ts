import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { AuthError } from '../../errors/authError/index.js';
import validator from 'validator';
import { logger } from '../../utils/logger.js';

interface MessageResult {
  message: string;
}

async function deleteUserService(email: string): Promise<MessageResult> {
  const isEmailValid: boolean = validator.isEmail(email);

  if (!isEmailValid) {
    logger.warn(`Delete user failed: invalid email (${email})`);

    throw new AuthError("Email isn't valid", 'auth/invalid-email');
  }

  try {
    const deleteUserQueryResult = await db.query(
      `
        DELETE FROM ${TABLES.USERS}
        WHERE email = $1
      `,
      [email],
    );

    if (deleteUserQueryResult.rowCount === 0) {
      logger.warn(`Delete user failed: user not found (${email})`);

      throw new AuthError(`User with email ${email} not found.`, 'auth/user-not-found');
    }

    logger.info(`User delete successfully: ${email}`);

    return { message: 'User deleted.' };
  } catch (err) {
    logger.error(`Delete user failed due to server error: ${err}`);

    throw new AuthError('Internal server error while deleting user.', 'auth/internal-error');
  }
}

export { deleteUserService };
