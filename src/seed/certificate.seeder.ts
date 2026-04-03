import { DB } from "../config/database.config";
import { certificateTable } from "../database/schema.database";
import { certificateMock } from "../mock/index.mock";

export const certificateSeeder = async (db: DB, user: { id: number }) => {
  const dataToInsert = certificateMock.map((cert) => ({
    ...cert,
    userId: user.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  await db.insert(certificateTable).values(dataToInsert);
};
