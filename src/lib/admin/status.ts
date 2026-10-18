import type { RequestStatus } from "@/db/schema";

export const statusLabels: Record<RequestStatus, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
};

export const statusOrder: RequestStatus[] = ["nouveau", "en_cours", "traite", "archive"];

const dateTime = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Bangui",
});

export function formatDateTime(date: Date) {
  return dateTime.format(date);
}
