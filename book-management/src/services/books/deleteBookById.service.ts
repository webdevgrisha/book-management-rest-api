import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { DeletedBookId } from '../../modules/books/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/ensureBookExist.js';
import { logger } from '../../utils/logger.js';

async function deleteBookByIdService(userId: number, bookId: number): Promise<DeletedBookId> {
  const result = await db.query(
    `
        DELETE FROM ${TABLES.BOOKS}
        WHERE id = $1 AND user_id = $2
        RETURNING id;
        `,
    [bookId, userId],
  );

  ensureBookExist(result.rowCount!, bookId);

  const deletedBookId = result.rows[0].id as number;

  logger.info(`Book deleted: bookId=${bookId}, userId=${userId}`);

  return { deletedBookId };
}

export { deleteBookByIdService };
