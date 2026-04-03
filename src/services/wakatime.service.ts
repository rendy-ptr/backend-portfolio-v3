import { getWakaTimeStatsRepository } from "../repositories/wakatime.repository";

export const getWakaTimeStatsService = async (encoded: string) => {
  const data = await getWakaTimeStatsRepository(encoded);

  const topLanguages = data.data.languages.slice(0, 3).map((lang) => ({
    name: lang.name,
    text: lang.text,
    percent: lang.percent,
  }));

  return {
    totalHours: data.data.human_readable_total_including_other_language,
    topLanguage: data.data.languages[0]?.name ?? "N/A",
    topLanguages,
    bestDay: {
      date: data.data.best_day?.date,
      text: data.data.best_day?.text,
    },
  };
};
