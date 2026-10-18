"use client";

import { FormStatus } from "@/components/FormStatus";
import { declarePayment, type FormState } from "@/lib/public-actions";
import { useActionForm } from "@/lib/use-action-form";

const initialState: FormState = { status: "idle", message: "" };

export function DeclarePaymentForm({
  token,
  transactionId,
  payerPhone,
}: {
  token: string;
  transactionId: string;
  payerPhone: string;
}) {
  const { state, onSubmit, pending } = useActionForm(declarePayment, initialState);

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="token" value={token} />
      <h3 className="form-title">J&apos;ai payé</h3>
      <p className="note">
        Recopiez l&apos;identifiant de transaction indiqué dans le SMS de
        confirmation envoyé par Orange Money après votre transfert.
      </p>
      <label>
          Identifiant de transaction *
          <input
            name="transactionId"
            required
            minLength={4}
            maxLength={60}
            autoComplete="off"
            defaultValue={transactionId}
            placeholder="Identifiant reçu par SMS"
          />
        </label>
        <label>
          Numéro qui a payé *
          <input
            name="payerPhone"
            type="tel"
            required
            maxLength={40}
            autoComplete="tel"
            defaultValue={payerPhone}
            placeholder="+236 ..."
          />
        </label>
      <button type="submit" className="btn btn-brand" disabled={pending}>
        {pending ? "Envoi…" : transactionId ? "Corriger ma déclaration" : "Déclarer mon paiement"}
      </button>
      <FormStatus state={state} />
    </form>
  );
}
