import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(
      ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
    );
    const dbFile = fs.readdirSync(basePath).find((f) => f.endsWith(".sqlite"));
    if (!dbFile) throw new Error(".sqlite file not found");
    return path.join(basePath, dbFile);
  } catch (err) {
    console.error("Info: Local database not found. Run bun run dev first.");
    return "";
  }
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema.database.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: getLocalD1DB(),
  },
});
