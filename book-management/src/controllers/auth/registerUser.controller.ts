import { Request, Response, NextFunction } from 'express';
import { registerUserService } from '../../services/auth/index.js';
import { logger } from '../../utils/logger.js';
import { ensureIsString } from '../../validators/validationGuards/index.js';

async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password } = req.body;

  try {
    ensureIsString(email, 'email');
    ensureIsString(password, 'password');

    const result = await registerUserService(email, password);

    logger.info(`User registered: ${email}`);

    res.status(201).json(result);
  } catch (err) {
    logger.error(`Registration failed for ${email}: ${err}`);

    next(err);
  }
}

export { registerUserController };
