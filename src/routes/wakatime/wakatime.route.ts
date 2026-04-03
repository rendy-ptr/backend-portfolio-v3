import { Hono } from "hono";
import type { Bindings } from "../../types/binding.type";
import { getWakaTimeStatsController } from "../../controllers/wakatime.controller";

const wakatimeRoute = new Hono<{ Bindings: Bindings }>();

wakatimeRoute.get("/stats", getWakaTimeStatsController);

export default wakatimeRoute;