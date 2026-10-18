"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { formations } from "@/db/schema";
import { type AdminFormState, invalid, isUniqueViolation, lines, slugify } from "@/lib/admin/form";
import { record } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { tags } from "@/lib/content";
import { checkbox, idField, imageField, optionalText, requiredText } from "./shared";

const formationSchema = z.object({
  title: requiredText(160, "Le titre"),
  slug: optionalText(80),
  kicker: optionalText(80),
  price: optionalText(60),
  duration: optionalText(60),
  badge: optionalText(40),
  description: optionalText(600),
  image: imageField,
  imageAlt: requiredText(200, "La description de l'image"),
  note: optionalText(200),
  sortOrder: z.coerce.number().int().min(0).max(999),
  published: checkbox,
});

export async function saveFormation(
  _previous: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const admin = await requireAdmin();
  const parsed = formationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
  let savedId = id;
  const values = {
    ...parsed.data,
    slug: slugify(parsed.data.slug || parsed.data.title),
    program: lines(formData.get("program")),
    benefits: lines(formData.get("benefits")),
  };

  try {
    if (id) {
      await db.update(formations).set(values).where(eq(formations.id, id));
    } else {
      const [created] = await db.insert(formations).values(values).returning({ id: formations.id });
      savedId = created.id;
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: "error",
        message: "Une autre formation utilise déjà cette adresse.",
        fieldErrors: { slug: "Adresse déjà utilisée : modifiez-la." },
      };
    }
    throw error;
  }

  await record(admin, id ? "modification" : "creation", `${id ? "Modification" : "Création"} de la formation « ${values.title} »`, {
    entity: "formations",
    entityId: savedId ?? "",
  });
  updateTag(tags.formations);
  redirect(`/admin/formations?ok=${id ? "updated" : "created"}`);
}

export async function toggleFormation(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const published = formData.get("published") === "true";
  const [row] = await db
    .update(formations)
    .set({ published })
    .where(eq(formations.id, id))
    .returning({ id: formations.id, name: formations.title });
  if (row) {
    await record(admin, published ? "publication" : "masquage", `${published ? "Mise en ligne" : "Masquage"} de la formation « ${row.name} »`, {
      entity: "formations",
      entityId: row.id,
    });
  }
  updateTag(tags.formations);
  refresh();
}

export async function deleteFormation(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const [removed] = await db
    .delete(formations)
    .where(eq(formations.id, id))
    .returning({ id: formations.id, name: formations.title });
  if (removed) {
    await record(admin, "suppression", `Suppression de la formation « ${removed.name} »`, {
      entity: "formations",
      entityId: removed.id,
    });
  }
  updateTag(tags.formations);
  redirect("/admin/formations?ok=deleted");
}
