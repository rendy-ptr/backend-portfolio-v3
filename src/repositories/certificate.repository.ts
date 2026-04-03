import type { DB } from "../config/database.config";

export class CertificateRepository {
  async getAll(db: DB) {
    return await db.query.certificateTable.findMany();
  }
}

export const certificateRepository = new CertificateRepository();
