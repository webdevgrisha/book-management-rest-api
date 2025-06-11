import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookCreateData, BookRow } from '../../models/book.types.js';
import { logger } from '../../utils/logger.js';

async function addBookService(userId: number, bookData: BookCreateData): Promise<BookRow> {
  const { title, author, year, description, coverImageUrl } = bookData;

  const addBookQueryResult = await db.query<BookRow>(
    `
        INSERT INTO ${TABLES.BOOKS} (user_id, title, author, year, description, cover_image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `,
    [userId, title, author, year, description, coverImageUrl],
  );

  const addedBookData: BookRow = addBookQueryResult.rows[0];

  logger.info(`Book added: bookId='${addedBookData.id}'`);

  return addedBookData;
}

export { addBookService };
