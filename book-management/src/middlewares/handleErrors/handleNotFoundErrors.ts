import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../errors/notFoundError/notFoundError.js';
import { logger } from '../../utils/logger.js';

function handleNotFoundErrors(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof NotFoundError)) {
    return next(err);
  }

  const { name, status, message } = err;

  logger.error(`NotFoundError: ${name} for path ${req.originalUrl} - ${message}`);

  res.status(status).json({ error: name, message: message });
}

export { handleNotFoundErrors };
