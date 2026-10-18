"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { type PostMeta, posts } from "@/db/schema";
import { type AdminFormState, invalid, isUniqueViolation, lines, slugify } from "@/lib/admin/form";
import { requireAdmin } from "@/lib/auth/session";
import { tags } from "@/lib/content";
import { checkbox, idField, imageField, optionalText, requiredText } from "./shared";

const postSchema = z.object({
  title: requiredText(200, "Le titre"),
  slug: optionalText(80),
  category: requiredText(80, "La catégorie"),
  excerpt: requiredText(400, "Le résumé"),
  body: requiredText(20000, "Le texte"),
  quote: optionalText(300),
  image: imageField,
  imageAlt: requiredText(200, "La description de l'image"),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide."),
  published: checkbox,
});

/** "Lieu : Bangui" lines -> [{ label: "Lieu", value: "Bangui" }] */
function parseMeta(value: FormDataEntryValue | null): PostMeta[] {
  return lines(value).flatMap((line) => {
    const index = line.indexOf(":");
    if (index <= 0) return [];
    return [{ label: line.slice(0, index).trim(), value: line.slice(index + 1).trim() }];
  });
}

export async function savePost(_previous: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
  const values = {
    ...parsed.data,
    slug: slugify(parsed.data.slug || parsed.data.title),
    meta: parseMeta(formData.get("meta")),
  };

  try {
    if (id) {
      await db.update(posts).set(values).where(eq(posts.id, id));
    } else {
      await db.insert(posts).values(values);
    }
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        status: "error",
        message: "Un autre article utilise déjà cette adresse.",
        fieldErrors: { slug: "Adresse déjà utilisée : modifiez-la." },
      };
    }
    throw error;
  }

  updateTag(tags.posts);
  redirect(`/admin/actualites?ok=${id ? "updated" : "created"}`);
}

export async function togglePost(formData: FormData) {
  await requireAdmin();
  const id = idField.parse(formData.get("id"));
  await db
    .update(posts)
    .set({ published: formData.get("published") === "true" })
    .where(eq(posts.id, id));
  updateTag(tags.posts);
  refresh();
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  await db.delete(posts).where(eq(posts.id, idField.parse(formData.get("id"))));
  updateTag(tags.posts);
  redirect("/admin/actualites?ok=deleted");
}
