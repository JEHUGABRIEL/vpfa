import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth/session";
import { Flash } from "../../_components/Alerts";
import { RegistrationList } from "../../_components/RegistrationList";

export const metadata: Metadata = { title: "Inscriptions" };

export default async function Page({ searchParams }: PageProps<"/admin/inscriptions">) {
  await requireAdmin();
  const { ok, statut } = await searchParams;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Inscriptions</h1>
          <p>Vérifiez les paiements déclarés sur le relevé Orange Money, puis confirmez les places.</p>
        </div>
        <a href="/admin/export/inscriptions" download className="adm-btn adm-btn-ghost">
          <Icon name="download" size={16} />
          Exporter (CSV)
        </a>
      </div>
      <Flash ok={ok} />
      <RegistrationList statut={typeof statut === "string" ? statut : undefined} />
    </>
  );
}
