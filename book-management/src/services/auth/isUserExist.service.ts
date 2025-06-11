import { UserRow } from '../../models/user.types.js';
import { db } from '../../config/db.js';
import { TABLES } from '../../config/tables.js';

async function isUserExistService(email: string): Promise<boolean> {
  const userQueryResult = await db.query<UserRow>(
    `
      SELECT email
      FROM ${TABLES.USERS} 
      WHERE email = $1;
    `,
    [email],
  );

  return userQueryResult.rowCount! > 0;
}

export { isUserExistService };
