import * as bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { authRepository } from "../../repositories/auth/auth.repository";
import type { DB } from "../../config/database.config";

export class AuthService {
  async processLogin(db: DB, email: string, password: string, secret: string) {
    const user = await authRepository.findUserByEmail(db, email);

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
        status: 401 as const,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
        status: 401 as const,
      };
    }

    const payload = {
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    const token = await sign(payload, secret, "HS256");

    return {
      success: true,
      token,
      status: 200,
      message: "Login successful" as const,
    };
  }

  async processLogout(token: string | null) {
    if (token === null) {
      return {
        success: false,
        message: "You are not logged in",
        status: 401 as const,
      };
    }

    return {
      success: true,
      message: "Logged out properly",
      status: 200 as const,
    };
  }

  async processProfile(db: DB, userId: number) {
    const user = await authRepository.findUserById(db, userId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
        status: 404 as const,
      };
    }

    const { password, ...safeUser } = user;

    return {
      success: true,
      user: safeUser,
      status: 200,
      message: "Profile fetched successfully" as const,
    };
  }
}

export const authService = new AuthService();
