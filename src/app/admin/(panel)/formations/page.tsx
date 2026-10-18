import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { formations } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deleteFormation, toggleFormation } from "../../_actions/formations";
import { Flash, PublishedBadge } from "../../_components/Alerts";
import { SubmitButton } from "../../_components/buttons";

export const metadata: Metadata = { title: "Formations" };

export default async function FormationsAdminPage({
  searchParams,
}: PageProps<"/admin/formations">) {
  await requireAdmin();
  const { ok } = await searchParams;
  const rows = await db
    .select()
    .from(formations)
    .orderBy(asc(formations.sortOrder), asc(formations.id));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Formations</h1>
          <p>Chaque formation en ligne apparaît en carte sur l&apos;accueil et la page Formations.</p>
        </div>
        <Link href="/admin/formations/nouveau" className="adm-btn adm-btn-primary">
          <Icon name="plus" size={16} />
          Nouvelle formation
        </Link>
      </div>
      <Flash ok={ok} />

      <section className="adm-card">
        {rows.length === 0 ? (
          <p className="adm-empty">
            <strong>Aucune formation</strong>
            Créez la première pour l&apos;afficher sur le site.
          </p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="adm-sr">Image</span>
                  </th>
                  <th scope="col">Formation</th>
                  <th scope="col">Tarif</th>
                  <th scope="col" className="num">Ordre</th>
                  <th scope="col">Statut</th>
                  <th scope="col">
                    <span className="adm-sr">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Image src={row.image} alt="" width={64} height={44} className="adm-thumb" />
                    </td>
                    <td>
                      <Link href={`/admin/formations/${row.id}`} className="adm-row-title">
                        {row.title}
                      </Link>
                      <span className="adm-row-sub">
                        {row.program.length} module{row.program.length > 1 ? "s" : ""}
                        {row.duration ? ` · ${row.duration}` : ""}
                      </span>
                    </td>
                    <td>{row.price || "-"}</td>
                    <td className="num">{row.sortOrder}</td>
                    <td>
                      <PublishedBadge published={row.published} />
                    </td>
                    <td>
                      <div className="adm-actions">
                        <Link href={`/admin/formations/${row.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          <Icon name="edit" size={16} />
                          Modifier
                        </Link>
                        <form action={toggleFormation}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="published" value={String(!row.published)} />
                          <SubmitButton className="adm-btn adm-btn-ghost adm-btn-sm" pendingLabel="…">
                            <Icon name={row.published ? "eye-off" : "eye"} size={16} />
                            {row.published ? "Masquer" : "Publier"}
                          </SubmitButton>
                        </form>
                        <ConfirmDialog
                          action={deleteFormation}
                          fields={{ id: row.id }}
                          title="Supprimer définitivement ?"
                          description="Cette action est définitive et ne peut pas être annulée."
                          confirmLabel="Supprimer"
                          trigger={
                            <>
                              <Icon name="trash" size={16} />
                            <span className="adm-sr">Supprimer {row.title}</span>
                            </>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
