import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales & confidentialité",
  alternates: { canonical: "/mentions-legales" },
  description:
    "Mentions légales, politique de confidentialité et conditions d'utilisation du site de l'ONG VPFA.",
};

export default function LegalPage() {
  return (
    <>
      <PageHero
        current="Mentions légales"
        title={
          <>
            Mentions légales <em>& confidentialité.</em>
          </>
        }
        intro="Les informations légales du site, et la façon dont nous traitons les données que vous nous confiez."
      />

      <section className="section wrap article">
        <h2>Éditeur du site</h2>
        <p>
          Le présent site est édité par l&apos;<strong>{site.name}</strong> —{" "}
          {site.fullName} ({site.acronym}), organisation non gouvernementale
          fondée en {site.founded} et basée à {site.location}.
        </p>
        <p>
          <strong>Responsable de la publication :</strong> {site.president},{" "}
          {site.presidentRole.charAt(0).toLowerCase() + site.presidentRole.slice(1)}.
          <br />
          <strong>Contact :</strong>{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par {site.hosting.name}, {site.hosting.address} —{" "}
          <a href={site.hosting.url} target="_blank" rel="noopener noreferrer">
            {site.hosting.url.replace("https://", "")}
          </a>
          .
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, le logo et l&apos;identité visuelle de l&apos;ONG VPFA sont
          sa propriété. Toute reproduction, totale ou partielle, sans autorisation
          écrite préalable est interdite. Les photographies d&apos;illustration
          sont diffusées sous licence Creative Commons : leurs auteurs et licences
          sont indiqués sur la page <Link href="/credits">Crédits photo</Link>.
        </p>

        <h2 id="confidentialite">Données personnelles</h2>
        <p>
          Ce site ne crée pas de compte utilisateur et{" "}
          <strong>n&apos;enregistre aucune donnée sur ses serveurs</strong>. Les
          formulaires de contact, d&apos;inscription et de lettre d&apos;information
          préparent simplement un message que vous envoyez vous-même, depuis
          WhatsApp ou votre messagerie électronique.
        </p>
        <p>
          Les informations que vous nous transmettez ainsi (nom, téléphone,
          e-mail, message) sont utilisées uniquement pour répondre à votre demande,
          organiser les formations ou vous adresser nos actualités si vous
          l&apos;avez demandé. Elles ne sont ni vendues, ni cédées à des tiers.
        </p>
        <p>
          Vous pouvez à tout moment demander l&apos;accès, la rectification ou la
          suppression de vos données, ou vous désinscrire de notre lettre
          d&apos;information, en écrivant à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Cookies et services tiers</h2>
        <p>
          Le site n&apos;utilise ni cookie publicitaire, ni outil de mesure
          d&apos;audience. Les boutons de partage renvoient vers Facebook et
          WhatsApp : ces services appliquent leur propre politique de
          confidentialité lorsque vous les utilisez.
        </p>

        <h2>Responsabilité</h2>
        <p>
          L&apos;ONG VPFA s&apos;efforce de publier des informations exactes et à
          jour, notamment sur les formations et leurs tarifs. Celles-ci restent
          indicatives et peuvent évoluer : nous vous invitons à les confirmer
          auprès de l&apos;équipe avant toute inscription.
        </p>
      </section>
    </>
  );
}
