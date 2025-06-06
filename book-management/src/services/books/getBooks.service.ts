import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookData } from '../../modules/books/book.types.js';
import { PaginationMeta } from '../../types/pagination.types.js';
import { createPaginationObj } from '../../utils/createPaginationObj.js';
import { logger } from '../../utils/logger.js';

interface GetBooksResponse {
  data: BookData[];
  pagination: PaginationMeta;
}

interface GetBookServiceProps {
  userId: number;
  limit: number;
  currPage: number;
}

async function getBooksService(
  getBookServiceProps: GetBookServiceProps,
): Promise<GetBooksResponse> {
  const { userId, limit = 10, currPage = 1 } = getBookServiceProps;

  const offset: number = (currPage - 1) * limit;

  const result = await db.query(
    `
        SELECT * 
        FROM ${TABLES.BOOKS}
        WHERE user_id = $1
        LIMIT $2
        OFFSET $3;
        `,
    [userId, limit, offset],
  );

  const countResult = await db.query(
    `
        SELECT COUNT(*) as total
        FROM ${TABLES.BOOKS}
        WHERE user_id = $1
        `,
    [userId],
  );

  const totalCount: number = countResult.rows[0].total;

  const bookData = result.rows as BookData[];
  const pagination: PaginationMeta = createPaginationObj({ totalCount, currPage, limit });

  const booksResponse: GetBooksResponse = {
    data: bookData,
    pagination: pagination,
  };

  logger.info(
    `Books fetched: userId=${userId}, limit=${limit}, currPage=${currPage}, totalCount=${totalCount}`,
  );

  return booksResponse;
}

export { getBooksService };
