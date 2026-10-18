import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { actions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos actions",
  alternates: { canonical: "/nos-actions" },
  description:
    "Découvrez les programmes de l'ONG VPFA : autonomisation économique, éducation des filles, inclusion des peuples autochtones et sécurité alimentaire en RCA.",
};

const beneficiaries = [
  {
    title: "Les femmes",
    text: "Femmes urbaines et rurales, entrepreneures, artisanes et productrices, au cœur de nos formations et de nos actions.",
  },
  {
    title: "Les jeunes filles",
    text: "Pour qu'elles poursuivent leurs études, croient en leurs ambitions et prennent pleinement leur place.",
  },
  {
    title: "Les communautés Aka",
    text: "Avec un engagement pour leurs droits, leur dignité, leur culture et leur inclusion dans la vie publique.",
  },
  {
    title: "Les communautés locales",
    text: "Parce que le développement durable se construit avec les familles, les autorités et les acteurs de proximité.",
  },
];

export default function ActionsPage() {
  return (
    <>
      <PageHero
        current="Nos actions"
        title={
          <>
            Des actions qui changent <em>le quotidien.</em>
          </>
        }
        intro="Former, accompagner, sensibiliser et plaider : nous agissons sur les causes et les conséquences, pour que chaque femme puisse décider de son avenir."
        image="/images/savonnerie.webp"
        imageAlt="Atelier de fabrication de savon"
      >
        <div className="cta-actions">
          <Link href="/formations" className="btn btn-light">
            Voir nos formations
            <Icon name="arrow-right" size={17} />
          </Link>
          <Link href="/soutenir" className="btn btn-sky">
            Nous soutenir
            <Icon name="heart" size={16} />
          </Link>
        </div>
      </PageHero>

      <section className="section wrap">
        <SectionHeading
          kicker="Nos programmes"
          title={
            <>
              <span className="lt">Quatre leviers,</span>{" "}
              <span className="hd">un impact durable.</span>
            </>
          }
          intro="Nos programmes se renforcent mutuellement : une femme formée peut nourrir sa famille, une fille éduquée peut devenir leader, une communauté incluse peut construire son avenir."
        />
        <div className="post-list">
          {actions.map((action) => (
            <article className="post-row" id={action.slug} key={action.slug}>
              <div className="post-media">
                <Image
                  src={action.image}
                  alt={action.alt}
                  width={1024}
                  height={704}
                  sizes="(max-width: 980px) 92vw, 46vw"
                />
              </div>
              <div className="post-body">
                <p className="kicker">{action.kicker}</p>
                <h2>{action.title}</h2>
                <p>{action.description}</p>
                <ul className="check">
                  {action.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Link href="/#contact" className="line-more">
                  Construire ce projet avec nous
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <SectionHeading
            kicker="Pour qui nous agissons"
            title={
              <>
                <span className="lt">Des femmes, des filles,</span>{" "}
                <span className="hd">des communautés.</span>
              </>
            }
            intro="Nos actions s'adressent en priorité aux personnes et aux groupes qui rencontrent le plus d'obstacles dans l'accès aux droits, à la formation et aux ressources."
          />
          <div className="values">
            {beneficiaries.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap two">
        <div>
          <div className="st">
            <p className="kicker">Notre méthode</p>
            <h2>
              <span className="lt">Écouter avant d&apos;agir,</span>{" "}
              <span className="hd">accompagner après avoir formé.</span>
            </h2>
          </div>
          <p>
            Nous construisons chaque action avec les communautés et les partenaires
            locaux. La formation n&apos;est pas une fin en soi : elle doit déboucher
            sur des revenus, de la confiance et une participation plus grande à la
            vie de la communauté.
          </p>
          <ul className="check">
            <li>Diagnostic des besoins sur le terrain</li>
            <li>Ateliers pratiques et participatifs</li>
            <li>Suivi et mise en réseau</li>
            <li>Plaidoyer et engagement communautaire</li>
          </ul>
          <Link href="/a-propos" className="btn btn-brand">
            Découvrir notre organisation
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
        <Image
          src="/images/marche-bangui.webp"
          alt="Échanges sur un marché de Bangui"
          width={1024}
          height={768}
          sizes="(max-width: 980px) 92vw, 46vw"
          className="rounded r-tl"
        />
      </section>

      <CtaBand
        eyebrow="Un projet communautaire ?"
        title="Votre idée peut devenir une action de terrain."
        text="Nous travaillons avec les associations, les institutions et les entreprises qui souhaitent avoir un impact réel auprès des femmes et des communautés en Centrafrique."
        primaryLabel="Nous soutenir"
        primaryHref="/soutenir"
        secondaryLabel="Nous écrire"
        secondaryHref="/#contact"
      />
    </>
  );
}
