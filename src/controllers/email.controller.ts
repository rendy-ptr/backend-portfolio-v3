import type { Bindings } from "../types/binding.type";
import { emailService } from "../services/email.service";
import { Context } from "hono";

export const sendEmailController = async (
  c: Context<{ Bindings: Bindings }>,
) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return c.json(
        {
          success: false,
          message: "Name, email, and message are required",
          statusCode: 400,
          data: null,
        },
        400,
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json(
        {
          success: false,
          message: "Invalid email format",
          statusCode: 400,
          data: null,
        },
        400,
      );
    }

    if (!c.env.BREVO_API_KEY) {
      return c.json(
        {
          success: false,
          message: "Internal configuration error: BREVO_API_KEY is missing",
          statusCode: 500,
          data: null,
        },
        500,
      );
    }

    const result = await emailService.sendEmail(
      { name, email, message },
      c.env,
    );

    return c.json(
      {
        success: result.success,
        message: result.message,
        statusCode: result.statusCode,
        data: result.data,
      },
      result.statusCode as any,
    );
  } catch (error) {
    console.error("Controller Error:", error);
    return c.json(
      {
        success: false,
        message: "Invalid request body",
        statusCode: 400,
        data: null,
      },
      400,
    );
  }
};
