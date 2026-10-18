import type { ReactNode } from "react";

/** Label + control + hint + error, wired with aria attributes by the caller's id. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="adm-field">
      <span>
        <label htmlFor={id}>{label}</label>
      </span>
      {children}
      {hint ? (
        <span className="adm-hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="adm-error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, hint?: string | boolean, error?: string) {
  return [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
}
