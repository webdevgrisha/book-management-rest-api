import { Request, Response, NextFunction } from 'express';
import { getBooksService } from '../../services/books/index.js';
import {
  ensureIsPositiveInt,
  ensureUserIdProvided,
} from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function getBooksController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId: number | undefined = req.user?.id;
  const limit = Number(req.query.limit) || 10;
  const currPage = Number(req.query.currPage) || 1;

  try {
    ensureUserIdProvided(userId);
    ensureIsPositiveInt(limit, 'limit');
    ensureIsPositiveInt(currPage, 'currPage');

    const booksData = await getBooksService({ userId, limit, currPage });

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
