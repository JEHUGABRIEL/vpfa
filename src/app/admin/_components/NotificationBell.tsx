"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Icon, type IconName } from "@/components/Icon";
import type { FeedItem } from "@/lib/admin/notifications";
import { markNotificationsSeen } from "../_actions/notifications";

type Feed = { unread: number; items: FeedItem[] };

const POLL_MS = 60_000;

const kindIcon: Record<string, IconName> = {
  inscription: "briefcase",
  paiement: "check",
  message: "inbox",
  temoignage: "quote",
};

const time = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Bangui",
});

export function NotificationBell({ initial }: { initial: Feed }) {
  const [feed, setFeed] = useState(initial);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  const reload = useCallback(async () => {
    try {
      const response = await fetch("/admin/api/notifications", { cache: "no-store" });
      if (response.ok) setFeed(await response.json());
    } catch {
      // Offline or session expired: keep the last known state.
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(reload, POLL_MS);
    const onFocus = () => reload();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
    };
  }, [reload]);

  // Unread count in the tab title, so it is visible from another tab.
  useEffect(() => {
    const base = document.title.replace(/^\(\d+\) /, "");
    document.title = feed.unread > 0 ? `(${feed.unread}) ${base}` : base;
  }, [feed.unread]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markAllRead() {
    startTransition(async () => {
      await markNotificationsSeen();
      await reload();
    });
  }

  return (
    <div className="adm-bell" ref={rootRef}>
      <button
        type="button"
        className="adm-btn adm-btn-ghost adm-bell-btn"
        aria-expanded={open}
        aria-controls="adm-bell-panel"
        onClick={() => {
          setOpen((value) => !value);
          if (!open) reload();
        }}
      >
        <Icon name="bell" size={20} />
        <span className="adm-sr">Notifications</span>
        {feed.unread > 0 ? (
          <span className="adm-bell-count">
            {feed.unread > 99 ? "99+" : feed.unread}
            <span className="adm-sr"> non lues</span>
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="adm-bell-panel" id="adm-bell-panel" role="region" aria-label="Notifications">
          <div className="adm-bell-head">
            <strong>Notifications</strong>
            {feed.unread > 0 ? (
              <button type="button" className="adm-link-btn" onClick={markAllRead} disabled={pending}>
                {pending ? "…" : "Tout marquer comme lu"}
              </button>
            ) : null}
          </div>
          {feed.items.length === 0 ? (
            <p className="adm-bell-empty">Aucune notification pour l&apos;instant.</p>
          ) : (
            <ul className="adm-bell-list">
              {feed.items.map((item) => (
                <li key={item.id} data-unread={item.unread}>
                  <Link href={item.href || "/admin/notifications"} onClick={() => setOpen(false)}>
                    <span className="adm-bell-icon" aria-hidden="true">
                      <Icon name={kindIcon[item.kind] ?? "bell"} size={16} />
                    </span>
                    <span className="adm-bell-text">
                      <strong>{item.title}</strong>
                      {item.body ? <span>{item.body}</span> : null}
                      <time dateTime={item.createdAt}>{time.format(new Date(item.createdAt))}</time>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/notifications" className="adm-bell-all" onClick={() => setOpen(false)}>
            Voir toutes les notifications
          </Link>
        </div>
      ) : null}
    </div>
  );
}
