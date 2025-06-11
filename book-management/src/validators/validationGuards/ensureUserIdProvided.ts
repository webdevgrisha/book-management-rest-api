import { AuthError } from '../../errors/authError/index.js';
import { ensureIsString } from './index.js';

function ensureUserIdProvided(userId: unknown): asserts userId is string {
  ensureIsString(userId, 'userId');

  throw new AuthError('Missing user id in request', 'auth/missing-user-id');
}

export { ensureUserIdProvided };
