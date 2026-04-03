import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});

export const profileTable = sqliteTable("profile", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  name: text().notNull(),
  age: int().notNull(),
  birthDate: text().notNull(),
  birthPlace: text().notNull(),
  domicile: text().notNull(),
  gender: text().notNull(),
  religion: text().notNull(),
  phone: text().notNull(),
  profileUrl: text().notNull(),
  githubUrl: text().notNull(),
  linkedinUrl: text().notNull(),
  portfolioUrl: text().notNull(),
  instagramUrl: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});

export const certificateTable = sqliteTable("certificate", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
  name: text().notNull(),
  description: text().notNull(),
  expired: text().notNull(),
  credential: text().notNull(),
  url: text().notNull(),
  createdAt: text().notNull(),
  updatedAt: text().notNull(),
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  profile: one(profileTable, {
    fields: [usersTable.id],
    references: [profileTable.userId],
  }),
  certificates: many(certificateTable),
}));

export const profileRelations = relations(profileTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profileTable.userId],
    references: [usersTable.id],
  }),
}));

export const certificateRelations = relations(certificateTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [certificateTable.userId],
    references: [usersTable.id],
  }),
}));
