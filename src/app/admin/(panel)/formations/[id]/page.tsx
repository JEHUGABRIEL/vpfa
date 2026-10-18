import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { formations } from "@/db/schema";
import { getImageOptions } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/session";
import { FormationForm } from "../../../_components/FormationForm";

export const metadata: Metadata = { title: "Modifier une formation" };

export default async function EditFormationPage({ params }: PageProps<"/admin/formations/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const [[formation], imageOptions] = await Promise.all([
    db.select().from(formations).where(eq(formations.id, id)).limit(1),
    getImageOptions(),
  ]);
  if (!formation) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <p className="adm-crumb">
            <Link href="/admin/formations">Formations</Link>
          </p>
          <h1>{formation.title}</h1>
        </div>
        <Link href={`/formations#${formation.slug}`} target="_blank" className="adm-btn adm-btn-ghost">
          <Icon name="external" size={16} />
          Voir sur le site
        </Link>
      </div>
      <FormationForm formation={formation} imageOptions={imageOptions} />
    </>
  );
}
