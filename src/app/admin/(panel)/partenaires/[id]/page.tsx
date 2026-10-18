import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { partners } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
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
      <section className="adm-card" style={{ maxWidth: 640 }}>
        <PartnerForm partner={partner} />
      </section>
    </>
  );
}
