"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { admins } from "@/db/schema";
import type { AdminFormState } from "@/lib/admin/form";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { record } from "@/lib/audit";
import { endSession, requireAdmin, startSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide."),
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});

// Compared against when the e-mail is unknown, so both paths cost the same time.
const dummyHash = hashPassword("vpfa-dummy-password");

export async function login(_previous: AdminFormState, formData: FormData): Promise<AdminFormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Identifiants invalides." };
  }

  const [admin] = await db
    .select({ id: admins.id, name: admins.name, passwordHash: admins.passwordHash })
    .from(admins)
    .where(eq(admins.email, parsed.data.email))
    .limit(1);

  const valid = await verifyPassword(parsed.data.password, admin?.passwordHash ?? (await dummyHash));
  if (!admin || !valid) {
    await record(null, "connexion_echouee", `Tentative de connexion refusée pour ${parsed.data.email}`, {
      entity: "compte",
    });
    return { status: "error", message: "E-mail ou mot de passe incorrect." };
  }

  await db.update(admins).set({ lastLoginAt: new Date() }).where(eq(admins.id, admin.id));
  await startSession(admin.id);
  await record(admin, "connexion", `${admin.name} s'est connecté·e au back-office`, {
    entity: "compte",
    entityId: admin.id,
  });
  redirect("/admin");
}

export async function logout() {
  const admin = await requireAdmin();
  await record(admin, "deconnexion", `${admin.name} s'est déconnecté·e`, { entity: "compte", entityId: admin.id });
  await endSession();
  redirect("/admin/login");
}
