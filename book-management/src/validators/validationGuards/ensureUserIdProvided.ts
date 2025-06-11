import { isNumber } from '../validateFuncs/isNumber.js';
import { AuthError } from '../../errors/authError/index.js';

function ensureUserIdProvided(userId: unknown): asserts userId is number {
  if (isNumber(userId)) return;

  throw new AuthError('Missing user id in request', 'auth/missing-user-id');
}

export { ensureUserIdProvided };
