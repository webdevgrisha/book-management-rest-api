import { authErrorMap } from './authErrorMap.js';

type AuthErrorCode = keyof typeof authErrorMap;

class AuthError extends Error {
  code: AuthErrorCode = 'auth/unknown-error' as AuthErrorCode;

  constructor(message: string, code: AuthErrorCode) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

export { AuthError };
