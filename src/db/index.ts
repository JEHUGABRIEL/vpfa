import "server-only";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL manquant : ajoutez-le dans .env.local");
}

// Node gives up on each address after 250 ms by default, which is too short
// for high-latency links to the database region.
setDefaultAutoSelectFamilyAttemptTimeout(3000);

export const db = drizzle(neon(url), { schema });
