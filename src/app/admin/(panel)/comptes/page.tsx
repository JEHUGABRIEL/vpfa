import { asc } from "drizzle-orm";
import type { Metadata } from "next";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { formatDateTime } from "@/lib/admin/status";
import { requireAdmin } from "@/lib/auth/session";
import { deleteAdmin } from "../../_actions/accounts";
import { ChangePasswordForm, CreateAdminForm } from "../../_components/AccountForms";

export const metadata: Metadata = { title: "Comptes" };

export default async function AccountsPage() {
  const me = await requireAdmin();
  const rows = await db
    .select({ id: admins.id, name: admins.name, email: admins.email, lastLoginAt: admins.lastLoginAt })
    .from(admins)
    .orderBy(asc(admins.name));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Comptes</h1>
          <p>Toutes les personnes listées ici ont un accès complet au back-office.</p>
        </div>
      </div>

      <section className="adm-card">
        <h2>Administrateurs</h2>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th scope="col">Personne</th>
                <th scope="col">Dernière connexion</th>
                <th scope="col">
                  <span className="adm-sr">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <span className="adm-row-title">
                      {row.name}
                      {row.id === me.id ? " (vous)" : ""}
                    </span>
                    <span className="adm-row-sub">{row.email}</span>
                  </td>
                  <td>{row.lastLoginAt ? formatDateTime(row.lastLoginAt) : "Jamais"}</td>
                  <td>
                    {row.id === me.id ? null : (
                      <ConfirmDialog
                        action={deleteAdmin}
                        fields={{ id: row.id }}
                        title="Retirer cet accès ?"
                        description="La personne ne pourra plus se connecter au back-office."
                        confirmLabel="Retirer l'accès"
                        trigger={
                          <>
                            <Icon name="trash" size={16} />
                          Retirer
                          </>
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="adm-grid-2" style={{ marginTop: "1.2rem" }}>
        <section className="adm-card">
          <h2>Ajouter un administrateur</h2>
          <CreateAdminForm />
        </section>
        <section className="adm-card">
          <h2>Mon mot de passe</h2>
          <ChangePasswordForm />
        </section>
      </div>
    </>
  );
}
