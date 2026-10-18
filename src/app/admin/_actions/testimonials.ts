"use server";

import { eq } from "drizzle-orm";
import { refresh, updateTag } from "next/cache";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { tags } from "@/lib/content";
import { idField } from "./shared";

export async function setTestimonialApproved(formData: FormData) {
  await requireAdmin();
  await db
    .update(testimonials)
    .set({ approved: formData.get("approved") === "true" })
    .where(eq(testimonials.id, idField.parse(formData.get("id"))));
  updateTag(tags.testimonials);
  refresh();
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, idField.parse(formData.get("id"))));
  updateTag(tags.testimonials);
  refresh();
}
