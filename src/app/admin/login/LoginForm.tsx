"use client";

import { idleState } from "@/lib/admin/form";
import { useActionForm } from "@/lib/use-action-form";
import { login } from "../_actions/auth";
import { FormAlert } from "../_components/Alerts";
import { SubmitButton } from "../_components/buttons";

export function LoginForm() {
  const { state, onSubmit, pending } = useActionForm(login, idleState);

  return (
    <form onSubmit={onSubmit} className="adm-form">
      <FormAlert state={state} />
      <div className="adm-field">
        <span>
          <label htmlFor="email">E-mail</label>
        </span>
        <input
          id="email"
          name="email"
          type="email"
          className="adm-input"
          autoComplete="username"
          required
          autoFocus
        />
      </div>
      <div className="adm-field">
        <span className="adm-login-row">
          <label htmlFor="password">Mot de passe</label>
        </span>
        <input
          id="password"
          name="password"
          type="password"
          className="adm-input"
          autoComplete="current-password"
          required
        />
      </div>
      <details>
        <summary>Mot de passe oublié ?</summary>
        <p>
          Demandez à un autre administrateur de vous recréer un accès depuis
          Réglages &gt; Comptes, ou contactez la personne en charge du site.
        </p>
      </details>
      <SubmitButton pending={pending} pendingLabel="Connexion…">Se connecter</SubmitButton>
    </form>
  );
}
