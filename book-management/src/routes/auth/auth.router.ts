import { Router } from 'express';
import { logInUserController, registerUserController } from '../../controllers/auth/index.js';
import { handleAuthErrors, handleValidationErrors } from '../../middlewares/handleErrors/index.js';

const authRouter = Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', logInUserController);

authRouter.use(handleValidationErrors);
authRouter.use(handleAuthErrors);

export { authRouter };
