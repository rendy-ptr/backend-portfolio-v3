export interface GitHubContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
        };
      };
    };
  };
}

export interface GitHubStatsResponse {
  totalCommits: number;
}
