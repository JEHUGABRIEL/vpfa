"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { formations } from "@/db/schema";
import { type AdminFormState, invalid, isUniqueViolation, lines, slugify } from "@/lib/admin/form";
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
  await requireAdmin();
  const parsed = formationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
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
      await db.insert(formations).values(values);
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

  updateTag(tags.formations);
  redirect(`/admin/formations?ok=${id ? "updated" : "created"}`);
}

export async function toggleFormation(formData: FormData) {
  await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const published = formData.get("published") === "true";
  await db.update(formations).set({ published }).where(eq(formations.id, id));
  updateTag(tags.formations);
  refresh();
}

export async function deleteFormation(formData: FormData) {
  await requireAdmin();
  const id = idField.parse(formData.get("id"));
  await db.delete(formations).where(eq(formations.id, id));
  updateTag(tags.formations);
  redirect("/admin/formations?ok=deleted");
}
