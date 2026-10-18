import { defineConfig } from "drizzle-kit";

process.loadEnvFile?.(".env.local");

// Migrations use the direct (non-pooled) connection.
const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant dans .env.local");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
