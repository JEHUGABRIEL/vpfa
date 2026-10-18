"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { messages, registrations, requestStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { idField } from "./shared";

const tables = { inscriptions: registrations, messages } as const;
const kindField = z.enum(["inscriptions", "messages"]);

export async function updateRequest(formData: FormData) {
  await requireAdmin();
  const kind = kindField.parse(formData.get("kind"));
  const id = idField.parse(formData.get("id"));
  const status = z.enum(requestStatus.enumValues).parse(formData.get("status"));
  const adminNote = z.string().trim().max(2000).parse(formData.get("adminNote") ?? "");

  const table = tables[kind];
  await db.update(table).set({ status, adminNote }).where(eq(table.id, id));
  refresh();
}

export async function deleteRequest(formData: FormData) {
  await requireAdmin();
  const kind = kindField.parse(formData.get("kind"));
  const table = tables[kind];
  await db.delete(table).where(eq(table.id, idField.parse(formData.get("id"))));
  redirect(`/admin/${kind}?ok=deleted`);
}
