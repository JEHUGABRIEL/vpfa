"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

export function AdminShell({
  side,
  user,
  children,
}: {
  side: ReactNode;
  user: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="adm" data-menu={open ? "open" : "closed"}>
      <aside
        className="adm-side"
        id="adm-menu"
        aria-label="Menu du back-office"
        // Close the mobile menu once a link is followed.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {side}
      </aside>
      <div className="adm-main" onClick={open ? () => setOpen(false) : undefined}>
        <header className="adm-top">
          <button
            type="button"
            className="adm-btn adm-btn-ghost adm-menu-btn"
            aria-expanded={open}
            aria-controls="adm-menu"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
            <span className="adm-sr">Menu</span>
          </button>
          {user}
        </header>
        <main className="adm-content" id="contenu">
          {children}
        </main>
      </div>
    </div>
  );
}
