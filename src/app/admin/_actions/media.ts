"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { db } from "@/db";
import { formations, media, posts } from "@/db/schema";
import { detectImageType, MAX_UPLOAD_BYTES } from "@/lib/admin/images";
import { requireAdmin } from "@/lib/auth/session";

export type UploadResult =
  | { ok: true; src: string; label: string }
  | { ok: false; message: string };

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Aucun fichier sélectionné." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Image trop lourde : 3 Mo maximum." };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mimeType = detectImageType(bytes);
  if (!mimeType) {
    return { ok: false, message: "Format non pris en charge : utilisez JPEG, PNG ou WebP." };
  }

  const filename = file.name.slice(0, 160) || "image";
  const [row] = await db
    .insert(media)
    .values({ filename, mimeType, size: bytes.length, data: Buffer.from(bytes) })
    .returning({ id: media.id });

  refresh();
  return { ok: true, src: `/media/${row.id}`, label: filename };
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const src = `/media/${id}`;

  // Refuse to break a published page that still shows this image.
  const [usedByFormation] = await db
    .select({ id: formations.id })
    .from(formations)
    .where(eq(formations.image, src))
    .limit(1);
  const [usedByPost] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.image, src))
    .limit(1);
  if (usedByFormation || usedByPost) return;

  await db.delete(media).where(eq(media.id, id));
  refresh();
}
