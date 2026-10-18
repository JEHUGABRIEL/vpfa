"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { type AdminFormState, invalid, isUniqueViolation } from "@/lib/admin/form";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/auth/password";
import { requireAdmin } from "@/lib/auth/session";
import { idField, requiredText } from "./shared";

const password = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `${MIN_PASSWORD_LENGTH} caractères minimum.`)
  .max(200);

const createSchema = z.object({
  name: requiredText(120, "Le nom"),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide."),
  password,
});

export async function createAdmin(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  try {
    await db.insert(admins).values({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: "error",
        message: "Ce compte existe déjà.",
        fieldErrors: { email: "Adresse déjà utilisée." },
      };
    }
    throw error;
  }

  refresh();
  return { status: "success", message: `Compte créé pour ${parsed.data.name}.` };
}

const changeSchema = z
  .object({
    current: z.string().min(1, "Saisissez votre mot de passe actuel."),
    next: password,
    confirm: z.string(),
  })
  .refine((data) => data.next === data.confirm, {
    path: ["confirm"],
    message: "Les deux mots de passe ne correspondent pas.",
  });

export async function changePassword(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const me = await requireAdmin();
  const parsed = changeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const [row] = await db
    .select({ passwordHash: admins.passwordHash })
    .from(admins)
    .where(eq(admins.id, me.id));
  if (!row || !(await verifyPassword(parsed.data.current, row.passwordHash))) {
    return {
      status: "error",
      message: "Mot de passe actuel incorrect.",
      fieldErrors: { current: "Mot de passe incorrect." },
    };
  }

  await db
    .update(admins)
    .set({ passwordHash: await hashPassword(parsed.data.next) })
    .where(eq(admins.id, me.id));
  return { status: "success", message: "Mot de passe modifié." };
}

export async function deleteAdmin(formData: FormData) {
  const me = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  if (id === me.id) return;
  await db.delete(admins).where(eq(admins.id, id));
  refresh();
}
