import { Hono } from "hono";
import type { Bindings } from "../types/binding.type";
import { userSeeder } from "../seed/user.seeder";
import githubRoute from "./github/github.route";
import wakatimeRoute from "./wakatime/wakatime.route";
// import seedRoute from "./seed/seed.route";
import authRoute from "./auth/auth.route";
import certificateRoute from "./certificate/certificate.route";
import emailRoute from "./email/email.route";

const indexRoute = new Hono<{ Bindings: Bindings }>();

indexRoute.route("/github", githubRoute);
indexRoute.route("/wakatime", wakatimeRoute);
indexRoute.route("/auth", authRoute);
// indexRoute.route("/seed", seedRoute);
indexRoute.route('/certificate', certificateRoute)
indexRoute.route('/email', emailRoute)

export default indexRoute;
