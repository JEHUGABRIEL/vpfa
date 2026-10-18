import { count, desc, sql } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { formations, media, messages, partners, posts, registrations } from "@/db/schema";
import { formatDateTime, statusLabels } from "@/lib/admin/status";
import { paymentStatusLabels } from "@/lib/registration";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Tableau de bord" };

function countWithPublished(table: typeof formations | typeof posts | typeof partners) {
  return db
    .select({
      total: count(),
      published: sql<number>`count(*) filter (where ${table.published})`.mapWith(Number),
    })
    .from(table);
}

function countRegistrations() {
  return db
    .select({
      total: count(),
      declared: sql<number>`count(*) filter (where ${registrations.paymentStatus} = 'declare')`.mapWith(Number),
      confirmed: sql<number>`count(*) filter (where ${registrations.paymentStatus} = 'confirme')`.mapWith(Number),
    })
    .from(registrations);
}

function countWithNew(table: typeof messages) {
  return db
    .select({
      total: count(),
      fresh: sql<number>`count(*) filter (where ${table.status} = 'nouveau')`.mapWith(Number),
    })
    .from(table);
}

export default async function DashboardPage() {
  const admin = await requireAdmin();

  const [
    [formationStats],
    [postStats],
    [partnerStats],
    [registrationStats],
    [messageStats],
    [mediaStats],
    latestRegistrations,
    latestMessages,
  ] = await Promise.all([
    countWithPublished(formations),
    countWithPublished(posts),
    countWithPublished(partners),
    countRegistrations(),
    countWithNew(messages),
    db.select({ total: count() }).from(media),
    db.select().from(registrations).orderBy(desc(registrations.createdAt)).limit(5),
    db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5),
  ]);

  const stats = [
    {
      href: "/admin/inscriptions?statut=declare",
      label: "Paiements à vérifier",
      value: registrationStats.declared,
      detail: `${registrationStats.confirmed} place(s) confirmée(s) sur ${registrationStats.total}`,
    },
    {
      href: "/admin/messages?statut=nouveau",
      label: "Nouveaux messages",
      value: messageStats.fresh,
      detail: `${messageStats.total} au total`,
    },
    {
      href: "/admin/formations",
      label: "Formations en ligne",
      value: formationStats.published,
      detail: `${formationStats.total} au total`,
    },
    {
      href: "/admin/actualites",
      label: "Actualités en ligne",
      value: postStats.published,
      detail: `${postStats.total} au total`,
    },
    {
      href: "/admin/partenaires",
      label: "Partenaires affichés",
      value: partnerStats.published,
      detail: `${partnerStats.total} au total`,
    },
    {
      href: "/admin/medias",
      label: "Images téléversées",
      value: mediaStats.total,
      detail: "dans la médiathèque",
    },
  ];

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Bonjour {admin.name.split(" ")[0]}</h1>
          <p>Voici l&apos;état du site et des demandes reçues.</p>
        </div>
        <div className="adm-form-foot">
          <Link href="/admin/actualites/nouveau" className="adm-btn adm-btn-ghost">
            <Icon name="plus" size={16} />
            Nouvel article
          </Link>
          <Link href="/admin/formations/nouveau" className="adm-btn adm-btn-primary">
            <Icon name="plus" size={16} />
            Nouvelle formation
          </Link>
        </div>
      </div>

      <div className="adm-stats">
        {stats.map((stat) => (
          <Link href={stat.href} className="adm-stat" key={stat.label}>
            <span className="adm-stat-label">{stat.label}</span>
            <span className="adm-stat-value">{stat.value}</span>
            <span className="adm-stat-detail">{stat.detail}</span>
          </Link>
        ))}
      </div>

      <div className="adm-grid-2">
        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Dernières inscriptions</h2>
            <Link href="/admin/inscriptions">Tout voir</Link>
          </div>
          {latestRegistrations.length === 0 ? (
            <p className="adm-empty">
              <strong>Aucune inscription pour l&apos;instant</strong>
              Les demandes envoyées depuis la page Formations arriveront ici.
            </p>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th scope="col">Personne</th>
                    <th scope="col">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {latestRegistrations.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="adm-row-title">{item.name}</span>
                        <span className="adm-row-sub">
                          {item.reference ? `${item.reference} · ` : ""}
                          {item.formation} · {formatDateTime(item.createdAt)}
                        </span>
                      </td>
                      <td>
                        <span className={`adm-badge adm-pay-${item.paymentStatus}`}>
                          {paymentStatusLabels[item.paymentStatus]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Derniers messages</h2>
            <Link href="/admin/messages">Tout voir</Link>
          </div>
          {latestMessages.length === 0 ? (
            <p className="adm-empty">
              <strong>Aucun message pour l&apos;instant</strong>
              Les messages du formulaire de contact arriveront ici.
            </p>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th scope="col">Expéditeur</th>
                    <th scope="col">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {latestMessages.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="adm-row-title">{item.name}</span>
                        <span className="adm-row-sub">
                          {item.subject} · {formatDateTime(item.createdAt)}
                        </span>
                      </td>
                      <td>
                        <span className={`adm-badge adm-badge-${item.status}`}>
                          {statusLabels[item.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
