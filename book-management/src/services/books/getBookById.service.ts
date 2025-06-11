import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookRow } from '../../models/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function getBookByIdService(bookId: number, userId: number): Promise<BookRow> {
  const getBookQueryResult = await db.query<BookRow>(
    `
        SELECT * 
        FROM ${TABLES.BOOKS}
        WHERE id = $1 AND user_id = $2;
        `,
    [bookId, userId],
  );

  ensureBookExist(getBookQueryResult.rowCount!, bookId);

  const bookData: BookRow = getBookQueryResult.rows[0];

  logger.info(`Book fetched: bookId=${bookId}, userId=${userId}`);

  return bookData;
}

export { getBookByIdService };
