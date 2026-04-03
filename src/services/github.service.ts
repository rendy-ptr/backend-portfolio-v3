import { getContributionsByYear } from "../repositories/github.repository";
import { GitHubStatsResponse } from "../types/github.type";

export const getGitHubCommitsService = async (
  username: string,
  token: string,
): Promise<GitHubStatsResponse> => {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  const commitsPerYear = await Promise.all(
    years.map((year) => getContributionsByYear(username, year, token)),
  );

  const totalCommits = commitsPerYear.reduce(
    (acc: number, val: number) => acc + val,
    0,
  );

  return {
    totalCommits,
  };
};
