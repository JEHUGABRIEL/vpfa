import Image from "next/image";
import Link from "next/link";
import type { Formation } from "@/db/schema";

export function FormationCatalog({ formations }: { formations: Formation[] }) {
  return (
    <div className="fcat">
      {formations.map((formation) => {
        const href = `/formations#${formation.slug}`;
        const meta = [formation.duration, formation.price].filter(Boolean);
        return (
          <article className="fcat-item" key={formation.id}>
            <Link href={href} className="fcat-media" tabIndex={-1} aria-hidden="true">
              <Image
                src={formation.image}
                alt=""
                fill
                sizes="(max-width: 760px) 92vw, 320px"
                className="cover"
              />
            </Link>
            <div className="fcat-body">
              <p className="fcat-meta">
                {formation.badge ? <span className="fcat-open">{formation.badge}</span> : null}
                {meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
              <h3>
                <Link href={href}>{formation.title}</Link>
              </h3>
              {formation.description ? <p>{formation.description}</p> : null}
              <Link href={href} className="fcat-link">
                Voir le programme et s&apos;inscrire
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </article>
        );
      })}
      <p className="fcat-group">
        Vous êtes une association, une coopérative ou une entreprise ? Nous organisons
        aussi des sessions sur mesure pour les groupes, à Bangui ou en province.{" "}
        <Link href="/#contact">Nous écrire →</Link>
      </p>
    </div>
  );
}
