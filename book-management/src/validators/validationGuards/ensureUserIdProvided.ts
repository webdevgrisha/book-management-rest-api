import { AuthError } from '../../errors/authError/index.js';

function ensureUserIdProvided(userId: unknown) {
  if (userId !== undefined) return;

  throw new AuthError('Missing user id in request', 'auth/missing-user-id');
}

export { ensureUserIdProvided };
