import { Request, Response, NextFunction } from 'express';
import { ensureIsNumber, ensureUserIdProvided } from '../../validators/validationGuards/index.js';
import { deleteBookByIdService } from '../../services/books/index.js';
import { logger } from '../../utils/logger.js';
import { DeletedBookId } from '../../models/book.types.js';

async function deleteBookByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const bookId: number = Number(req.params.id);
  const userId: number | undefined = req.user?.id;

  try {
    ensureIsNumber(bookId, 'bookId');
    ensureUserIdProvided(userId);

    const deletedBookId: DeletedBookId = await deleteBookByIdService(userId, bookId);

    logger.info(`Book deleted by user ${userId}: bookId ${bookId}`);

    res.status(204).json(deletedBookId);
  } catch (err) {
    logger.error(`Delete book failed for user ${userId}, bookId ${bookId}: ${err}`);

    next(err);
  }
}

export { deleteBookByIdController };
