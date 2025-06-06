import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';

async function isUserExistService(email: string) {
  const result = await db.query(
    `
        SELECT email
        FROM ${TABLES.USERS} 
        WHERE email = $1;
        `,
    [email],
  );

  return result.rowCount! > 0;
}

export { isUserExistService };
