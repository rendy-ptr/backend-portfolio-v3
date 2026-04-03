import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../database/schema.database';

export const connectDB = (d1: D1Database) => {
  return drizzle(d1, { schema });
};

export type DB = ReturnType<typeof connectDB>;