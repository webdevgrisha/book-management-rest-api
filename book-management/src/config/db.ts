import { Pool } from 'pg';
import { TABLES } from './tables.js';

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function createTables() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS ${TABLES.BOOKS} (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES ${TABLES.USERS} (id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      description TEXT,
      year INTEGER,
      cover_image_url TEXT
    );
  `);
}

export { db, createTables };
