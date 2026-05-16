import type { Context } from 'hono';
import type { Bindings } from '../types/binding.type';
import { getLeetCodeStatsService } from '../services/leetcode.service';

export const getLeetCodeStatsController = async (c: Context<{ Bindings: Bindings }>) => {
  const username = c.env.LEETCODE_USERNAME;

  try {
    const stats = await getLeetCodeStatsService(username);
    return c.json(stats);
  } catch (error) {
    console.error('LeetCode Controller Error:', error);
    return c.json({ totalSolved: 0 });
  }
};
