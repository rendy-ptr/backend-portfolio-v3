import { usersTable } from "../database/schema.database";
import * as bcrypt from "bcryptjs";
import "dotenv/config";
import type { DB } from "../config/database.config";

export const userSeeder = async (db: DB) => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  const [user] = await db
    .insert(usersTable)
    .values({
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .returning({ id: usersTable.id });

  return user;
};
