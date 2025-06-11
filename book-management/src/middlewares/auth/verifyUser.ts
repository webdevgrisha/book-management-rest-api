import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../../errors/authError/index.js';
import { isUserExistService } from '../../services/auth/index.js';
import { logger } from '../../utils/logger.js';

async function verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userEmail: string | undefined = req.user?.email;

  if (userEmail === undefined) {
    throw new AuthError('Missing user email in request', 'auth/missing-user-email');
  }

  try {
    const isUserExist = await isUserExistService(userEmail);

    if (!isUserExist) {
      throw new AuthError(`User with email ${userEmail} isn't register`, 'auth/user-not-found');
    }

    logger.info(`User verified: ${userEmail}`);

    next();
  } catch (err) {
    logger.error(`User verification failed for ${userEmail}: ${err}`);

    next(err);
  }
}

export { verifyUser };
