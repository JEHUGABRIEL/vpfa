import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { messages, registrations, type RequestStatus, requestStatus } from "@/db/schema";
import { formatDateTime, statusLabels, statusOrder } from "@/lib/admin/status";
import { deleteRequest, updateRequest } from "../_actions/requests";
import { ConfirmSubmit, SubmitButton } from "./buttons";

type Kind = "inscriptions" | "messages";

type Item = {
  id: number;
  name: string;
  phone: string;
  email: string;
  title: string;
  message: string;
  status: RequestStatus;
  adminNote: string;
  createdAt: Date;
};

async function load(kind: Kind, status: RequestStatus | null): Promise<Item[]> {
  if (kind === "inscriptions") {
    const rows = await db
      .select()
      .from(registrations)
      .where(status ? eq(registrations.status, status) : undefined)
      .orderBy(desc(registrations.createdAt))
      .limit(200);
    return rows.map((row) => ({ ...row, title: row.formation }));
  }
  const rows = await db
    .select()
    .from(messages)
    .where(status ? eq(messages.status, status) : undefined)
    .orderBy(desc(messages.createdAt))
    .limit(200);
  return rows.map((row) => ({ ...row, title: row.subject }));
}

async function loadCounts(kind: Kind) {
  const table = kind === "inscriptions" ? registrations : messages;
  const rows = await db
    .select({ status: table.status, value: count() })
    .from(table)
    .groupBy(table.status);
  return Object.fromEntries(rows.map((row) => [row.status, row.value])) as Partial<
    Record<RequestStatus, number>
  >;
}

function whatsapp(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 8 ? `https://wa.me/${digits}` : null;
}

export async function RequestList({ kind, statut }: { kind: Kind; statut?: string }) {
  const status = (requestStatus.enumValues as readonly string[]).includes(statut ?? "")
    ? (statut as RequestStatus)
    : null;
  const [items, counts] = await Promise.all([load(kind, status), loadCounts(kind)]);
  const total = Object.values(counts).reduce((sum, value) => sum + (value ?? 0), 0);
  const base = `/admin/${kind}`;

  return (
    <>
      <nav className="adm-filters" aria-label="Filtrer par statut">
        <Link href={base} aria-current={status === null ? "page" : undefined}>
          Toutes ({total})
        </Link>
        {statusOrder.map((value) => (
          <Link
            key={value}
            href={`${base}?statut=${value}`}
            aria-current={status === value ? "page" : undefined}
          >
            {statusLabels[value]} ({counts[value] ?? 0})
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <section className="adm-card">
          <p className="adm-empty">
            <strong>Rien à afficher</strong>
            {status ? "Aucune demande avec ce statut." : "Les demandes envoyées depuis le site arriveront ici."}
          </p>
        </section>
      ) : (
        items.map((item) => {
          const wa = whatsapp(item.phone);
          return (
            <section className="adm-card adm-request" key={item.id} id={`demande-${item.id}`}>
              <div className="adm-request-head">
                <div>
                  <h3>{item.name}</h3>
                  <p className="adm-request-meta">
                    <span>{item.title}</span>
                    <span>{formatDateTime(item.createdAt)}</span>
                  </p>
                </div>
                <span className={`adm-badge adm-badge-${item.status}`}>{statusLabels[item.status]}</span>
              </div>

              <div className="adm-request-tools">
                {item.phone ? (
                  <a href={`tel:${item.phone}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                    <Icon name="phone" size={16} />
                    {item.phone}
                  </a>
                ) : null}
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
              </div>

              {item.message ? <p className="adm-request-msg">{item.message}</p> : null}

              <form action={updateRequest} className="adm-request-form">
                <input type="hidden" name="kind" value={kind} />
                <input type="hidden" name="id" value={item.id} />
                <label>
                  <span className="adm-sr">Statut</span>
                  <select name="status" className="adm-input" defaultValue={item.status}>
                    {statusOrder.map((value) => (
                      <option key={value} value={value}>
                        {statusLabels[value]}
                      </option>
                    ))}
                  </select>
                </label>
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
                <SubmitButton className="adm-btn adm-btn-primary" pendingLabel="…">
                  Mettre à jour
                </SubmitButton>
              </form>

              <form action={deleteRequest} className="adm-actions">
                <input type="hidden" name="kind" value={kind} />
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
