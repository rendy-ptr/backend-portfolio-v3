import { Hono } from "hono";
import type { Bindings } from "../../types/binding.type";
import {
  loginController,
  logoutController,
  profileController,
} from "../../controllers/auth/auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoute = new Hono<{ Bindings: Bindings }>();

authRoute.post("/login", loginController);
authRoute.post("/logout", logoutController);
authRoute.get("/profile", authMiddleware, profileController);

export default authRoute;
