"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { messages, registrations, requestStatus } from "@/db/schema";
import { statusLabels } from "@/lib/admin/status";
import { record } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { idField } from "./shared";

const kindField = z.enum(["inscriptions", "messages"]);

export async function updateRequest(formData: FormData) {
  const admin = await requireAdmin();
  const id = idField.parse(formData.get("id"));
  const status = z.enum(requestStatus.enumValues).parse(formData.get("status"));
  const adminNote = z.string().trim().max(2000).parse(formData.get("adminNote") ?? "");

  const [row] = await db
    .update(messages)
    .set({ status, adminNote })
    .where(eq(messages.id, id))
    .returning({ id: messages.id, name: messages.name });
  if (row) {
    await record(admin, "statut", `Message de ${row.name} passé à « ${statusLabels[status]} »`, {
      entity: "messages",
      entityId: row.id,
    });
  }
  refresh();
}

export async function deleteRequest(formData: FormData) {
  const admin = await requireAdmin();
  const kind = kindField.parse(formData.get("kind"));
  const id = idField.parse(formData.get("id"));

  const [removed] =
    kind === "inscriptions"
      ? await db
          .delete(registrations)
          .where(eq(registrations.id, id))
          .returning({ name: registrations.name, label: registrations.reference })
      : await db
          .delete(messages)
          .where(eq(messages.id, id))
          .returning({ name: messages.name, label: messages.subject });
  if (removed) {
    const what = kind === "inscriptions" ? `de l'inscription ${removed.label ?? ""}` : "du message";
    await record(admin, "suppression", `Suppression ${what} de ${removed.name}`, { entity: kind, entityId: id });
  }
  redirect(`/admin/${kind}?ok=deleted`);
}
