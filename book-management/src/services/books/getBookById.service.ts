import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookData } from '../../modules/books/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/ensureBookExist.js';
import { logger } from '../../utils/logger.js';

async function getBookByIdService(bookId: number, userId: number): Promise<BookData> {
  const result = await db.query(
    `
        SELECT * 
        FROM ${TABLES.BOOKS}
        WHERE id = $1 AND user_id = $2;
        `,
    [bookId, userId],
  );

  ensureBookExist(result.rowCount!, bookId);

  const bookData = result.rows[0] as BookData;

  logger.info(`Book fetched: bookId=${bookId}, userId=${userId}`);

  return bookData;
}

export { getBookByIdService };
