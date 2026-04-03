import { profileTable } from "../database/schema.database";
import type { DB } from "../config/database.config";

export const profileSeeder = async (
  db: DB,
  user: { id: number },
) => {
  await db.insert(profileTable).values({
    userId: user.id,
    name: "Rendy Putra Pratama",
    age: 22,
    birthDate: "2003-08-07",
    birthPlace: "Jakarta",
    domicile: "Karawang",
    gender: "Laki-laki",
    religion: "Islam",
    phone: "+62 857-7700-5969",
    profileUrl: "https://example.com/avatar.png",
    githubUrl: "https://github.com/rendyputrapratama",
    linkedinUrl: "https://linkedin.com/in/rendyputrapratama",
    portfolioUrl: "https://rendyputrapratama.com",
    instagramUrl: "https://instagram.com/rendyputrapratama",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};
