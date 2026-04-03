import { Hono } from "hono";
import type { Bindings } from "../../types/binding.type";
import { getCertificateController } from "../../controllers/certificate.controller";

const certificateRoute = new Hono<{ Bindings: Bindings }>();

certificateRoute.get("/", getCertificateController);

export default certificateRoute;
