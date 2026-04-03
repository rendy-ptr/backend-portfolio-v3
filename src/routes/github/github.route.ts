import { Hono } from "hono";
import type { Bindings } from "../../types/binding.type";
import { getGitHubCommitsController } from "../../controllers/github.controller";

const githubRoute = new Hono<{ Bindings: Bindings }>();

githubRoute.get("/commits", getGitHubCommitsController);

export default githubRoute;
