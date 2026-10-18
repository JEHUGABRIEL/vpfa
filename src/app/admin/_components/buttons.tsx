"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingLabel = "Enregistrement…",
  className = "adm-btn adm-btn-primary",
  pending: pendingProp,
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
  /** For forms submitted through onSubmit, where useFormStatus can't see the request. */
  pending?: boolean;
}) {
  const status = useFormStatus();
  const pending = pendingProp ?? status.pending;
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
