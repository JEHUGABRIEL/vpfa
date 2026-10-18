// Usage : npm run admin:create -- prenom.nom@exemple.org "Prénom Nom"
// Le mot de passe est demandé de façon masquée (ou lu dans ADMIN_PASSWORD).
import { eq } from "drizzle-orm";
import { stdin, stdout } from "node:process";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/lib/auth/password.ts";
import { db, schema } from "./db.mts";

function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    stdout.write(question);
    let value = "";
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (char: string) => {
      if (char === "\r" || char === "\n" || char === "\u0004") {
        stdin.setRawMode?.(false);
        stdin.pause();
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (char === "\u0003") {
        process.exit(1);
      } else if (char === "\u007f") {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on("data", onData);
  });
}

const [email, ...nameParts] = process.argv.slice(2);
const name = nameParts.join(" ").trim();
if (!email || !name) {
  console.error('Usage : npm run admin:create -- email@exemple.org "Prénom Nom"');
  process.exit(1);
}

const password = process.env.ADMIN_PASSWORD ?? (await askHidden("Mot de passe : "));
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
  process.exit(1);
}

const passwordHash = await hashPassword(password);
const normalized = email.trim().toLowerCase();
const [existing] = await db
  .select({ id: schema.admins.id })
  .from(schema.admins)
  .where(eq(schema.admins.email, normalized));

if (existing) {
  await db
    .update(schema.admins)
    .set({ name, passwordHash })
    .where(eq(schema.admins.id, existing.id));
  console.log(`Administrateur ${normalized} mis à jour.`);
} else {
  await db.insert(schema.admins).values({ email: normalized, name, passwordHash });
  console.log(`Administrateur ${normalized} créé.`);
}
