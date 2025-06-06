import { Request, Response, NextFunction } from 'express';
import { logInUserService } from '../../services/auth/index.js';
import { logger } from '../../utils/logger.js';

async function logInUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  try {
    const token = await logInUserService(email, password);

    logger.info(`User logged in: ${email}`);

    res.status(200).json(token);
  } catch (err) {
    logger.error(`Login failed for ${email}: ${err}`);

    next(err);
  }
}

export { logInUserController };
