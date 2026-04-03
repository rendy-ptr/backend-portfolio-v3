import { connectDB } from "../config/database.config";
import type { Bindings } from "../types/binding.type";
import { profileSeeder } from "./profile.seeder";
import { userSeeder } from "./user.seeder";
import { certificateSeeder } from "./certificate.seeder";

export const databaseSeeder = async (env: Bindings) => {
  const db = connectDB(env.DB);

  const user = await userSeeder(db);

  const profile = await profileSeeder(db, user);

  const certificate = await certificateSeeder(db, user);

  return { user, profile, certificate };
};
