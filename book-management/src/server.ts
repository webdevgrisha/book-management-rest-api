import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { authRouter, booksRouter } from './routes/index.js';
import { handleGlobalError } from './middlewares/handleErrors/index.js';

const app = express();
const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'dist/docs/swagger.yaml'));

swaggerDocument.servers = [
  {
    url: `http://localhost:${process.env.PORT || 3000}`,
  },
];

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRouter);
app.use('/books', booksRouter);

app.use(handleGlobalError);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export { app };
