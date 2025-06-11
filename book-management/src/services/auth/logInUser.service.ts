import { db } from '../../config/db.js';
import { jwtConfig } from '../../config/jwt.js';
import { TABLES } from '../../config/tables.js';
import { AuthError } from '../../errors/authError/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from '../../utils/logger.js';
import { UserRow } from 'models/user.types.js';

interface TokenObj {
  token: string;
}

interface JWTPayload {
  id: string;
  email: string;
}

async function logInUserService(email: string, password: string): Promise<TokenObj> {
  const userQueryResult = await db.query<UserRow>(
    `
      SELECT id, email, password_hash
      FROM ${TABLES.USERS}
      WHERE email = $1;
    `,
    [email],
  );

  if (userQueryResult.rowCount === 0) {
    logger.warn(`Login failed: user not found (${email})`);

    throw new AuthError(`User with email ${email} isn't register`, 'auth/user-not-found');
  }

  const { id: userId, email: userEmail, password_hash } = userQueryResult.rows[0];
  const isPasswordMatch: boolean = await bcrypt.compare(password, password_hash);

  if (!isPasswordMatch) {
    logger.warn(`Login failed: wrong password for email ${userEmail}`);

    throw new AuthError(
      `Failed login attempt: incorrect password for email: ${userEmail}`,
      'auth/wrong-password',
    );
  }

  logger.info(`User logged in successfully: id=${userId}, email=${userEmail}`);

  const payload: JWTPayload = {
    id: userId,
    email: userEmail,
  };

  const options = { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions;

  const token: string = jwt.sign(payload, jwtConfig.secret, options);

  return { token };
}

export { logInUserService };
