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
          Le présent site est édité par l&apos;<strong>{site.name}</strong> -{" "}
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

        <h2>Utilisation du site</h2>
        <p>
          L&apos;accès et l&apos;usage de ce site sont encadrés par nos{" "}
          <Link href="/conditions">conditions d&apos;utilisation</Link>, qui
          précisent notamment le statut des informations publiées et des tarifs
          de formation.
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par {site.hosting.name}, {site.hosting.address} -{" "}
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
          Ce site ne crée pas de compte visiteur. Lorsque vous envoyez le
          formulaire de contact ou une demande d&apos;inscription, les
          informations saisies (nom, téléphone, e-mail, formation choisie,
          mode de paiement, identifiant de transaction Orange Money, message) sont enregistrées dans notre base de données, hébergée par
          Neon, afin que l&apos;équipe puisse traiter votre demande.
        </p>
        <p>
          Ces informations sont consultées uniquement par les membres de
          l&apos;équipe disposant d&apos;un accès à l&apos;espace
          d&apos;administration. Elles servent à vous répondre et à organiser les
          formations, et ne sont ni vendues, ni cédées à des tiers. Les demandes
          traitées sont archivées puis supprimées lorsqu&apos;elles ne sont plus
          utiles.
        </p>
        <p>
          Les témoignages ne sont publiés qu&apos;avec l&apos;accord explicite de leur
          auteur, après relecture par l&apos;équipe. Ils peuvent être retirés sur
          simple demande.
        </p>
        <p>
          Vous pouvez à tout moment demander l&apos;accès, la rectification ou la
          suppression de vos données en écrivant à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Cookies et services tiers</h2>
        <p>
          Le site n&apos;utilise ni cookie publicitaire, ni outil de mesure
          d&apos;audience. Seul l&apos;espace d&apos;administration dépose un
          cookie de session, nécessaire à la connexion de l&apos;équipe. La carte de
          la page <Link href="/a-propos#nous-trouver">À propos</Link> est fournie par
          Google Maps, qui peut déposer ses propres cookies. Les boutons de partage renvoient vers Facebook et
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
