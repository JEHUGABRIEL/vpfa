import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema.ts";

process.loadEnvFile?.(".env.local");
setDefaultAutoSelectFamilyAttemptTimeout(3000);

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL manquant dans .env.local");

export const db = drizzle(neon(url), { schema });
export { schema };
