import { Context } from "hono";
import type { Bindings } from "../types/binding.type";
import { getWakaTimeStatsService } from "../services/wakatime.service";

export const getWakaTimeStatsController = async (
  c: Context<{ Bindings: Bindings }>,
) => {
  const apiKey = c.env.WAKATIME_API_KEY;
  const encoded = btoa(apiKey);
  try {
    const data = await getWakaTimeStatsService(encoded);
    return c.json(data);
  } catch (err) {
    return c.json(
      {
        error: "Failed to fetch WakaTime stats",
        detail: err instanceof Error ? err.message : String(err),
      },
      500,
    );
  }
};
