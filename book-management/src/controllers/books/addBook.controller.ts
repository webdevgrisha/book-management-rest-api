import { Request, Response, NextFunction } from 'express';
import { addBookService } from '../../services/books/index.js';
import { ensureIsPlainObj } from '../../validators/validationGuards/ensureIsPlainObj.js';
import { createBookObj } from '../../factories/books/createBookObj.js';
import { BookCreateData, BookData } from '../../modules/books/book.types.js';
import { ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function addBookController(req: Request, res: Response, next: NextFunction): Promise<void> {
  ensureIsPlainObj(req.body, 'bookData');

  const bookInitObj: Record<string, unknown> = req.body;
  const userId: number | undefined = req.user?.id;

  ensureUserIdProvided(userId);

  try {
    const bookCreateData: BookCreateData = createBookObj(bookInitObj);

    const bookData: BookData = await addBookService(userId!, bookCreateData);

    logger.info(`Book added by user ${userId}: ${bookData.title}`);

    res.status(200).json(bookData);
  } catch (err) {
    logger.error(`Add book failed for user ${userId}: ${err}`);

    next(err);
  }
}

export { addBookController };
