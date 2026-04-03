import { GitHubContributionResponse } from "../types/github.type";

export const getContributionsByYear = async (
  username: string,
  year: number,
  token: string,
): Promise<number> => {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": username,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.statusText}`);
  }

  const data = (await res.json()) as GitHubContributionResponse;
  return data.data.user.contributionsCollection.contributionCalendar
    .totalContributions;
};
