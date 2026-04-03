import type { WakaTimeStatsResponse } from "../types/wakatime.type";

export const getWakaTimeStatsRepository = async (encoded: string) => {
  const res = await fetch(
    "https://wakatime.com/api/v1/users/current/stats/all_time",
    {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`WakaTime API Error: ${res.statusText}`);
  }

  const data = (await res.json()) as WakaTimeStatsResponse;
  return data;
};
