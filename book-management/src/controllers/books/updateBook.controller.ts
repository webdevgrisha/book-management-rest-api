import { Request, Response, NextFunction } from 'express';
import { updateBookByIdService } from '../../services/books/index.js';
import { BookRow, BookUpdateData } from '../../models/book.types.js';
import {
  ensureIsNumber,
  ensureIsPlainObj,
  ensureUserIdProvided,
} from '../../validators/validationGuards/index.js';
import { updateBookObj } from '../../factories/books/index.js';
import { logger } from '../../utils/logger.js';

async function updateBookController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const bookInitObj: Record<string, unknown> = req.body;
  const bookId: number = Number(req.params.id);
  const userId: number | undefined = req.user?.id;

  try {
    ensureIsPlainObj(req.body, 'updateData');
    ensureIsNumber(bookId, 'bookId');
    ensureUserIdProvided(userId);

    const bookUpdateData: BookUpdateData = updateBookObj(bookInitObj);

    const bookData: BookRow = await updateBookByIdService({
      userId,
      bookId,
      bookUpdateData,
    });

    logger.info(`Book updated by user ${userId}: bookId ${bookId}`);

    res.status(200).json(bookData);
  } catch (err) {
    logger.error(`Update book failed for user ${userId}, bookId ${bookId}: ${err}`);
    next(err);
  }
}

export { updateBookController };
