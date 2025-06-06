import { NotFoundError } from '../../errors/notFoundError/notFoundError.js';

function ensureBookExist(rowCount: number, bookId: number): void {
  if (rowCount > 0) return;

  throw new NotFoundError(`Book with id ${bookId} not found`);
}

export { ensureBookExist };
