import { asc, desc } from "drizzle-orm";
import type { Metadata } from "next";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { formatDateTime } from "@/lib/admin/status";
import { requireAdmin } from "@/lib/auth/session";
import { deleteTestimonial, setTestimonialApproved } from "../../_actions/testimonials";
import { SubmitButton } from "../../_components/buttons";

export const metadata: Metadata = { title: "Témoignages" };

export default async function TestimonialsAdminPage() {
  await requireAdmin();
  // Pending first, then newest.
  const rows = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.approved), desc(testimonials.createdAt));
  const pending = rows.filter((row) => !row.approved).length;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Témoignages</h1>
          <p>
            Les six derniers témoignages publiés s&apos;affichent sur l&apos;accueil.
            {pending > 0 ? ` ${pending} en attente de relecture.` : ""}
          </p>
        </div>
      </div>

      {rows.length === 0 ? (
        <section className="adm-card">
          <p className="adm-empty">
            <strong>Aucun témoignage pour l&apos;instant</strong>
            Ceux envoyés depuis l&apos;accueil arriveront ici pour relecture.
          </p>
        </section>
      ) : (
        rows.map((row) => (
          <section className="adm-card adm-request" key={row.id}>
            <div className="adm-request-head">
              <div>
                <h3>{row.name}</h3>
                <p className="adm-request-meta">
                  {row.role ? <span>{row.role}</span> : null}
                  <span>{formatDateTime(row.createdAt)}</span>
                </p>
              </div>
              <span className={`adm-badge ${row.approved ? "adm-badge-on" : "adm-badge-nouveau"}`}>
                {row.approved ? "Publié" : "À relire"}
              </span>
            </div>
            <p className="adm-request-msg">{row.message}</p>
            <div className="adm-actions" style={{ justifyContent: "flex-start" }}>
              <form action={setTestimonialApproved}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="approved" value={String(!row.approved)} />
                <SubmitButton
                  className={`adm-btn adm-btn-sm ${row.approved ? "adm-btn-ghost" : "adm-btn-primary"}`}
                  pendingLabel="…"
                >
                  <Icon name={row.approved ? "eye-off" : "check"} size={16} />
                  {row.approved ? "Retirer du site" : "Publier"}
                </SubmitButton>
              </form>
              <ConfirmDialog
                action={deleteTestimonial}
                fields={{ id: row.id }}
                title="Supprimer définitivement ?"
                description="Cette action est définitive et ne peut pas être annulée."
                confirmLabel="Supprimer"
                trigger={
                  <>
                    <Icon name="trash" size={16} />
                  Supprimer
                  </>
                }
              />
            </div>
          </section>
        ))
      )}
    </>
  );
}
