import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { Icon } from "@/components/Icon";
import { deletePartner } from "../../../_actions/partners";
import { PublishedBadge } from "../../../_components/Alerts";
import { ConfirmDialog } from "../../../_components/ConfirmDialog";
import { PartnerForm } from "../../../_components/PartnerForm";

export const metadata: Metadata = { title: "Modifier un partenaire" };

export default async function EditPartnerPage({ params }: PageProps<"/admin/partenaires/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [partner] = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  if (!partner) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <p className="adm-crumb">
            <Link href="/admin/partenaires">Partenaires</Link>
          </p>
          <h1>{partner.name}</h1>
        </div>
      </div>
      <div className="adm-form-grid">
        <section className="adm-card">
          <h2>Informations</h2>
          <PartnerForm partner={partner} />
        </section>
        <div>
          <section className="adm-card">
            <h2>Sur le site</h2>
            <p>
              <PublishedBadge published={partner.published} />
            </p>
            <p className="adm-hint">
              {partner.published
                ? "Ce nom défile dans le bandeau « Ils nous font confiance » de l'accueil."
                : "Ce partenaire est masqué : il n'apparaît pas sur le site."}
              {partner.featured ? " Il fait partie des partenaires principaux." : ""}
            </p>
            {partner.website ? (
              <p>
                <a href={partner.website} target="_blank" rel="noopener noreferrer">
                  Ouvrir son site web
                </a>
              </p>
            ) : null}
          </section>
          <section className="adm-card">
            <h2>Zone sensible</h2>
            <p className="adm-hint" style={{ marginBottom: "0.9rem" }}>
              Pour le retirer temporairement, décochez plutôt « Affiché sur le site ».
            </p>
            <ConfirmDialog
              action={deletePartner}
              fields={{ id: partner.id }}
              title={`Supprimer ${partner.name} ?`}
              description="Ce partenaire disparaîtra du site et de la liste. Cette action est définitive."
              confirmLabel="Supprimer"
              trigger={
                <>
                  <Icon name="trash" size={16} />
                  Supprimer ce partenaire
                </>
              }
            />
          </section>
        </div>
      </div>
    </>
  );
}
