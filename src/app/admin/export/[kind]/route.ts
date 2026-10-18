import { desc } from "drizzle-orm";
import { db } from "@/db";
import { auditLogs, messages, registrations } from "@/db/schema";
import { actionLabels } from "@/lib/admin/audit-labels";
import type { AuditAction } from "@/lib/audit";
import { statusLabels } from "@/lib/admin/status";
import { paymentMethodLabels, paymentStatusLabels } from "@/lib/registration";
import { requireAdmin } from "@/lib/auth/session";

function csvCell(value: unknown) {
  const text = value instanceof Date ? value.toISOString() : String(value ?? "");
  // Neutralize spreadsheet formulas, then quote.
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

function toCsv(header: string[], rows: unknown[][]) {
  // BOM so Excel opens accented characters correctly.
  return "﻿" + [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
}

export async function GET(_request: Request, { params }: RouteContext<"/admin/export/[kind]">) {
  await requireAdmin();
  const { kind } = await params;

  let csv: string;
  if (kind === "inscriptions") {
    const rows = await db.select().from(registrations).orderBy(desc(registrations.createdAt));
    csv = toCsv(
      [
        "Date", "Dossier", "Nom", "Téléphone", "E-mail", "Formation", "Montant", "Mode de paiement",
        "Paiement", "ID transaction", "Numéro payeur", "Déclaré le", "Confirmé le", "Message", "Note interne",
      ],
      rows.map((r) => [
        r.createdAt, r.reference, r.name, r.phone, r.email, r.formation, r.amount,
        paymentMethodLabels[r.paymentMethod], paymentStatusLabels[r.paymentStatus], r.transactionId,
        r.payerPhone, r.paymentDeclaredAt ?? "", r.paymentConfirmedAt ?? "", r.message, r.adminNote,
      ]),
    );
  } else if (kind === "messages") {
    const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
    csv = toCsv(
      ["Date", "Nom", "E-mail", "Téléphone", "Objet", "Message", "Statut", "Note interne"],
      rows.map((r) => [r.createdAt, r.name, r.email, r.phone, r.subject, r.message, statusLabels[r.status], r.adminNote]),
    );
  } else if (kind === "journal") {
    const rows = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt));
    csv = toCsv(
      ["Date", "Auteur", "Type", "Action", "Détail", "Élément", "Adresse IP", "Navigateur"],
      rows.map((r) => [
        r.createdAt, r.actor, r.adminId ? "Administrateur" : "Visiteur",
        actionLabels[r.action as AuditAction] ?? r.action, r.summary,
        [r.entity, r.entityId].filter(Boolean).join(" #"), r.ip, r.userAgent,
      ]),
    );
  } else {
    return new Response("Not found", { status: 404 });
  }

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vpfa-${kind}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
