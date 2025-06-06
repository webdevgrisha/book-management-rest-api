import { createTables } from './config/db.js';
import { app } from './server.js';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.SERVER_PORT;

async function start() {
  try {
    await createTables();

    app.listen(process.env.SERVER_PORT, () => {
      logger.info(`Server run on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to initialize DataBase: ', err);
    process.exit(1);
  }
}

start();
