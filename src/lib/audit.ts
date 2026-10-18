import "server-only";
import { headers } from "next/headers";
import { db } from "@/db";
import { auditLogs, notifications } from "@/db/schema";

export type AuditAction =
  | "connexion"
  | "connexion_echouee"
  | "deconnexion"
  | "creation"
  | "modification"
  | "suppression"
  | "publication"
  | "masquage"
  | "televersement"
  | "statut"
  | "inscription"
  | "paiement_declare"
  | "message"
  | "temoignage"
  | "compte"
  | "mot_de_passe";

type Actor = { id: number; name: string } | { visitor: string } | null;

async function requestInfo() {
  try {
    const h = await headers();
    const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "").split(",")[0].trim();
    return { ip, userAgent: (h.get("user-agent") ?? "").slice(0, 300) };
  } catch {
    return { ip: "", userAgent: "" };
  }
}

/**
 * Writes one line to the activity log. Logging must never break the action
 * it describes, so failures are reported to the server log only.
 */
export async function record(
  actor: Actor,
  action: AuditAction,
  summary: string,
  target: { entity?: string; entityId?: string | number } = {},
) {
  try {
    const info = await requestInfo();
    await db.insert(auditLogs).values({
      adminId: actor && "id" in actor ? actor.id : null,
      actor: actor === null ? "Inconnu" : "id" in actor ? actor.name : actor.visitor,
      action,
      entity: target.entity ?? "",
      entityId: target.entityId === undefined ? "" : String(target.entityId),
      summary: summary.slice(0, 500),
      ...info,
    });
  } catch (error) {
    console.error("audit.record", error);
  }
}

/** Adds an item to the back-office notification feed. */
export async function notify(item: { kind: string; title: string; body?: string; href?: string }) {
  try {
    await db.insert(notifications).values({
      kind: item.kind,
      title: item.title.slice(0, 200),
      body: (item.body ?? "").slice(0, 500),
      href: item.href ?? "",
    });
  } catch (error) {
    console.error("audit.notify", error);
  }
}
