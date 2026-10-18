import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deletePartner, togglePartner } from "../../_actions/partners";
import { Flash, PublishedBadge } from "../../_components/Alerts";
import { SubmitButton } from "../../_components/buttons";
import { PartnerForm } from "../../_components/PartnerForm";

export const metadata: Metadata = { title: "Partenaires" };

export default async function PartnersAdminPage({ searchParams }: PageProps<"/admin/partenaires">) {
  await requireAdmin();
  const { ok } = await searchParams;
  const rows = await db.select().from(partners).orderBy(asc(partners.sortOrder), asc(partners.id));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Partenaires</h1>
          <p>Les partenaires affichés défilent dans le bandeau de l&apos;accueil.</p>
        </div>
      </div>
      <Flash ok={ok} />

      <div className="adm-form-grid">
        <section className="adm-card">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Partenaire</th>
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
                      <Link href={`/admin/partenaires/${row.id}`} className="adm-row-title">
                        {row.name}
                      </Link>
                      <span className="adm-row-sub">
                        {[row.featured ? "Principal" : "", row.type].filter(Boolean).join(" · ") || "-"}
                      </span>
                    </td>
                    <td className="num">{row.sortOrder}</td>
                    <td>
                      <PublishedBadge published={row.published} />
                    </td>
                    <td>
                      <div className="adm-actions">
                        <Link
                          href={`/admin/partenaires/${row.id}`}
                          className="adm-btn adm-btn-ghost adm-btn-sm"
                          aria-label={`Modifier ${row.name}`}
                        >
                          <Icon name="edit" size={16} />
                        </Link>
                        <form action={togglePartner}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="published" value={String(!row.published)} />
                          <SubmitButton className="adm-btn adm-btn-ghost adm-btn-sm" pendingLabel="…">
                            <Icon name={row.published ? "eye-off" : "eye"} size={16} />
                            <span className="adm-sr">{row.published ? "Masquer" : "Afficher"} {row.name}</span>
                          </SubmitButton>
                        </form>
                        <ConfirmDialog
                          action={deletePartner}
                          fields={{ id: row.id }}
                          title="Supprimer définitivement ?"
                          description="Cette action est définitive et ne peut pas être annulée."
                          confirmLabel="Supprimer"
                          trigger={
                            <>
                              <Icon name="trash" size={16} />
                            <span className="adm-sr">Supprimer {row.name}</span>
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
          {rows.length === 0 ? (
            <p className="adm-empty">
              <strong>Aucun partenaire</strong>
              Ajoutez-en un avec le formulaire.
            </p>
          ) : null}
        </section>

        <section className="adm-card">
          <h2>Ajouter un partenaire</h2>
          <PartnerForm />
        </section>
      </div>
    </>
  );
}
