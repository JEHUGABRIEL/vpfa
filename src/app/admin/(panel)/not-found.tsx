import Link from "next/link";

export default function AdminNotFound() {
  return (
    <section className="adm-card">
      <p className="adm-empty">
        <strong>Élément introuvable</strong>
        Il a peut-être été supprimé.{" "}
        <Link href="/admin">Retour au tableau de bord</Link>
      </p>
    </section>
  );
}
