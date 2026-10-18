"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <p className="not-found-code">Oups</p>
        <h1>Un problème est survenu.</h1>
        <p>
          La page n&apos;a pas pu s&apos;afficher correctement. Réessayez dans un
          instant ; si le problème persiste, contactez-nous.
        </p>
        <div className="not-found-actions">
          <button type="button" className="btn btn-brand" onClick={() => retry()}>
            Réessayer
            <Icon name="arrow-right" size={16} />
          </button>
          <Link href="/" className="btn btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
