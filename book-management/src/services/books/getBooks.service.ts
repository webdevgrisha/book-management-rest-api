import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';
import { BookRow } from '../../models/book.types.js';
import { PaginationMeta, TotalRowsCount } from '../../types/pagination.types.js';
import { createPaginationObj } from '../../utils/createPaginationObj.js';
import { logger } from '../../utils/logger.js';

interface BooksData {
  data: BookRow[];
  pagination: PaginationMeta;
}

interface GetBookServiceProps {
  userId: number;
  limit: number;
  currPage: number;
}

async function getBooksService(getBookServiceProps: GetBookServiceProps): Promise<BooksData> {
  const { userId, limit = 10, currPage = 1 } = getBookServiceProps;

  const offset: number = (currPage - 1) * limit;

  const getBooksQueryResponse = db.query<BookRow>(
    `
        SELECT * 
        FROM ${TABLES.BOOKS}
        WHERE user_id = $1
        LIMIT $2
        OFFSET $3;
        `,
    [userId, limit, offset],
  );

  const getBooksCountQueryResponse = db.query<TotalRowsCount>(
    `
        SELECT COUNT(*) as total
        FROM ${TABLES.BOOKS}
        WHERE user_id = $1
        `,
    [userId],
  );

  const [booksQueryResult, booksCountQueryResult] = await Promise.all([
    getBooksQueryResponse,
    getBooksCountQueryResponse,
  ]);

  const totalCount: number = booksCountQueryResult.rows[0].total;
  const bookData: BookRow[] = booksQueryResult.rows;

  const pagination: PaginationMeta = createPaginationObj({ totalCount, currPage, limit });

  const booksResponse: BooksData = {
    data: bookData,
    pagination: pagination,
  };

  logger.info(
    `Books fetched: userId=${userId}, limit=${limit}, currPage=${currPage}, totalCount=${totalCount}`,
  );

  return booksResponse;
}

export { getBooksService };
