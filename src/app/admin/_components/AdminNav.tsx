"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";

type Counts = { inscriptions: number; messages: number; temoignages: number };

const groups: { label: string; items: { href: string; label: string; icon: IconName; count?: keyof Counts }[] }[] = [
  {
    label: "Pilotage",
    items: [{ href: "/admin", label: "Tableau de bord", icon: "dashboard" }],
  },
  {
    label: "Contenus",
    items: [
      { href: "/admin/formations", label: "Formations", icon: "book" },
      { href: "/admin/actualites", label: "Actualités", icon: "newspaper" },
      { href: "/admin/partenaires", label: "Partenaires", icon: "users" },
      { href: "/admin/medias", label: "Médiathèque", icon: "image" },
    ],
  },
  {
    label: "Demandes",
    items: [
      { href: "/admin/inscriptions", label: "Inscriptions", icon: "briefcase", count: "inscriptions" },
      { href: "/admin/messages", label: "Messages", icon: "inbox", count: "messages" },
      { href: "/admin/temoignages", label: "Témoignages", icon: "quote", count: "temoignages" },
    ],
  },
  {
    label: "Réglages",
    items: [{ href: "/admin/comptes", label: "Comptes", icon: "key" }],
  },
];

export function AdminNav({ counts }: { counts?: Counts }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="adm-nav" aria-label="Sections">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="adm-nav-label">{group.label}</p>
          {group.items.map((item) => {
            const count = item.count && counts ? counts[item.count] : 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
                {count > 0 ? (
                  <span className="adm-count">
                    {count}
                    <span className="adm-sr"> nouveau{count > 1 ? "x" : ""}</span>
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
