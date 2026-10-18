import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { photoCredits } from "@/lib/credits";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Crédits photo",
  alternates: { canonical: "/credits" },
  description:
    "Crédits et licences des photographies d'illustration utilisées sur le site de l'ONG VPFA.",
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        current="Crédits photo"
        title={
          <>
            Crédits photo <em>& remerciements.</em>
          </>
        }
        intro="Les photographies d'illustration utilisées sur ce site proviennent de Wikimedia Commons et sont diffusées sous licence Creative Commons. Le logo et les contenus de l'ONG VPFA lui appartiennent."
      />

      <section className="section wrap">
        <div className="st">
          <p className="kicker">Transparence</p>
          <h2>
            <span className="lt">Des images</span>{" "}
            <span className="hd">et leurs auteurs.</span>
          </h2>
        </div>
        <p>
          Les images sont utilisées à titre d&apos;illustration et ne représentent
          pas nécessairement des activités conduites par l&apos;ONG VPFA. Elles ont
          été sélectionnées pour évoquer les réalités des femmes, des jeunes filles
          et des communautés en Afrique centrale.
        </p>

        <div className="gallery" style={{ marginTop: "2rem" }}>
          {photoCredits.map((photo) => (
            <figure key={photo.slug}>
              <Image
                src={photo.file}
                alt={photo.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 92vw, 30vw"
              />
              <figcaption>
                <span>{photo.license}</span>
                {photo.title}
                <br />
                Photo : {photo.artist} —{" "}
                <a href={photo.source} target="_blank" rel="noopener noreferrer">
                  Wikimedia Commons
                </a>
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ marginTop: "2rem" }}>
          Vous constatez une erreur d&apos;attribution ou souhaitez nous signaler un
          contenu ? <a href={`mailto:${site.email}`}>Contactez-nous</a> : nous
          corrigerons rapidement.
        </p>
        <p>
          Les icônes du site sont des dessins SVG originaux inspirés de formes
          simples et libres d&apos;utilisation.
        </p>
      </section>
    </>
  );
}
