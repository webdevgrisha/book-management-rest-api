import { Request, Response, NextFunction } from 'express';
import { updateBookByIdService } from '../../services/books/index.js';
import { ensureIsPlainObj } from '../../validators/validationGuards/ensureIsPlainObj.js';
import { BookData, BookUpdateData } from '../../modules/books/book.types.js';
import { ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { updateBookObj } from '../../factories/books/updateBookObj.js';
import { logger } from '../../utils/logger.js';

async function updateBookController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  ensureIsPlainObj(req.body, 'updateData');

  const bookInitObj: Record<string, unknown> = req.body;
  const bookId: number = Number(req.params.id);
  const userId: number | undefined = req.user?.id;

  ensureUserIdProvided(userId);

  try {
    const bookUpdateData: BookUpdateData = updateBookObj(bookInitObj);

    const bookData: BookData = await updateBookByIdService({
      userId: userId!,
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
