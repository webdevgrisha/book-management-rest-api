import { Request, Response, NextFunction } from 'express';
import { getBookByIdService } from '../../services/books/index.js';
import { ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function getBookByIdController(req: Request, res: Response, next: NextFunction) {
  const bookId: number = Number(req.params.id);
  const userId: number | undefined = req.user?.id;

  ensureUserIdProvided(userId);

  try {
    const bookData = await getBookByIdService(bookId, userId!);

    logger.info(`Book fetched by user ${userId}: bookId ${bookId}`);

    res.status(200).json(bookData);
  } catch (err) {
    logger.error(`Get book failed for user ${userId}, bookId ${bookId}: ${err}`);

    next(err);
  }
}

export { getBookByIdController };
