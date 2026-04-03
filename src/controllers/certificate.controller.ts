import type { Bindings } from "../types/binding.type";
import { certificateService } from "../services/certificate.service";
import { connectDB } from "../config/database.config";
import { Context } from "hono";

export const getCertificateController = async (
  c: Context<{ Bindings: Bindings }>,
) => {
  const db = connectDB(c.env.DB);

  const result = await certificateService.getAllCertificates(db);

  if (!result.success) {
    return c.json({
      success: result.success,
      message: result.message,
      statusCode: result.statusCode,
      data: null,
    });
  }

  return c.json({
    success: result.success,
    message: result.message,
    statusCode: result.statusCode,
    data: result.data,
  });
};
