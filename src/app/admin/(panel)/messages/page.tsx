import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { requireAdmin } from "@/lib/auth/session";
import { Flash } from "../../_components/Alerts";
import { RequestList } from "../../_components/RequestList";

export const metadata: Metadata = { title: "Messages" };

export default async function Page({ searchParams }: PageProps<"/admin/messages">) {
  await requireAdmin();
  const { ok, statut } = await searchParams;

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Messages</h1>
          <p>Messages envoyés depuis le formulaire de contact.</p>
        </div>
        <a href="/admin/export/messages" download className="adm-btn adm-btn-ghost">
          <Icon name="download" size={16} />
          Exporter (CSV)
        </a>
      </div>
      <Flash ok={ok} />
      <RequestList kind="messages" statut={typeof statut === "string" ? statut : undefined} />
    </>
  );
}
