import type { FormState } from "@/lib/public-actions";

export function FormStatus({ state }: { state: FormState }) {
  if (state.status === "idle") return null;
  return (
    <p className={state.status === "success" ? "ok" : "err"} role="status" aria-live="polite">
      {state.message}{" "}
      {state.whatsappUrl ? (
        <a href={state.whatsappUrl} target="_blank" rel="noopener noreferrer">
          {state.status === "success" ? "Prévenir l'équipe sur WhatsApp" : "Écrire sur WhatsApp"}
        </a>
      ) : null}
    </p>
  );
}

/** Off-screen field that only bots fill in. */
export function Honeypot() {
  return (
    <label className="hp" aria-hidden="true">
      Site web
      <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </label>
  );
}
