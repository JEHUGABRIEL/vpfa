import { count, desc, inArray } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { actionGroups, actionLabels } from "@/lib/admin/audit-labels";
import { formatDateTime } from "@/lib/admin/status";
import type { AuditAction } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Journal d'activité" };

const PAGE_SIZE = 50;

const tone: Partial<Record<AuditAction, string>> = {
  connexion_echouee: "adm-badge-danger",
  suppression: "adm-badge-danger",
  creation: "adm-badge-on",
  publication: "adm-badge-on",
  inscription: "adm-badge-nouveau",
  paiement_declare: "adm-badge-nouveau",
  message: "adm-badge-nouveau",
  temoignage: "adm-badge-nouveau",
};

export default async function JournalPage({ searchParams }: PageProps<"/admin/journal">) {
  await requireAdmin();
  const { groupe, page } = await searchParams;
  const group = actionGroups.find((item) => item.label === groupe) ?? null;
  const current = Math.max(1, Number(page) || 1);
  const where = group ? inArray(auditLogs.action, group.actions) : undefined;

  const [rows, [total]] = await Promise.all([
    db
      .select()
      .from(auditLogs)
      .where(where)
      .orderBy(desc(auditLogs.createdAt), desc(auditLogs.id))
      .limit(PAGE_SIZE)
      .offset((current - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(auditLogs).where(where),
  ]);
  const pages = Math.max(1, Math.ceil(total.value / PAGE_SIZE));
  const href = (next: { groupe?: string | null; page?: number }) => {
    const params = new URLSearchParams();
    const g = next.groupe === undefined ? group?.label : next.groupe;
    if (g) params.set("groupe", g);
    if (next.page && next.page > 1) params.set("page", String(next.page));
    const query = params.toString();
    return `/admin/journal${query ? `?${query}` : ""}`;
  };

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Journal d&apos;activité</h1>
          <p>
            Tout ce qui se passe sur le site et dans le back-office : connexions,
            modifications, suppressions et demandes reçues.
          </p>
        </div>
        <a href="/admin/export/journal" download className="adm-btn adm-btn-ghost">
          <Icon name="download" size={16} />
          Exporter (CSV)
        </a>
      </div>

      <nav className="adm-filters" aria-label="Filtrer le journal">
        <Link href={href({ groupe: null })} aria-current={group === null ? "page" : undefined}>
          Tout
        </Link>
        {actionGroups.map((item) => (
          <Link
            key={item.label}
            href={href({ groupe: item.label })}
            aria-current={group?.label === item.label ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <section className="adm-card">
        {rows.length === 0 ? (
          <p className="adm-empty">
            <strong>Aucune activité enregistrée</strong>
            Les actions apparaîtront ici au fil de l&apos;utilisation du site.
          </p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Auteur</th>
                  <th scope="col">Action</th>
                  <th scope="col">Détail</th>
                  <th scope="col">Adresse IP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="adm-nowrap">{formatDateTime(row.createdAt)}</td>
                    <td>
                      <span className="adm-row-title">{row.actor}</span>
                      <span className="adm-row-sub">{row.adminId ? "Administrateur" : "Visiteur"}</span>
                    </td>
                    <td>
                      <span className={`adm-badge ${tone[row.action as AuditAction] ?? "adm-badge-off"}`}>
                        {actionLabels[row.action as AuditAction] ?? row.action}
                      </span>
                    </td>
                    <td>{row.summary}</td>
                    <td className="adm-nowrap adm-muted" title={row.userAgent}>
                      {row.ip || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pages du journal">
            {current > 1 ? (
              <Link href={href({ page: current - 1 })} className="adm-btn adm-btn-ghost adm-btn-sm">
                Plus récents
              </Link>
            ) : (
              <span />
            )}
            <span className="adm-row-sub">
              Page {current} sur {pages} · {total.value} évènements
            </span>
            {current < pages ? (
              <Link href={href({ page: current + 1 })} className="adm-btn adm-btn-ghost adm-btn-sm">
                Plus anciens
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </section>
    </>
  );
}
