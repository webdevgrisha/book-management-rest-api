import { Router } from 'express';
import {
  addBookController,
  deleteBookByIdController,
  getBookByIdController,
  getBooksController,
  updateBookController,
} from '../../controllers/books/index.js';
import { authenticateToken, verifyUser } from '../../middlewares/auth/index.js';
import {
  handleAuthErrors,
  handleNotFoundErrors,
  handleValidationErrors,
} from '../../middlewares/handleErrors/index.js';

const booksRouter = Router();

booksRouter.use(authenticateToken);
booksRouter.use(verifyUser);

booksRouter.get('/', getBooksController);
booksRouter.get('/:id', getBookByIdController);
booksRouter.post('/', addBookController);
booksRouter.patch('/:id', updateBookController);
booksRouter.delete('/:id', deleteBookByIdController);

booksRouter.use(handleAuthErrors);
booksRouter.use(handleValidationErrors);
booksRouter.use(handleNotFoundErrors);

export { booksRouter };
