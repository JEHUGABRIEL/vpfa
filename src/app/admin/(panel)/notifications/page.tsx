import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { getFeed } from "@/lib/admin/notifications";
import { formatDateTime } from "@/lib/admin/status";
import { requireAdmin } from "@/lib/auth/session";
import { markNotificationsSeen } from "../../_actions/notifications";
import { SubmitButton } from "../../_components/buttons";

export const metadata: Metadata = { title: "Notifications" };

const kindIcon: Record<string, IconName> = {
  inscription: "briefcase",
  paiement: "check",
  message: "inbox",
  temoignage: "quote",
};

export default async function NotificationsPage() {
  const admin = await requireAdmin();
  const feed = await getFeed(admin.id, 100);

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Notifications</h1>
          <p>
            Nouvelles inscriptions, paiements déclarés, messages et témoignages.{" "}
            {feed.unread > 0 ? `${feed.unread} non lue${feed.unread > 1 ? "s" : ""}.` : "Tout est lu."}
          </p>
        </div>
        {feed.unread > 0 ? (
          <form action={markNotificationsSeen}>
            <SubmitButton className="adm-btn adm-btn-ghost" pendingLabel="…">
              <Icon name="check" size={16} />
              Tout marquer comme lu
            </SubmitButton>
          </form>
        ) : null}
      </div>

      <section className="adm-card">
        {feed.items.length === 0 ? (
          <p className="adm-empty">
            <strong>Aucune notification</strong>
            Vous serez prévenu·e ici dès qu&apos;une demande arrive depuis le site.
          </p>
        ) : (
          <ul className="adm-notif-list">
            {feed.items.map((item) => (
              <li key={item.id} data-unread={item.unread}>
                <span className="adm-bell-icon" aria-hidden="true">
                  <Icon name={kindIcon[item.kind] ?? "bell"} size={16} />
                </span>
                <div>
                  <Link href={item.href || "/admin"} className="adm-row-title">
                    {item.title}
                  </Link>
                  {item.unread ? <span className="adm-sr"> (non lue)</span> : null}
                  {item.body ? <span className="adm-row-sub">{item.body}</span> : null}
                </div>
                <time dateTime={item.createdAt} className="adm-row-sub">
                  {formatDateTime(new Date(item.createdAt))}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
