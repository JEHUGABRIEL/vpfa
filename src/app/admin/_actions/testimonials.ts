"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { record } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { tags } from "@/lib/content";
import { idField } from "./shared";

export async function setTestimonialApproved(formData: FormData) {
  const admin = await requireAdmin();
  const approved = formData.get("approved") === "true";
  const [row] = await db
    .update(testimonials)
    .set({ approved })
    .where(eq(testimonials.id, idField.parse(formData.get("id"))))
    .returning({ id: testimonials.id, name: testimonials.name });
  if (row) {
    await record(
      admin,
      approved ? "publication" : "masquage",
      `${approved ? "Publication" : "Retrait"} du témoignage de ${row.name}`,
      { entity: "temoignages", entityId: row.id },
    );
  }
  updateTag(tags.testimonials);
  refresh();
}

export async function deleteTestimonial(formData: FormData) {
  const admin = await requireAdmin();
  const [removed] = await db
    .delete(testimonials)
    .where(eq(testimonials.id, idField.parse(formData.get("id"))))
    .returning({ id: testimonials.id, name: testimonials.name });
  if (removed) {
    await record(admin, "suppression", `Suppression du témoignage de ${removed.name}`, {
      entity: "temoignages",
      entityId: removed.id,
    });
  }
  updateTag(tags.testimonials);
  refresh();
}
