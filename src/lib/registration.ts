import type { PaymentMethod, PaymentStatus } from "@/db/schema";

/** Select value for "tell me about the next sessions". */
export const NEXT_SESSIONS = "prochaines-sessions";

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  orange_money: "Orange Money",
  especes: "Espèces au bureau",
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  en_attente: "Paiement en attente",
  declare: "Paiement déclaré",
  confirme: "Place confirmée",
  annule: "Annulée",
};

export const paymentStatusOrder: PaymentStatus[] = ["en_attente", "declare", "confirme", "annule"];
