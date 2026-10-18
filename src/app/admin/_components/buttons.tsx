"use client";

import { type ReactNode, useEffect, useState } from "react";
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

/** Destructive submit that needs a second click within 4 seconds. */
export function ConfirmSubmit({
  children,
  confirmLabel = "Confirmer ?",
  className = "adm-btn adm-btn-danger adm-btn-sm",
}: {
  children: ReactNode;
  confirmLabel?: string;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => setArmed(false), 4000);
    return () => window.clearTimeout(timer);
  }, [armed]);

  return (
    <button
      type="submit"
      className={className}
      data-armed={armed}
      disabled={pending}
      aria-live="polite"
      onClick={(event) => {
        if (!armed) {
          event.preventDefault();
          setArmed(true);
        }
      }}
    >
      {armed ? confirmLabel : children}
    </button>
  );
}
