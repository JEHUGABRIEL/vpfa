"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { paymentStatus, registrations } from "@/db/schema";
import { record } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { paymentStatusLabels } from "@/lib/registration";
import { idField } from "./shared";

export async function setPaymentStatus(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const next = z.enum(paymentStatus.enumValues).parse(formData.get("paymentStatus"));
  const [row] = await db
    .update(registrations)
    .set({
      paymentStatus: next,
      paymentConfirmedAt: next === "confirme" ? new Date() : null,
      status: next === "confirme" || next === "annule" ? "traite" : "en_cours",
    })
    .where(eq(registrations.id, id))
    .returning({ reference: registrations.reference, name: registrations.name });
  if (row) {
    await record(
      admin,
      "statut",
      `Dossier ${row.reference ?? id} (${row.name}) passé à « ${paymentStatusLabels[next]} »`,
      { entity: "inscriptions", entityId: id },
    );
  }
  refresh();
}

export async function saveRegistrationNote(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const adminNote = z.string().trim().max(2000).parse(formData.get("adminNote") ?? "");
  const [row] = await db
    .update(registrations)
    .set({ adminNote })
    .where(eq(registrations.id, id))
    .returning({ reference: registrations.reference });
  if (row) {
    await record(admin, "modification", `Note interne modifiée sur le dossier ${row.reference ?? id}`, {
      entity: "inscriptions",
      entityId: id,
    });
  }
  refresh();
}
