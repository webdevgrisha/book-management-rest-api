import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookRow, BookUpdateData } from '../../models/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/index.js';
import { logger } from '../../utils/logger.js';

interface UpdateBookByIdServiceProps {
  userId: number;
  bookId: number;
  bookUpdateData: BookUpdateData;
}

async function updateBookByIdService(
  updateBookByIdServiceProps: UpdateBookByIdServiceProps,
): Promise<BookRow> {
  const { userId, bookId, bookUpdateData } = updateBookByIdServiceProps;

  const { title, author, year, description, coverImageUrl } = bookUpdateData;

  const updateBookQueryResult = await db.query<BookRow>(
    `
        UPDATE ${TABLES.BOOKS}
        SET title = COALESCE($3, title),
            author = COALESCE($4, author),
            year = COALESCE($5, year),
            description = COALESCE($6, description),
            cover_image_url = COALESCE($7, cover_image_url)
        WHERE id = $1 AND user_id = $2
        RETURNING *;
        `,
    [bookId, userId, title, author, year, description, coverImageUrl],
  );

  ensureBookExist(updateBookQueryResult.rowCount!, bookId);

  const updatedBookData: BookRow = updateBookQueryResult.rows[0];

  logger.info(`Book updated: bookId=${bookId}, userId=${userId}`);

  return updatedBookData;
}

export { updateBookByIdService };
