"use client";

import { type ReactNode, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Icon, type IconName } from "@/components/Icon";

type Tone = "danger" | "primary" | "neutral";

const toneIcon: Record<Tone, IconName> = {
  danger: "trash",
  primary: "check",
  neutral: "logout",
};

function ConfirmButton({ label, tone }: { label: string; tone: Tone }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`adm-btn ${tone === "danger" ? "adm-btn-danger-solid" : "adm-btn-primary"}`}
      disabled={pending}
    >
      {pending ? "Un instant…" : label}
    </button>
  );
}

/**
 * Button that opens a modal confirmation before running a server action.
 * Built on <dialog>: focus is trapped, Escape and the backdrop close it.
 */
export function ConfirmDialog({
  action,
  fields = {},
  title,
  description,
  confirmLabel,
  tone = "danger",
  trigger,
  triggerClassName = "adm-btn adm-btn-danger adm-btn-sm",
  triggerLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields?: Record<string, string | number>;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  tone?: Tone;
  trigger: ReactNode;
  triggerClassName?: string;
  /** Accessible name when the trigger only shows an icon. */
  triggerLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const textId = useId();

  async function run(formData: FormData) {
    await action(formData);
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        className="adm-dialog"
        aria-labelledby={titleId}
        aria-describedby={textId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <form action={run} className="adm-dialog-body">
          {Object.entries(fields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <span className={`adm-dialog-icon adm-dialog-icon-${tone}`} aria-hidden="true">
            <Icon name={toneIcon[tone]} size={20} />
          </span>
          <h2 id={titleId}>{title}</h2>
          <div id={textId} className="adm-dialog-text">
            {description}
          </div>
          <div className="adm-dialog-actions">
            <button
              type="button"
              className="adm-btn adm-btn-ghost"
              onClick={() => dialogRef.current?.close()}
              autoFocus
            >
              Annuler
            </button>
            <ConfirmButton label={confirmLabel} tone={tone} />
          </div>
        </form>
      </dialog>
    </>
  );
}
