import "server-only";
import { count, desc, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { admins, notifications } from "@/db/schema";

export type FeedItem = {
  id: number;
  kind: string;
  title: string;
  body: string;
  href: string;
  createdAt: string;
  unread: boolean;
};

async function seenAt(adminId: number) {
  const [row] = await db
    .select({ seenAt: admins.notificationsSeenAt })
    .from(admins)
    .where(eq(admins.id, adminId));
  return row?.seenAt ?? null;
}

export async function getFeed(adminId: number, limit = 8) {
  const since = await seenAt(adminId);
  const [items, [unread]] = await Promise.all([
    db.select().from(notifications).orderBy(desc(notifications.createdAt)).limit(limit),
    since
      ? db.select({ value: count() }).from(notifications).where(gt(notifications.createdAt, since))
      : db.select({ value: count() }).from(notifications),
  ]);
  return {
    unread: unread.value,
    items: items.map<FeedItem>((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      body: item.body,
      href: item.href,
      createdAt: item.createdAt.toISOString(),
      unread: !since || item.createdAt > since,
    })),
  };
}

export async function markSeen(adminId: number) {
  await db.update(admins).set({ notificationsSeenAt: new Date() }).where(eq(admins.id, adminId));
}
