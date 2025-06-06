import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookData, BookUpdateData } from '../../modules/books/book.types.js';
import { ensureBookExist } from '../../validators/validationGuards/ensureBookExist.js';
import { logger } from '../../utils/logger.js';

interface UpdateBookByIdServiceProps {
  userId: number;
  bookId: number;
  bookUpdateData: BookUpdateData;
}

async function updateBookByIdService(
  updateBookByIdServiceProps: UpdateBookByIdServiceProps,
): Promise<BookData> {
  const { userId, bookId, bookUpdateData } = updateBookByIdServiceProps;

  const { title, author, year, description, coverImageUrl } = bookUpdateData;

  const result = await db.query(
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

  ensureBookExist(result.rowCount!, bookId);

  const updatedBookData = result.rows[0] as BookData;

  logger.info(`Book updated: bookId=${bookId}, userId=${userId}`);

  return updatedBookData;
}

export { updateBookByIdService };
