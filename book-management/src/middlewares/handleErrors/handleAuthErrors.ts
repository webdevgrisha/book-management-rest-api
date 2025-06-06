import { Request, Response, NextFunction } from 'express';
import { AuthError, authErrorMap } from '../../errors/authError/index.js';
import { logger } from '../../utils/logger.js';

function handleAuthErrors(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof AuthError)) {
    return next(err);
  }

  const { status, message } = authErrorMap[err.code];

  logger.error(
    `AuthError: ${err.name} (${err.code}) for path ${req.originalUrl} - ${message}`
  );

  res.status(status).json({ error: err.name, message: message });
}

export { handleAuthErrors };
