import { connection } from "next/server";
import { getFeed } from "@/lib/admin/notifications";
import { requireAdmin } from "@/lib/auth/session";

// Polled by the notification bell.
export async function GET() {
  await connection();
  const admin = await requireAdmin();
  const feed = await getFeed(admin.id);
  return Response.json(feed, { headers: { "Cache-Control": "no-store" } });
}
