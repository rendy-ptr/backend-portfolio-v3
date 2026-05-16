import { Hono } from 'hono';
import type { Bindings } from '../../types/binding.type';
import { getLeetCodeStatsController } from '../../controllers/leetcode.controller';

const leetcodeRoute = new Hono<{ Bindings: Bindings }>();

leetcodeRoute.get('/stats', getLeetCodeStatsController);

export default leetcodeRoute;
