import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { type PaymentStatus, registrations } from "@/db/schema";
import { formatDateTime } from "@/lib/admin/status";
import { paymentMethodLabels, paymentStatusLabels, paymentStatusOrder } from "@/lib/registration";
import { deleteRequest } from "../_actions/requests";
import { saveRegistrationNote, setPaymentStatus } from "../_actions/registrations";
import { ConfirmSubmit, SubmitButton } from "./buttons";

function whatsapp(phone: string, reference: string | null) {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 8) return null;
  const text = reference ? `?text=${encodeURIComponent(`Bonjour, ONG VPFA au sujet de votre dossier ${reference}.`)}` : "";
  return `https://wa.me/${digits}${text}`;
}

function StatusButton({ id, to, label, icon, primary }: { id: number; to: PaymentStatus; label: string; icon: "check" | "close" | "arrow-right"; primary?: boolean }) {
  return (
    <form action={setPaymentStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="paymentStatus" value={to} />
      <SubmitButton className={`adm-btn adm-btn-sm ${primary ? "adm-btn-primary" : "adm-btn-ghost"}`} pendingLabel="…">
        <Icon name={icon} size={16} />
        {label}
      </SubmitButton>
    </form>
  );
}

export async function RegistrationList({ statut }: { statut?: string }) {
  const filter = (paymentStatusOrder as string[]).includes(statut ?? "") ? (statut as PaymentStatus) : null;
  const [items, counts] = await Promise.all([
    db
      .select()
      .from(registrations)
      .where(filter ? eq(registrations.paymentStatus, filter) : undefined)
      .orderBy(desc(registrations.createdAt))
      .limit(200),
    db
      .select({ status: registrations.paymentStatus, value: count() })
      .from(registrations)
      .groupBy(registrations.paymentStatus),
  ]);
  const byStatus = Object.fromEntries(counts.map((row) => [row.status, row.value])) as Partial<Record<PaymentStatus, number>>;
  const total = counts.reduce((sum, row) => sum + row.value, 0);

  return (
    <>
      <nav className="adm-filters" aria-label="Filtrer par paiement">
        <Link href="/admin/inscriptions" aria-current={filter === null ? "page" : undefined}>
          Toutes ({total})
        </Link>
        {paymentStatusOrder.map((value) => (
          <Link
            key={value}
            href={`/admin/inscriptions?statut=${value}`}
            aria-current={filter === value ? "page" : undefined}
          >
            {paymentStatusLabels[value]} ({byStatus[value] ?? 0})
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <section className="adm-card">
          <p className="adm-empty">
            <strong>Rien à afficher</strong>
            {filter ? "Aucune inscription avec ce statut." : "Les demandes envoyées depuis la page Formations arriveront ici."}
          </p>
        </section>
      ) : (
        items.map((item) => {
          const wa = whatsapp(item.phone, item.reference);
          return (
            <section className="adm-card adm-request" key={item.id} id={`dossier-${item.id}`}>
              <div className="adm-request-head">
                <div>
                  <h3>
                    {item.name}
                    {item.reference ? <span className="adm-ref">{item.reference}</span> : null}
                  </h3>
                  <p className="adm-request-meta">
                    <span>{item.formation}</span>
                    {item.amount ? <span>{item.amount}</span> : null}
                    <span>{paymentMethodLabels[item.paymentMethod]}</span>
                    <span>{formatDateTime(item.createdAt)}</span>
                  </p>
                </div>
                <span className={`adm-badge adm-pay-${item.paymentStatus}`}>
                  {paymentStatusLabels[item.paymentStatus]}
                </span>
              </div>

              {item.paymentStatus === "declare" || item.transactionId ? (
                <dl className="adm-payment">
                  <div>
                    <dt>ID de transaction déclaré</dt>
                    <dd>{item.transactionId || "-"}</dd>
                  </div>
                  <div>
                    <dt>Numéro payeur</dt>
                    <dd>{item.payerPhone || "-"}</dd>
                  </div>
                  <div>
                    <dt>Déclaré le</dt>
                    <dd>{item.paymentDeclaredAt ? formatDateTime(item.paymentDeclaredAt) : "-"}</dd>
                  </div>
                </dl>
              ) : null}
              {item.paymentStatus === "declare" ? (
                <p className="adm-hint">
                  Vérifiez cet identifiant et le montant sur le relevé Orange Money avant de confirmer.
                </p>
              ) : null}

              <div className="adm-request-tools">
                <a href={`tel:${item.phone}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                  <Icon name="phone" size={16} />
                  {item.phone}
                </a>
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost adm-btn-sm">
                    <Icon name="whatsapp" size={16} />
                    WhatsApp
                  </a>
                ) : null}
                {item.email ? (
                  <a href={`mailto:${item.email}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                    <Icon name="mail" size={16} />
                    {item.email}
                  </a>
                ) : null}
                {item.token ? (
                  <a href={`/inscription/${item.token}`} target="_blank" className="adm-btn adm-btn-ghost adm-btn-sm">
                    <Icon name="external" size={16} />
                    Page de suivi
                  </a>
                ) : null}
              </div>

              {item.message ? <p className="adm-request-msg">{item.message}</p> : null}

              <div className="adm-actions" style={{ justifyContent: "flex-start" }}>
                {item.paymentStatus !== "confirme" && item.paymentStatus !== "annule" ? (
                  <StatusButton id={item.id} to="confirme" label="Confirmer le paiement" icon="check" primary />
                ) : null}
                {item.paymentStatus === "confirme" || item.paymentStatus === "annule" || item.paymentStatus === "declare" ? (
                  <StatusButton id={item.id} to="en_attente" label="Remettre en attente" icon="arrow-right" />
                ) : null}
                {item.paymentStatus !== "annule" ? (
                  <StatusButton id={item.id} to="annule" label="Annuler" icon="close" />
                ) : null}
              </div>

              <form action={saveRegistrationNote} className="adm-request-form adm-note-form">
                <input type="hidden" name="id" value={item.id} />
                <label>
                  <span className="adm-sr">Note interne</span>
                  <textarea
                    name="adminNote"
                    className="adm-input"
                    rows={1}
                    maxLength={2000}
                    placeholder="Note interne (visible seulement par l'équipe)"
                    defaultValue={item.adminNote}
                  />
                </label>
                <SubmitButton className="adm-btn adm-btn-ghost" pendingLabel="…">
                  Enregistrer la note
                </SubmitButton>
              </form>

              <form action={deleteRequest} className="adm-actions">
                <input type="hidden" name="kind" value="inscriptions" />
                <input type="hidden" name="id" value={item.id} />
                <ConfirmSubmit confirmLabel="Supprimer définitivement ?">
                  <Icon name="trash" size={16} />
                  Supprimer
                </ConfirmSubmit>
              </form>
            </section>
          );
        })
      )}
    </>
  );
}
