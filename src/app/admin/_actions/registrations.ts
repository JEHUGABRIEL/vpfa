"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { paymentStatus, registrations } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { idField } from "./shared";

export async function setPaymentStatus(formData: FormData) {
  await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const next = z.enum(paymentStatus.enumValues).parse(formData.get("paymentStatus"));
  await db
    .update(registrations)
    .set({
      paymentStatus: next,
      paymentConfirmedAt: next === "confirme" ? new Date() : null,
      status: next === "confirme" || next === "annule" ? "traite" : "en_cours",
    })
    .where(eq(registrations.id, id));
  refresh();
}

export async function saveRegistrationNote(formData: FormData) {
  await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const adminNote = z.string().trim().max(2000).parse(formData.get("adminNote") ?? "");
  await db.update(registrations).set({ adminNote }).where(eq(registrations.id, id));
  refresh();
}
