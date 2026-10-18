"use client";

import { FormStatus, Honeypot } from "@/components/FormStatus";
import { type FormState, submitTestimonial } from "@/lib/public-actions";
import { useActionForm } from "@/lib/use-action-form";

const initialState: FormState = { status: "idle", message: "" };

export function TestimonialForm() {
  const { state, onSubmit, pending } = useActionForm(submitTestimonial, initialState);
  const done = state.status === "success";

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="form-title">Partager votre expérience</h3>
      <fieldset className="form-fields" disabled={pending || done}>
        <div className="row2">
          <label>
            Prénom et nom *
            <input name="name" required maxLength={80} autoComplete="name" />
          </label>
          <label>
            Vous êtes (facultatif)
            <input name="role" maxLength={120} placeholder="Participante, formation perlage" />
          </label>
        </div>
        <label>
          Votre témoignage *
          <textarea name="message" rows={4} required minLength={20} maxLength={800} />
        </label>
        <label className="form-consent">
          <input type="checkbox" name="consent" required />
          <span>
            J&apos;accepte que mon témoignage soit publié sur ce site avec mon nom.
          </span>
        </label>
        <Honeypot />
        <button type="submit" className="btn btn-brand">
          {pending ? "Envoi…" : done ? "Témoignage envoyé" : "Envoyer mon témoignage"}
        </button>
      </fieldset>
      <FormStatus state={state} />
    </form>
  );
}
