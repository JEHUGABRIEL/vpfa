"use client";

import Link from "next/link";
import { FormStatus, Honeypot } from "@/components/FormStatus";
import { Icon } from "@/components/Icon";
import { type FormState, submitMessage } from "@/lib/public-actions";
import { useActionForm } from "@/lib/use-action-form";

const subjects = [
  "Demande d'information",
  "Inscription à une formation",
  "Proposition de partenariat",
  "Bénévolat",
  "Presse & communication",
  "Autre demande",
];

const initialState: FormState = { status: "idle", message: "" };

export function ContactForm() {
  const { state, onSubmit, pending } = useActionForm(submitMessage, initialState);
  const done = state.status === "success";

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="form-title">
        Écrivez-nous <span className="lt">directement</span>
      </h3>
      <p className="note">
        Les champs marqués d&apos;un astérisque (*) sont obligatoires.
      </p>
      <fieldset className="form-fields" disabled={pending || done}>
        <div className="row2">
          <label>
            Nom complet *
            <input name="name" type="text" placeholder="Votre nom" autoComplete="name" maxLength={120} required />
          </label>
          <label>
            Adresse e-mail *
            <input name="email" type="email" placeholder="vous@exemple.com" autoComplete="email" maxLength={200} required />
          </label>
        </div>
        <div className="row2">
          <label>
            Téléphone
            <input name="phone" type="tel" placeholder="+236 ..." autoComplete="tel" maxLength={40} />
          </label>
          <label>
            Votre demande
            <select name="subject" defaultValue={subjects[0]}>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Votre message *
          <textarea
            name="message"
            rows={5}
            placeholder="Décrivez votre demande en quelques lignes…"
            maxLength={4000}
            required
          />
        </label>
        <Honeypot />
        <button type="submit" className="btn btn-brand">
          {pending ? "Envoi en cours…" : done ? "Message envoyé" : "Envoyer le message"}
          <Icon name={done ? "check" : "arrow-right"} size={20} />
        </button>
      </fieldset>
      <p className="note form-privacy">
        Vos informations servent uniquement à traiter votre demande.{" "}
        <Link href="/mentions-legales#confidentialite">En savoir plus</Link>
      </p>
      <FormStatus state={state} />
    </form>
  );
}
