import { count, eq, or } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { messages, registrations, testimonials } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { logout } from "../_actions/auth";
import { AdminNav } from "../_components/AdminNav";
import { AdminShell } from "../_components/AdminShell";
import { ConfirmDialog } from "../_components/ConfirmDialog";
import { NotificationBell } from "../_components/NotificationBell";
import { getFeed } from "@/lib/admin/notifications";

function LogoutButton({ className }: { className: string }) {
  return (
    <ConfirmDialog
      action={logout}
      tone="neutral"
      title="Se déconnecter ?"
      description="Vous devrez saisir à nouveau votre e-mail et votre mot de passe pour revenir au back-office."
      confirmLabel="Se déconnecter"
      triggerClassName={className}
      trigger={
        <>
          <Icon name="logout" size={16} />
          Déconnexion
        </>
      }
    />
  );
}

async function NavWithCounts() {
  const admin = await requireAdmin();
  const [[newRegistrations], [newMessages], [pendingTestimonials], feed] = await Promise.all([
    // New files and declared payments both need someone from the team.
    db
      .select({ value: count() })
      .from(registrations)
      .where(or(eq(registrations.status, "nouveau"), eq(registrations.paymentStatus, "declare"))),
    db.select({ value: count() }).from(messages).where(eq(messages.status, "nouveau")),
    db.select({ value: count() }).from(testimonials).where(eq(testimonials.approved, false)),
    getFeed(admin.id, 0),
  ]);
  return (
    <AdminNav
      counts={{
        inscriptions: newRegistrations.value,
        messages: newMessages.value,
        temoignages: pendingTestimonials.value,
        notifications: feed.unread,
      }}
    />
  );
}

async function CurrentAdmin() {
  const admin = await requireAdmin();
  const feed = await getFeed(admin.id);
  const initials = admin.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="adm-user">
      <NotificationBell initial={feed} />
      <span className="adm-avatar" aria-hidden="true">
        {initials}
      </span>
      <span className="adm-user-name">
        <strong>{admin.name}</strong>
        <small>{admin.email}</small>
      </span>
      <LogoutButton className="adm-btn adm-btn-ghost adm-btn-sm" />
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell
      side={
        <>
          <Link href="/admin" className="adm-brand">
            <Image src="/images/logo.jpg" alt="" width={40} height={40} />
            <span>
              <strong>VPFA</strong>
              <small>Back-office</small>
            </span>
          </Link>
          <Suspense fallback={<div className="adm-nav" />}>
            <NavWithCounts />
          </Suspense>
          <div className="adm-side-foot">
            <LogoutButton className="adm-side-logout" />
          </div>
        </>
      }
      user={
        <Suspense fallback={<div className="adm-user" />}>
          <CurrentAdmin />
        </Suspense>
      }
    >
      {children}
    </AdminShell>
  );
}
