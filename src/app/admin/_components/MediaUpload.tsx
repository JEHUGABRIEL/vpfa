"use client";

import { useRef, useState, useTransition } from "react";
import { Icon } from "@/components/Icon";
import { uploadMedia } from "../_actions/media";

export function MediaUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="adm-upload"
      onSubmit={(event) => {
        event.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) return setMessage({ ok: false, text: "Choisissez d'abord un fichier." });
        const data = new FormData();
        data.set("file", file);
        startTransition(async () => {
          const result = await uploadMedia(data);
          setMessage(
            result.ok
              ? { ok: true, text: `${result.label} ajoutée à la médiathèque.` }
              : { ok: false, text: result.message },
          );
          if (result.ok && fileRef.current) fileRef.current.value = "";
        });
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label="Image à téléverser"
      />
      <button type="submit" className="adm-btn adm-btn-primary" disabled={pending}>
        <Icon name="plus" size={16} />
        {pending ? "Envoi…" : "Téléverser"}
      </button>
      {message ? (
        <span className={message.ok ? "adm-hint" : "adm-error"} role="status">
          {message.text}
        </span>
      ) : null}
    </form>
  );
}
