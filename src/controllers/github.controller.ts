import { Context } from "hono";
import { getGitHubCommitsService } from "../services/github.service";
import type { Bindings } from "../types/binding.type";

export const getGitHubCommitsController = async (
  c: Context<{ Bindings: Bindings }>,
) => {
  const token = c.env.GITHUB_TOKEN;
  const username = c.env.GITHUB_USERNAME;

  try {
    const stats = await getGitHubCommitsService(username, token);
    return c.json(stats);
  } catch (err) {
    return c.json(
      {
        error: "Failed to fetch GitHub stats",
        detail: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};
