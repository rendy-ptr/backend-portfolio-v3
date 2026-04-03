import { eq } from "drizzle-orm";
import { usersTable } from "../../database/schema.database";
import type { DB } from "../../config/database.config";

export class AuthRepository {
  async findUserByEmail(db: DB, email: string) {
    return await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
  }

  async findUserById(db: DB, id: number) {
    return await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      with: {
        profile: true,
        certificates: true,
      },
    });
  }
}


export const authRepository = new AuthRepository();