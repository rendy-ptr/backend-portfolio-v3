import { Hono } from "hono";
import type { Bindings } from "../../types/binding.type";
import { sendEmailController } from "../../controllers/email.controller";

const emailRoute = new Hono<{ Bindings: Bindings }>();

emailRoute.post("/send", sendEmailController);

export default emailRoute;
