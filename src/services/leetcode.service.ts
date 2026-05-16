import { getLeetCodeUserStats } from '../repositories/leetcode.repository';

export const getLeetCodeStatsService = async (username: string) => {
  const data: any = await getLeetCodeUserStats(username);

  const matchedUser = data.data?.matchedUser;
  if (!matchedUser) {
    return { totalSolved: 0 };
  }

  const totalSolved =
    matchedUser.submitStats.acSubmissionNum.find((s: any) => s.difficulty === 'All')?.count || 0;

  return {
    totalSolved,
  };
};
