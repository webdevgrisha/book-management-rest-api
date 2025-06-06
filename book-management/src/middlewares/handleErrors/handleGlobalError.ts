import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger.js';

function handleGlobalError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
  }

  logger.error('Global error:', err);

  res.status(500).json({ error: 'Internal Server Error' });
}

export { handleGlobalError };
