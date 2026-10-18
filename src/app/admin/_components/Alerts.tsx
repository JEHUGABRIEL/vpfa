import { Icon } from "@/components/Icon";
import type { AdminFormState } from "@/lib/admin/form";

const okMessages: Record<string, string> = {
  created: "Élément créé et publié sur le site.",
  updated: "Modifications enregistrées.",
  deleted: "Élément supprimé.",
};

export function Flash({ ok }: { ok?: string | string[] }) {
  const message = typeof ok === "string" ? okMessages[ok] : undefined;
  if (!message) return null;
  return (
    <p className="adm-alert adm-alert-ok" role="status">
      <Icon name="check" size={16} />
      {message}
    </p>
  );
}

export function FormAlert({ state }: { state: AdminFormState }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <p
      className={`adm-alert ${state.status === "success" ? "adm-alert-ok" : "adm-alert-err"}`}
      role={state.status === "error" ? "alert" : "status"}
    >
      <Icon name={state.status === "success" ? "check" : "close"} size={16} />
      {state.message}
    </p>
  );
}

export function PublishedBadge({ published }: { published: boolean }) {
  return (
    <span className={`adm-badge ${published ? "adm-badge-on" : "adm-badge-off"}`}>
      {published ? "En ligne" : "Masqué"}
    </span>
  );
}
