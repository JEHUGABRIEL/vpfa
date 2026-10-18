import Link from "next/link";
import { Icon } from "@/components/Icon";

export function NotFoundContent() {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <p className="not-found-code">404</p>
        <h1>Cette page n&apos;existe pas.</h1>
        <p>
          Le lien est peut-être ancien, ou la page a été déplacée. Retrouvez
          l&apos;essentiel depuis l&apos;accueil ou contactez-nous.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-brand">
            Retour à l&apos;accueil
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link href="/#contact" className="btn btn-outline">
            Nous contacter
            <Icon name="mail" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
