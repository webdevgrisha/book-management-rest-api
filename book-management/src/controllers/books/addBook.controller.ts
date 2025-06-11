import { Request, Response, NextFunction } from 'express';
import { addBookService } from '../../services/books/index.js';
import { createBookObj } from '../../factories/books/index.js';
import { BookCreateData, BookRow } from '../../models/book.types.js';
import { ensureIsPlainObj, ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function addBookController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bookInitObj: Record<string, unknown> = req.body;
  const userId: number | undefined = req.user?.id;

  try {
    ensureIsPlainObj(req.body, 'bookData');
    ensureUserIdProvided(userId);

    const bookCreateData: BookCreateData = createBookObj(bookInitObj);

    const bookData: BookRow = await addBookService(userId, bookCreateData);

    logger.info(`Book added by user ${userId}: ${bookData.title}`);

    res.status(201).json(bookData);
  } catch (err) {
    logger.error(`Add book failed for user ${userId}: ${err}`);

    next(err);
  }
}

export { addBookController };
