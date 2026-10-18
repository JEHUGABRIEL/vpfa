import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nous soutenir",
  alternates: { canonical: "/soutenir" },
  description:
    "Soutenez l'ONG VPFA : don par Orange Money, mécénat, partenariat, bénévolat ou parrainage d'une formation pour les femmes et les jeunes filles en RCA.",
};

const impact = [
  {
    title: "Une formation, un métier",
    text: "Votre soutien contribue au matériel, à l'organisation des ateliers et à l'accompagnement des participantes.",
    icon: "sprout" as const,
  },
  {
    title: "Une fille, un avenir",
    text: "Encouragez l'éducation, la confiance et la prise de parole des jeunes filles dans leurs communautés.",
    icon: "book" as const,
  },
  {
    title: "Une communauté, plus inclusive",
    text: "Appuyez nos actions de sensibilisation, de protection et d'inclusion des peuples autochtones Aka.",
    icon: "users" as const,
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        current="Nous soutenir"
        title={
          <>
            Votre soutien change <em>des vies.</em>
          </>
        }
        intro="Chaque formation financée, chaque matériel offert, chaque heure de bénévolat permet à une femme ou à une jeune fille d'aller plus loin."
        image="/images/savonnerie.webp"
        imageAlt="Atelier de fabrication de savon"
      >
        <div className="cta-actions">
          <Link href="#don" className="btn btn-light">
            Faire un don
            <Icon name="heart" size={17} />
          </Link>
          <Link href="#partenariat" className="btn btn-sky">
            Devenir partenaire
            <Icon name="briefcase" size={16} />
          </Link>
        </div>
      </PageHero>

      <section className="section wrap two align-start" id="don">
        <div className="aside-box brand">
          <p className="f-kick">Don par Orange Money</p>
          <h4>Un geste simple, un impact direct.</h4>
          <p>
            Vous pouvez soutenir nos formations et nos actions communautaires par
            Orange Money. Chaque contribution est utilisée au plus près du terrain.
          </p>
          <div className="give-box">
            <span className="give-box-label">Numéro Orange Money</span>
            <strong className="give-box-value">{site.orangeMoney}</strong>
            <small>
              Après votre versement, contactez-nous par téléphone ou WhatsApp pour
              nous indiquer l&apos;objet de votre soutien.
            </small>
          </div>
          <a
            href={`https://wa.me/${site.phoneHref.replace("+", "")}?text=${encodeURIComponent(
              "Bonjour l'ONG VPFA, je souhaite soutenir vos actions. Pouvez-vous me confirmer les modalités ?",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Confirmer mon soutien
            <Icon name="whatsapp" size={17} />
          </a>
        </div>

        <div>
          <SectionHeading
            kicker="Ce que votre soutien permet"
            title={
              <>
                <span className="lt">Des résultats concrets,</span>{" "}
                <span className="hd">au plus près des besoins.</span>
              </>
            }
          />
          <ul className="check">
            <li>
              <strong>Financer une formation</strong> — matériel, animation
              d&apos;atelier et accompagnement des participantes.
            </li>
            <li>
              <strong>Soutenir une jeune fille</strong> — encourager la poursuite de
              ses études et sa participation aux actions de leadership.
            </li>
            <li>
              <strong>Appuyer une action communautaire</strong> — organisation
              d&apos;une journée, sensibilisation ou rencontre avec les communautés.
            </li>
            <li>
              <strong>Offrir vos compétences</strong> — formation, communication,
              gestion, traduction ou appui logistique.
            </li>
          </ul>
          <a href={`mailto:${site.email}`} className="btn btn-brand">
            Écrire à l&apos;équipe
            <Icon name="mail" size={17} />
          </a>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHeading
            kicker="Votre impact"
            title={
              <>
                <span className="lt">Ce que nous construisons</span>{" "}
                <span className="hd">ensemble.</span>
              </>
            }
            intro="Nous privilégions les actions utiles, documentées et construites avec les communautés. Votre soutien s'inscrit dans cette démarche de confiance."
          />
          <div className="icon-row">
            {impact.map((item) => (
              <article key={item.title}>
                <div className="irow-head">
                  <span className="icircle">
                    <Icon name={item.icon} size={27} />
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap two align-start" id="partenariat">
        <div>
          <SectionHeading
            kicker="Partenariat & bénévolat"
            title={
              <>
                <span className="lt">Agissons</span>{" "}
                <span className="hd">ensemble.</span>
              </>
            }
          />
          <p>
            Vous représentez une entreprise, une institution, une association ou
            vous souhaitez offrir un peu de votre temps ? Nous construisons des
            partenariats adaptés à vos moyens et aux besoins du terrain.
          </p>
          <ul className="check">
            <li>Mécénat financier ou en nature</li>
            <li>Partage de compétences</li>
            <li>Bénévolat ponctuel ou régulier</li>
            <li>Co-construction de programmes</li>
          </ul>
        </div>
        <div className="aside-box">
          <h4>Un projet de soutien à construire ?</h4>
          <p>
            Écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou
            appelez le <a href={`tel:${site.phoneHref}`}>{site.phone}</a>. Nous vous
            répondrons avec plaisir.
          </p>
          <p>
            <Icon name="pin" size={16} /> {site.location}
          </p>
          <Link href="/#contact" className="btn btn-brand">
            Nous contacter
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow="Merci"
        title="Chaque geste compte, chaque rencontre transforme."
        text="Merci à toutes les personnes, institutions et entreprises qui croient en la capacité des femmes et des communautés centrafricaines à construire leur avenir."
        primaryLabel="Nous contacter"
        primaryHref="/#contact"
        secondaryLabel="Découvrir nos actions"
        secondaryHref="/nos-actions"
      />
    </>
  );
}
