import type { DB } from "../config/database.config";
import { certificateRepository } from "../repositories/certificate.repository";

export class CertificateService {
  async getAllCertificates(db: DB) {
    const certificates = await certificateRepository.getAll(db);

    if (!certificates) {
      return {
        success: false,
        message: "Certificates not found",
        statusCode: 404,
        data: null,
      };
    }

    if (certificates.length === 0) {
      return {
        success: false,
        message: "Certificates 0",
        statusCode: 200,
        data: null,
      };
    }

    return {
      success: true,
      message: "Certificates fetched successfully",
      statusCode: 200,
      data: certificates,
    };
  }
}

export const certificateService = new CertificateService();
