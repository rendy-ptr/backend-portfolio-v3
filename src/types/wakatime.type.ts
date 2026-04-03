export interface WakaTimeLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  text: string;
}

export interface WakaTimeStatsResponse {
  data: {
    total_seconds_including_other_language: number;
    human_readable_total_including_other_language: string;
    best_day: {
      date: string;
      total_seconds: number;
      text: string;
    };
    languages: WakaTimeLanguage[];
  };
}