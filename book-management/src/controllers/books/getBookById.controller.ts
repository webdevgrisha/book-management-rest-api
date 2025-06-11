import { Request, Response, NextFunction } from 'express';
import { getBookByIdService } from '../../services/books/index.js';
import { ensureIsNumber, ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';
import { BookRow } from '../../models/book.types.js';

async function getBookByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const bookId: number = Number(req.params.id);
  const userId: number | undefined = req.user?.id;

  try {
    ensureIsNumber(bookId, 'bookId');
    ensureUserIdProvided(userId);

    const bookData: BookRow = await getBookByIdService(bookId, userId);

    logger.info(`Book fetched by user ${userId}: bookId ${bookId}`);

    res.status(200).json(bookData);
  } catch (err) {
    logger.error(`Get book failed for user ${userId}, bookId ${bookId}: ${err}`);

    next(err);
  }
}

export { getBookByIdController };
