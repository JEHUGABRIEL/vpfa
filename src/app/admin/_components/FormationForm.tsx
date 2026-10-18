"use client";

import Link from "next/link";
import type { Formation } from "@/db/schema";
import { idleState } from "@/lib/admin/form";
import { useActionForm } from "@/lib/use-action-form";
import type { ImageOption } from "@/lib/admin/images";
import { saveFormation } from "../_actions/formations";
import { FormAlert } from "./Alerts";
import { SubmitButton } from "./buttons";
import { describedBy, Field } from "./Field";
import { ImagePicker } from "./ImagePicker";

export function FormationForm({
  formation,
  imageOptions,
}: {
  formation?: Formation;
  imageOptions: ImageOption[];
}) {
  const { state, onSubmit, pending } = useActionForm(saveFormation, idleState);
  const errors = state.fieldErrors ?? {};

  const input = (
    name: keyof Formation,
    label: string,
    options: { hint?: string; required?: boolean; maxLength?: number; placeholder?: string } = {},
  ) => (
    <Field id={name} label={label} hint={options.hint} error={errors[name]}>
      <input
        id={name}
        name={name}
        className="adm-input"
        defaultValue={formation ? String(formation[name] ?? "") : ""}
        required={options.required}
        maxLength={options.maxLength}
        placeholder={options.placeholder}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={describedBy(name, options.hint, errors[name])}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} className="adm-form">
      {formation ? <input type="hidden" name="id" value={formation.id} /> : null}
      <FormAlert state={state} />

      <div className="adm-form-grid">
        <div>
          <section className="adm-card">
            <h2>Présentation</h2>
            <div className="adm-form">
              {input("title", "Titre", { required: true, maxLength: 160 })}
              <div className="adm-row">
                {input("kicker", "Accroche", { maxLength: 80, placeholder: "Artisanat & autonomie" })}
                {input("badge", "Badge sur la carte", {
                  maxLength: 40,
                  hint: "Laissez vide pour ne pas en afficher.",
                })}
              </div>
              <Field id="description" label="Description" error={errors.description}>
                <textarea
                  id="description"
                  name="description"
                  className="adm-input"
                  maxLength={600}
                  defaultValue={formation?.description}
                />
              </Field>
              <div className="adm-row">
                {input("price", "Tarif", { maxLength: 60, placeholder: "15 000 FCFA" })}
                {input("duration", "Durée", { maxLength: 60, placeholder: "5 jours" })}
              </div>
            </div>
          </section>

          <section className="adm-card">
            <h2>Contenu de la formation</h2>
            <div className="adm-form">
              <Field
                id="program"
                label="Programme"
                hint="Un module par ligne. Les trois premiers s'affichent sur la carte."
              >
                <textarea
                  id="program"
                  name="program"
                  className="adm-input"
                  rows={6}
                  defaultValue={formation?.program.join("\n")}
                  aria-describedby="program-hint"
                />
              </Field>
              <Field id="benefits" label="Bénéfices" hint="Un bénéfice par ligne.">
                <textarea
                  id="benefits"
                  name="benefits"
                  className="adm-input"
                  rows={4}
                  defaultValue={formation?.benefits.join("\n")}
                  aria-describedby="benefits-hint"
                />
              </Field>
              {input("note", "Note", {
                maxLength: 200,
                placeholder: "Places limitées - inscrivez-vous dès maintenant.",
              })}
            </div>
          </section>
        </div>

        <div>
          <section className="adm-card">
            <h2>Publication</h2>
            <div className="adm-form">
              <label className="adm-check">
                <input type="checkbox" name="published" defaultChecked={formation?.published ?? true} />
                <span>
                  En ligne
                  <small>Décochez pour masquer la formation sans la supprimer.</small>
                </span>
              </label>
              <Field id="sortOrder" label="Ordre d'affichage" hint="Les plus petits nombres passent en premier.">
                <input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  min={0}
                  max={999}
                  className="adm-input"
                  defaultValue={formation?.sortOrder ?? 0}
                  aria-describedby="sortOrder-hint"
                />
              </Field>
              {input("slug", "Adresse (slug)", {
                maxLength: 80,
                hint: "Générée depuis le titre si vide.",
              })}
              <div className="adm-form-foot">
                <SubmitButton pending={pending}>{formation ? "Enregistrer" : "Créer la formation"}</SubmitButton>
                <Link href="/admin/formations" className="adm-btn adm-btn-ghost">
                  Annuler
                </Link>
              </div>
            </div>
          </section>

          <section className="adm-card">
            <div className="adm-form">
              <ImagePicker
                name="image"
                defaultValue={formation?.image}
                options={imageOptions}
                error={errors.image}
              />
              {input("imageAlt", "Description de l'image", {
                required: true,
                maxLength: 200,
                hint: "Lue par les lecteurs d'écran et les moteurs de recherche.",
              })}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
