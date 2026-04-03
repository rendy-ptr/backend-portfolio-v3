import { Context } from "hono";
import type { Bindings } from "../../types/binding.type";
import { connectDB } from "../../config/database.config";
import { deleteCookie, setCookie, getCookie } from "hono/cookie";
import { authService } from "../../services/auth/auth.service";

type JwtPayload = {
  sub: number;
  email: string;
  exp: Date;
};

export const loginController = async (c: Context<{ Bindings: Bindings }>) => {
  const existingToken = getCookie(c, "auth_token");
  if (existingToken) {
    return c.json({
      success: false,
      message: "You are already logged in",
      status: 400,
    });
  }

  const { email, password } = await c.req.json();
  const db = connectDB(c.env.DB);
  const secret = c.env.JWT_SECRET;

  const result = await authService.processLogin(db, email, password, secret);

  if (!result.success) {
    return c.json({
      success: result.success,
      message: result.message,
      status: result.status,
    });
  }

  setCookie(c, "auth_token", result.token!, {
    httpOnly: true,
    secure: c.req.url.startsWith("https"),
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return c.json({
    success: result.success,
    message: result.message,
    status: result.status,
    token: result.token,
  });
};

export const logoutController = async (c: Context<{ Bindings: Bindings }>) => {
  const token = getCookie(c, "auth_token");
  const result = await authService.processLogout(token ?? null);

  if (!result.success) {
    return c.json({
      success: result.success,
      message: result.message,
      status: result.status,
    });
  }

  deleteCookie(c, "auth_token");

  return c.json({
    success: result.success,
    message: result.message,
    status: result.status,
  });
};

export const profileController = async (
  c: Context<{ Bindings: Bindings; Variables: { jwtPayload: JwtPayload } }>,
) => {
  const db = connectDB(c.env.DB);
  const payload = c.get("jwtPayload");

  const result = await authService.processProfile(db, Number(payload.sub));

  if (!result.success) {
    return c.json({
      success: result.success,
      message: result.message,
      status: result.status,
    });
  }

  return c.json({
    success: result.success,
    message: result.message,
    status: result.status,
    user: result.user,
  });
};
