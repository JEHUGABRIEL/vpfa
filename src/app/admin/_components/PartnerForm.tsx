"use client";

import Link from "next/link";
import type { Partner } from "@/db/schema";
import { idleState } from "@/lib/admin/form";
import { useActionForm } from "@/lib/use-action-form";
import { savePartner } from "../_actions/partners";
import { FormAlert } from "./Alerts";
import { SubmitButton } from "./buttons";
import { describedBy, Field } from "./Field";

export function PartnerForm({ partner }: { partner?: Partner }) {
  const { state, onSubmit, pending } = useActionForm(savePartner, idleState);
  const errors = state.fieldErrors ?? {};

  return (
    <form onSubmit={onSubmit} className="adm-form">
      {partner ? <input type="hidden" name="id" value={partner.id} /> : null}
      <FormAlert state={state} />
      <Field id="name" label="Nom complet" error={errors.name}>
        <input
          id="name"
          name="name"
          className="adm-input"
          required
          maxLength={200}
          defaultValue={partner?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name", false, errors.name)}
        />
      </Field>
      <div className="adm-row">
        <Field id="short" label="Sigle" hint="Ex. ONU Femmes">
          <input id="short" name="short" className="adm-input" maxLength={40} defaultValue={partner?.short} />
        </Field>
        <Field id="type" label="Type" hint="Ex. Institution internationale">
          <input id="type" name="type" className="adm-input" maxLength={80} defaultValue={partner?.type} />
        </Field>
      </div>
      <Field id="website" label="Site web" error={errors.website}>
        <input
          id="website"
          name="website"
          type="url"
          className="adm-input"
          placeholder="https://"
          defaultValue={partner?.website}
          aria-invalid={errors.website ? true : undefined}
          aria-describedby={describedBy("website", false, errors.website)}
        />
      </Field>
      <Field id="sortOrder" label="Ordre d'affichage">
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min={0}
          max={999}
          className="adm-input"
          defaultValue={partner?.sortOrder ?? 0}
        />
      </Field>
      <label className="adm-check">
        <input type="checkbox" name="featured" defaultChecked={partner?.featured ?? false} />
        <span>
          Partenaire principal
          <small>Institutions et bailleurs mis en avant.</small>
        </span>
      </label>
      <label className="adm-check">
        <input type="checkbox" name="published" defaultChecked={partner?.published ?? true} />
        <span>Affiché sur le site</span>
      </label>
      <div className="adm-form-foot">
        <SubmitButton pending={pending}>{partner ? "Enregistrer" : "Ajouter le partenaire"}</SubmitButton>
        {partner ? (
          <Link href="/admin/partenaires" className="adm-btn adm-btn-ghost">
            Annuler
          </Link>
        ) : null}
      </div>
    </form>
  );
}
