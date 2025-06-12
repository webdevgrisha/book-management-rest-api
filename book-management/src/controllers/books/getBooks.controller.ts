import { Request, Response, NextFunction } from 'express';
import { getBooksService } from '../../services/books/index.js';
import {
  ensureIsPositiveInt,
  ensureUserIdProvided,
} from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';
import { BooksData } from 'models/book.types.js';

async function getBooksController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId: number | undefined = req.user?.id;

  const rawLimit = req.query.limit;
  const rawCurrPage = req.query.currPage;

  const limit = rawLimit !== undefined ? Number(rawLimit) : 10;
  const currPage = rawCurrPage !== undefined ? Number(rawCurrPage) : 1;

  try {
    ensureUserIdProvided(userId);
    ensureIsPositiveInt(limit, 'limit');
    ensureIsPositiveInt(currPage, 'currPage');

    const booksData: BooksData = await getBooksService({ userId, limit, currPage });

    logger.info(`Books fetched by user ${userId}: limit=${limit}, currPage=${currPage}`);

    res.status(200).json(booksData);
  } catch (err) {
    logger.error(
      `Get books failed for user ${userId}, limit=${limit}, currPage=${currPage}: ${err}`,
    );

    next(err);
  }
}

export { getBooksController };
