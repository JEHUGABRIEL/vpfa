"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { type PostMeta, posts } from "@/db/schema";
import { type AdminFormState, invalid, isUniqueViolation, lines, slugify } from "@/lib/admin/form";
import { record } from "@/lib/audit";
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
  const admin = await requireAdmin();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);

  const id = formData.get("id") ? idField.parse(formData.get("id")) : null;
  let savedId = id;
  const values = {
    ...parsed.data,
    slug: slugify(parsed.data.slug || parsed.data.title),
    meta: parseMeta(formData.get("meta")),
  };

  try {
    if (id) {
      await db.update(posts).set(values).where(eq(posts.id, id));
    } else {
      const [created] = await db.insert(posts).values(values).returning({ id: posts.id });
      savedId = created.id;
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

  await record(admin, id ? "modification" : "creation", `${id ? "Modification" : "Création"} de l'article « ${values.title} »`, {
    entity: "posts",
    entityId: savedId ?? "",
  });
  updateTag(tags.posts);
  redirect(`/admin/actualites?ok=${id ? "updated" : "created"}`);
}

export async function togglePost(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const published = formData.get("published") === "true";
  const [row] = await db
    .update(posts)
    .set({ published })
    .where(eq(posts.id, id))
    .returning({ id: posts.id, name: posts.title });
  if (row) {
    await record(admin, published ? "publication" : "masquage", `${published ? "Mise en ligne" : "Masquage"} de l'article « ${row.name} »`, {
      entity: "posts",
      entityId: row.id,
    });
  }
  updateTag(tags.posts);
  refresh();
}

export async function deletePost(formData: FormData) {
  const admin = await requireAdmin();
  const [removed] = await db
    .delete(posts)
    .where(eq(posts.id, idField.parse(formData.get("id"))))
    .returning({ id: posts.id, name: posts.title });
  if (removed) {
    await record(admin, "suppression", `Suppression de l'article « ${removed.name} »`, {
      entity: "posts",
      entityId: removed.id,
    });
  }
  updateTag(tags.posts);
  redirect("/admin/actualites?ok=deleted");
}
