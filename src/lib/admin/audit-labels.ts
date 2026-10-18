import type { AuditAction } from "@/lib/audit";

export const actionLabels: Record<AuditAction, string> = {
  connexion: "Connexion",
  connexion_echouee: "Connexion refusée",
  deconnexion: "Déconnexion",
  creation: "Création",
  modification: "Modification",
  suppression: "Suppression",
  publication: "Publication",
  masquage: "Masquage",
  televersement: "Téléversement",
  statut: "Changement de statut",
  inscription: "Inscription",
  paiement_declare: "Paiement déclaré",
  message: "Message reçu",
  temoignage: "Témoignage reçu",
  compte: "Gestion des comptes",
  mot_de_passe: "Mot de passe",
};

/** Groups for the log filter. */
export const actionGroups: { label: string; actions: AuditAction[] }[] = [
  { label: "Connexions", actions: ["connexion", "connexion_echouee", "deconnexion"] },
  { label: "Contenus", actions: ["creation", "modification", "suppression", "publication", "masquage", "televersement"] },
  { label: "Demandes", actions: ["inscription", "paiement_declare", "statut", "message", "temoignage"] },
  { label: "Comptes", actions: ["compte", "mot_de_passe"] },
];
