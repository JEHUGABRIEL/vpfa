import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  alternates: { canonical: "/conditions" },
  description:
    "Conditions d'utilisation du site de l'ONG VPFA : objet, accès, contenus publiés, formulaires, propriété intellectuelle et responsabilité.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        current="Conditions d'utilisation"
        title={
          <>
            Les règles d&apos;usage <em>de ce site.</em>
          </>
        }
        intro="Ce document précise ce que vous pouvez attendre de ce site et ce que nous attendons de ses visiteurs. Pour toute question, écrivez-nous : nous répondons volontiers."
      />

      <section className="section wrap article">
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions encadrent l&apos;utilisation du site de
          l&apos;ONG VPFA - {site.fullName} ({site.acronym}). En consultant ce
          site, vous acceptez les règles décrites ci-dessous. Si vous ne les
          acceptez pas, vous pouvez simplement cesser de l&apos;utiliser.
        </p>

        <h2>2. Éditeur du site</h2>
        <p>
          Le site est édité par {site.name}, organisation non gouvernementale
          basée à {site.location}, joignable à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> et au{" "}
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>. Les informations
          complètes de l&apos;éditeur et de l&apos;hébergeur figurent sur la page{" "}
          <Link href="/mentions-legales">Mentions légales</Link>.
        </p>

        <h2>3. Accès au site</h2>
        <p>
          Le site est accessible gratuitement, sans création de compte. Nous
          pouvons le faire évoluer, le suspendre temporairement pour maintenance
          ou retirer certaines pages, sans que cela ouvre droit à une
          indemnisation.
        </p>

        <h2>4. Contenus publiés</h2>
        <p>
          Les informations publiées (présentation de l&apos;organisation,
          programmes, formations, actualités) sont fournies à titre indicatif.
          Les tarifs des formations, les dates de session et les places
          disponibles peuvent évoluer : ils sont confirmés par l&apos;équipe
          avant toute inscription.
        </p>
        <p>
          Les photographies d&apos;illustration servent à évoquer les réalités
          des femmes et des communautés en Afrique centrale ; leurs auteurs et
          licences sont indiqués sur la page{" "}
          <Link href="/credits">Crédits photo</Link>.
        </p>

        <h2>5. Formulaires et messages</h2>
        <p>
          Les formulaires de ce site transmettent vos demandes à l&apos;équipe
          de l&apos;ONG VPFA, qui les reçoit dans son espace
          d&apos;administration. Vous restez responsable du contenu de vos
          messages. Le traitement de vos informations est décrit dans la section{" "}
          <Link href="/mentions-legales#confidentialite">Confidentialité</Link>.
        </p>

        <h2>6. Propriété intellectuelle</h2>
        <p>
          Le nom, le logo, les textes et l&apos;identité visuelle de l&apos;ONG
          VPFA sont protégés. Toute reproduction, totale ou partielle, à des fins
          commerciales ou de publication, nécessite notre autorisation écrite
          préalable. Le partage de nos pages vers les réseaux sociaux et
          l&apos;usage pédagogique ou associatif raisonnable restent bien sûr
          encouragés.
        </p>

        <h2>7. Liens externes</h2>
        <p>
          Certains liens mènent vers des services que nous ne contrôlons pas
          (WhatsApp, Facebook, hébergeur). Leur utilisation relève de leurs
          propres conditions et politiques de confidentialité.
        </p>

        <h2>8. Responsabilité</h2>
        <p>
          Nous nous efforçons de publier des informations exactes et à jour,
          sans pouvoir garantir l&apos;absence d&apos;erreur. L&apos;ONG VPFA ne
          saurait être tenue responsable d&apos;un dommage direct ou indirect
          résultant de l&apos;utilisation de ce site ou de la confiance accordée
          à une information non confirmée par l&apos;équipe.
        </p>

        <h2>9. Droit applicable</h2>
        <p>
          Le présent document est soumis au droit centrafricain. En cas de
          difficulté, nous vous invitons à nous écrire d&apos;abord : une
          solution amiable est presque toujours possible, à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </>
  );
}
