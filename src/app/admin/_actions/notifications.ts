"use server";

import { refresh } from "next/cache";
import { markSeen } from "@/lib/admin/notifications";
import { requireAdmin } from "@/lib/auth/session";

export async function markNotificationsSeen() {
  const admin = await requireAdmin();
  await markSeen(admin.id);
  refresh();
}
