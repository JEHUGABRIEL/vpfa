"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { type AdminFormState, invalid } from "@/lib/admin/form";
import { requireAdmin } from "@/lib/auth/session";
import { tags } from "@/lib/content";
import { checkbox, idField, optionalText, requiredText } from "./shared";

const partnerSchema = z.object({
  name: requiredText(200, "Le nom"),
  short: optionalText(40),
  type: optionalText(80),
  website: z.union([z.literal(""), z.string().trim().url("Adresse web invalide (https://…).")]),
  sortOrder: z.coerce.number().int().min(0).max(999),
  featured: checkbox,
  published: checkbox,
});

export async function savePartner(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = partnerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
  if (id) {
    await db.update(partners).set(parsed.data).where(eq(partners.id, id));
  } else {
    await db.insert(partners).values(parsed.data);
  }

  updateTag(tags.partners);
  redirect(`/admin/partenaires?ok=${id ? "updated" : "created"}`);
}

export async function togglePartner(formData: FormData) {
  await requireAdmin();
  await db
    .update(partners)
    .set({ published: formData.get("published") === "true" })
    .where(eq(partners.id, idField.parse(formData.get("id"))));
  updateTag(tags.partners);
  refresh();
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  await db.delete(partners).where(eq(partners.id, idField.parse(formData.get("id"))));
  updateTag(tags.partners);
  redirect("/admin/partenaires?ok=deleted");
}
