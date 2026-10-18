import "server-only";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { readSession, SESSION_COOKIE, SESSION_DURATION_S, signSession } from "./token";

export async function startSession(adminId: number) {
  const token = await signSession({ adminId });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_S,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export type CurrentAdmin = { id: number; name: string; email: string };

/**
 * Data access layer: every admin page and action calls this. The proxy only
 * does an optimistic cookie check; this re-checks the admin still exists.
 */
export async function requireAdmin(): Promise<CurrentAdmin> {
  const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");

  const [admin] = await db
    .select({ id: admins.id, name: admins.name, email: admins.email })
    .from(admins)
    .where(eq(admins.id, session.adminId))
    .limit(1);

  if (!admin) redirect("/admin/login");
  return admin;
}
