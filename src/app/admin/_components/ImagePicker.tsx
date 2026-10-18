"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Icon } from "@/components/Icon";
import type { ImageOption } from "@/lib/admin/images";
import { uploadMedia } from "../_actions/media";

export function ImagePicker({
  name,
  defaultValue,
  options,
  error,
  label = "Image",
  allowEmpty = false,
}: {
  name: string;
  defaultValue?: string;
  options: ImageOption[];
  error?: string;
  label?: string;
  /** Shows a button to remove the image (optional fields such as a partner logo). */
  allowEmpty?: boolean;
}) {
  const [items, setItems] = useState(options);
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [uploadError, setUploadError] = useState("");
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setUploadError("Choisissez d'abord un fichier.");
      return;
    }
    const data = new FormData();
    data.set("file", file);
    setUploadError("");
    startTransition(async () => {
      const result = await uploadMedia(data);
      if (!result.ok) {
        setUploadError(result.message);
        return;
      }
      setItems((current) => [{ src: result.src, label: result.label }, ...current]);
      setSelected(result.src);
      if (fileRef.current) fileRef.current.value = "";
    });
  }

  return (
    <div className="adm-field">
      <span>{label}</span>
      <input type="hidden" name={name} value={selected} />
      <div className="adm-picker-preview">
        {selected ? (
          <Image src={selected} alt="" fill sizes="320px" />
        ) : (
          <span className="adm-empty">Aucune image</span>
        )}
      </div>
      <div className="adm-picker-grid" role="group" aria-label="Choisir une image">
        {items.map((item) => (
          <button
            type="button"
            key={item.src}
            aria-pressed={item.src === selected}
            title={item.label}
            onClick={() => setSelected(item.src)}
          >
            <Image src={item.src} alt={item.label} width={96} height={96} />
          </button>
        ))}
      </div>
      <div className="adm-upload">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-label="Fichier image à téléverser"
        />
        <button
          type="button"
          className="adm-btn adm-btn-ghost adm-btn-sm"
          onClick={upload}
          disabled={pending}
        >
          <Icon name="plus" size={16} />
          {pending ? "Envoi…" : "Téléverser"}
        </button>
        {allowEmpty && selected ? (
          <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setSelected("")}>
            Retirer
          </button>
        ) : null}
      </div>
      <span className="adm-hint">JPEG, PNG ou WebP, 3 Mo maximum. Format paysage conseillé.</span>
      {uploadError || error ? <span className="adm-error">{uploadError || error}</span> : null}
    </div>
  );
}
