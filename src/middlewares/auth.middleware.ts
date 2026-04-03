import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import type { Bindings } from "../types/binding.type";

export const authMiddleware = async (
  c: Context<{ Bindings: Bindings }>,
  next: Next,
) => {
  const token = getCookie(c, "auth_token");

  if (!token) {
    return c.json(
      { success: false, message: "Unauthorized - No token provided" },
      401,
    );
  }

  try {
    const secret = c.env.JWT_SECRET;
    const decoded = await verify(token, secret, "HS256");

    c.set("jwtPayload", decoded);

    await next();
  } catch (error) {
    return c.json(
      { success: false, message: "Unauthorized - Invalid or expired token" },
      401,
    );
  }
};
