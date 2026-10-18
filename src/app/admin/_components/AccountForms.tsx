"use client";

import { idleState } from "@/lib/admin/form";
import { useActionForm } from "@/lib/use-action-form";
import { changePassword, createAdmin } from "../_actions/accounts";
import { FormAlert } from "./Alerts";
import { SubmitButton } from "./buttons";
import { describedBy, Field } from "./Field";

export function CreateAdminForm() {
  const { state, onSubmit, pending } = useActionForm(createAdmin, idleState);
  const errors = state.fieldErrors ?? {};
  return (
    <form onSubmit={onSubmit} className="adm-form" key={state.status === "success" ? state.message : "form"}>
      <FormAlert state={state} />
      <Field id="new-name" label="Nom" error={errors.name}>
        <input id="new-name" name="name" className="adm-input" required maxLength={120} />
      </Field>
      <Field id="new-email" label="E-mail" error={errors.email}>
        <input
          id="new-email"
          name="email"
          type="email"
          className="adm-input"
          required
          autoComplete="off"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("new-email", false, errors.email)}
        />
      </Field>
      <Field
        id="new-password"
        label="Mot de passe provisoire"
        hint="10 caractères minimum. Transmettez-le de vive voix ; la personne le changera ensuite."
        error={errors.password}
      >
        <input
          id="new-password"
          name="password"
          type="password"
          className="adm-input"
          required
          minLength={10}
          autoComplete="new-password"
          aria-describedby={describedBy("new-password", true, errors.password)}
        />
      </Field>
      <div className="adm-form-foot">
        <SubmitButton pending={pending}>Créer le compte</SubmitButton>
      </div>
    </form>
  );
}

export function ChangePasswordForm() {
  const { state, onSubmit, pending } = useActionForm(changePassword, idleState);
  const errors = state.fieldErrors ?? {};
  return (
    <form onSubmit={onSubmit} className="adm-form" key={state.status === "success" ? "done" : "form"}>
      <FormAlert state={state} />
      <Field id="current" label="Mot de passe actuel" error={errors.current}>
        <input id="current" name="current" type="password" className="adm-input" required autoComplete="current-password" />
      </Field>
      <Field id="next" label="Nouveau mot de passe" hint="10 caractères minimum." error={errors.next}>
        <input
          id="next"
          name="next"
          type="password"
          className="adm-input"
          required
          minLength={10}
          autoComplete="new-password"
          aria-describedby={describedBy("next", true, errors.next)}
        />
      </Field>
      <Field id="confirm" label="Confirmer" error={errors.confirm}>
        <input id="confirm" name="confirm" type="password" className="adm-input" required autoComplete="new-password" />
      </Field>
      <div className="adm-form-foot">
        <SubmitButton pending={pending}>Changer le mot de passe</SubmitButton>
      </div>
    </form>
  );
}
