import "server-only";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";
import { builtInImages, type ImageOption } from "./images";

export async function getImageOptions(): Promise<ImageOption[]> {
  const uploads = await db
    .select({ id: media.id, filename: media.filename })
    .from(media)
    .orderBy(desc(media.createdAt));
  return [
    ...uploads.map((upload) => ({ src: `/media/${upload.id}`, label: upload.filename })),
    ...builtInImages,
  ];
}
