import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../errors/validationError/validationError.js';
import { logger } from '../../utils/logger.js';

function handleValidationErrors(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof ValidationError)) {
    return next(err);
  }

  const { name, status, message } = err;

  logger.error(`ValidationError: ${name} for path ${req.originalUrl} - ${message}`);

  res.status(status).json({ error: name, message: message });
}

export { handleValidationErrors };
