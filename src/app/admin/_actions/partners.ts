"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { type AdminFormState, invalid } from "@/lib/admin/form";
import { record } from "@/lib/audit";
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
  const admin = await requireAdmin();
  const parsed = partnerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
  let savedId = id;
  if (id) {
    await db.update(partners).set(parsed.data).where(eq(partners.id, id));
  } else {
    const [created] = await db.insert(partners).values(parsed.data).returning({ id: partners.id });
    savedId = created.id;
  }

  await record(admin, id ? "modification" : "creation", `${id ? "Modification" : "Création"} du partenaire « ${parsed.data.name} »`, {
    entity: "partners",
    entityId: savedId ?? "",
  });
  updateTag(tags.partners);
  redirect(`/admin/partenaires?ok=${id ? "updated" : "created"}`);
}

export async function togglePartner(formData: FormData) {
  const admin = await requireAdmin();
  const published = formData.get("published") === "true";
  const [row] = await db
    .update(partners)
    .set({ published })
    .where(eq(partners.id, idField.parse(formData.get("id"))))
    .returning({ id: partners.id, name: partners.name });
  if (row) {
    await record(admin, published ? "publication" : "masquage", `${published ? "Mise en ligne" : "Masquage"} du partenaire « ${row.name} »`, {
      entity: "partners",
      entityId: row.id,
    });
  }
  updateTag(tags.partners);
  refresh();
}

export async function deletePartner(formData: FormData) {
  const admin = await requireAdmin();
  const [removed] = await db
    .delete(partners)
    .where(eq(partners.id, idField.parse(formData.get("id"))))
    .returning({ id: partners.id, name: partners.name });
  if (removed) {
    await record(admin, "suppression", `Suppression du partenaire « ${removed.name} »`, {
      entity: "partners",
      entityId: removed.id,
    });
  }
  updateTag(tags.partners);
  redirect("/admin/partenaires?ok=deleted");
}
