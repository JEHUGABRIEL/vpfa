import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { formations, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Formations",
  alternates: { canonical: "/formations" },
  description:
    "Formations en saponification et en perlage à Bangui : apprenez un métier, créez votre activité et renforcez votre autonomie avec l'ONG VPFA.",
};

const faqs = [
  {
    question: "Faut-il un niveau d'études particulier ?",
    answer:
      "Non. Nos formations sont pratiques et accessibles. L'essentiel est la motivation et l'envie d'apprendre. Les contenus sont expliqués pas à pas.",
  },
  {
    question: "Le matériel est-il fourni pendant la formation ?",
    answer:
      "Le matériel nécessaire aux ateliers est mis à disposition pour la pratique. Les modalités exactes vous sont confirmées lors de l'inscription.",
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer:
      "Contactez-nous pour en discuter. Nous cherchons des solutions adaptées à la situation de chaque participante, dans la limite des places disponibles.",
  },
  {
    question: "Les hommes sont-ils acceptés ?",
    answer:
      "Nos formations sont prioritairement destinées aux femmes et aux jeunes filles, mais toute personne désireuse d'apprendre un métier est bienvenue. Écrivez-nous pour vérifier les places disponibles.",
  },
];

export default function FormationsPage() {
  return (
    <>
      <PageHero
        current="Formations"
        title={
          <>
            Un métier entre les mains, <em>un avenir devant soi.</em>
          </>
        }
        intro="Des formations pratiques, accessibles et pensées pour l'autonomie des femmes et des jeunes filles. Apprenez, créez, vendez et prenez votre place."
        image="/images/artisanat.webp"
        imageAlt="Femme confectionnant des accessoires artisanaux"
      >
        <div className="cta-actions">
          <Link href="#programmes" className="btn btn-light">
            Voir les programmes
            <Icon name="arrow-right" size={17} />
          </Link>
          <Link href="#inscription" className="btn btn-sky">
            S&apos;inscrire
            <Icon name="whatsapp" size={16} />
          </Link>
        </div>
      </PageHero>

      <section className="section wrap two align-start">
        <div>
          <div className="st">
            <p className="kicker">Pourquoi se former ?</p>
            <h2>
              <span className="lt">Un savoir-faire</span>{" "}
              <span className="hd">qui ouvre des portes.</span>
            </h2>
          </div>
          <p>
            Nos formations sont conçues pour être immédiatement utiles. Vous
            apprenez des gestes concrets, vous fabriquez vos premiers produits et
            vous repartez avec les bases nécessaires pour lancer votre activité.
          </p>
          <p>
            Au-delà de la technique, nous travaillons la confiance, la gestion, le
            marketing et le leadership. Parce qu&apos;un métier ne suffit pas : il
            faut aussi pouvoir le faire connaître et le faire grandir.
          </p>
          <Link href="#programmes" className="line-more">
            Découvrir les deux programmes
          </Link>
        </div>
        <div className="aside-box">
          <h4>Informations pratiques</h4>
          <p>
            <strong>Public</strong>
            <br />
            Femmes, jeunes filles et toute personne désireuse d&apos;apprendre un
            métier.
          </p>
          <p>
            <strong>Paiement</strong>
            <br />
            Orange Money au {site.orangeMoney} — modalités confirmées à
            l&apos;inscription.
          </p>
          <p>
            <strong>Lieu</strong>
            <br />
            Bangui, République centrafricaine.
          </p>
          <p>
            <strong>Contact</strong>
            <br />
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <Link href="#inscription" className="btn btn-brand">
            Réserver ma place
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>

      <section className="section tint" id="programmes">
        <div className="wrap">
          <SectionHeading
            kicker="Nos programmes"
            title={
              <>
                <span className="lt">Deux formations,</span>{" "}
                <span className="hd">des débouchés concrets.</span>
              </>
            }
            intro="Choisissez le programme qui correspond à votre projet. Les places sont limitées afin de garantir un accompagnement de qualité."
          />

          <div className="post-list">
            {formations.map((formation) => (
              <article className="post-row" id={formation.slug} key={formation.slug}>
                <div className="post-media">
                  <Image
                    src={formation.image}
                    alt={formation.alt}
                    width={1024}
                    height={704}
                    sizes="(max-width: 980px) 92vw, 46vw"
                  />
                </div>
                <div className="post-body">
                  <p className="kicker">{formation.kicker}</p>
                  <h2>{formation.title}</h2>
                  <p>
                    <span className="tagpill">{formation.price}</span>
                  </p>
                  <p>{formation.description}</p>
                  <ul className="check">
                    {formation.program.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Vos bénéfices :</strong>{" "}
                    {formation.benefits.join(" · ")}.
                  </p>
                  <p className="note">{formation.note}</p>
                  <div className="cta-actions">
                    <Link href="#inscription" className="btn btn-brand">
                      Je veux m&apos;inscrire
                      <Icon name="arrow-right" size={16} />
                    </Link>
                    <a
                      href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sky"
                    >
                      Poser une question
                      <Icon name="whatsapp" size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <SectionHeading
          kicker="Comment s'inscrire"
          title={
            <>
              <span className="lt">Trois étapes,</span>{" "}
              <span className="hd">et vous y êtes.</span>
            </>
          }
          intro="Pas de démarche compliquée : nous vous accompagnons du premier message jusqu'au début de la formation."
        />
        <ol className="steps">
          <li>
            <strong>Choisissez votre formation.</strong> Comparez les programmes et
            les tarifs, puis sélectionnez celle qui correspond à votre projet.
          </li>
          <li>
            <strong>Contactez-nous.</strong> Envoyez votre demande via le formulaire,
            WhatsApp ou par téléphone. Nous confirmons les places disponibles.
          </li>
          <li>
            <strong>Rejoignez le groupe.</strong> Après confirmation et règlement,
            nous vous communiquons la date, le lieu et les informations pratiques.
          </li>
        </ol>
      </section>

      <section className="section tint" id="inscription">
        <div className="wrap two align-start">
          <div>
            <div className="st">
              <p className="kicker">Inscriptions</p>
              <h2>
                <span className="lt">Réservez votre place</span>{" "}
                <span className="hd">dès maintenant.</span>
              </h2>
            </div>
            <p>
              Les sessions sont organisées en petits groupes pour favoriser la
              pratique. Contactez-nous pour connaître les prochaines dates et
              confirmer votre inscription.
            </p>
            <p>
              <a href={`tel:${site.phoneHref}`}>
                <strong>{site.phone}</strong>
              </a>{" "}
              ·{" "}
              <a
                href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              · <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>{site.location}</p>
            <div className="give-box">
              <span className="give-box-label">Paiement Orange Money</span>
              <strong className="give-box-value">{site.orangeMoney}</strong>
              <small>
                Ne communiquez jamais vos codes. Le paiement est confirmé directement
                par l&apos;équipe VPFA.
              </small>
            </div>
          </div>
          <RegistrationForm />
        </div>
      </section>

      <section className="section wrap">
        <SectionHeading
          kicker="Questions fréquentes"
          title={
            <>
              <span className="lt">Vous vous demandez</span>{" "}
              <span className="hd">peut-être…</span>
            </>
          }
        />
        {faqs.map((faq) => (
          <details className="faq" key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <CtaBand
        eyebrow="Un projet professionnel ?"
        title="Nous pouvons vous aider à le faire grandir."
        text="Après la formation, nous restons disponibles pour vos questions et vous orientons vers les bonnes ressources."
        primaryLabel="Nous contacter"
        primaryHref="/#contact"
        secondaryLabel="Découvrir nos actions"
        secondaryHref="/nos-actions"
      />
    </>
  );
}
