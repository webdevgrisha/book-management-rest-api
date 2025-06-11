import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { DeleteBookRow, DeletedBookId } from '../../models/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

async function deleteBookByIdService(userId: number, bookId: number): Promise<DeletedBookId> {
  const deleteBookQueryResult = await db.query<DeleteBookRow>(
    `
        DELETE FROM ${TABLES.BOOKS}
        WHERE id = $1 AND user_id = $2
        RETURNING id;
        `,
    [bookId, userId],
  );

  ensureBookExist(deleteBookQueryResult.rowCount!, bookId);

  const deletedBookId: number = deleteBookQueryResult.rows[0].id;

  logger.info(`Book deleted: bookId=${bookId}, userId=${userId}`);

  return { deletedBookId };
}

export { deleteBookByIdService };
