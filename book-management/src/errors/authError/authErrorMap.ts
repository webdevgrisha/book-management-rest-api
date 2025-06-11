const authErrorMap = {
  'auth/email-already-exists': { status: 400, message: 'Email is already in use.' },
  'auth/invalid-email': { status: 400, message: 'Email address is invalid.' },
  'auth/invalid-password': { status: 400, message: 'Password is too weak or invalid.' },
  'auth/wrong-password': { status: 401, message: 'Incorrect password.' },
  'auth/user-not-found': { status: 404, message: 'User not found.' },
  'auth/missing-user-id': { status: 400, message: 'User id not provided' },
  'auth/missing-user-email': { status: 400, message: 'User email not provided' },
  'auth/email-too-long': { status: 400, message: 'User email is too long' },
  'auth/password-too-long': { status: 400, message: 'User password is too long' },
  'auth/missing-token': { status: 401, message: 'Authorization token is missed' },
  'auth/invalid-token': { status: 401, message: 'Invalid or expired authorization token.' },
  'auth/insufficient-permission': {
    status: 403,
    message: 'Insufficient permissions to perform this action.',
  },
  'auth/internal-error': { status: 500, message: 'Internal Auth error.' },
};

export { authErrorMap };
