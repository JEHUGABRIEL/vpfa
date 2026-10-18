import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { presidentMessage, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  alternates: { canonical: "/a-propos" },
  description:
    "Découvrez l'ONG VPFA, son histoire, sa mission, ses valeurs et son engagement pour l'autonomisation des femmes et des jeunes filles en République centrafricaine.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        current="À propos"
        title={
          <>
            Une vision positive pour les femmes et les communautés{" "}
            <em>d&apos;Afrique.</em>
          </>
        }
        intro="Née à Bangui, l'ONG VPFA rassemble des femmes et des hommes convaincus que l'égalité, l'inclusion et la transmission des savoir-faire sont des leviers puissants de développement."
        image="/images/femmes-paoua.webp"
        imageAlt="Femmes réunies lors d'une rencontre communautaire en Centrafrique"
      >
        <div className="cta-actions">
          <Link href="/nos-actions" className="btn btn-light">
            Nos actions
            <Icon name="arrow-right" size={20} />
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-sky">
            Nous rencontrer
            <Icon name="mail" size={16} />
          </a>
        </div>
      </PageHero>

      <section className="section wrap two">
        <div>
          <div className="st">
            <p className="kicker">Qui sommes-nous</p>
            <h2>
              <span className="lt">Agir au plus près</span>{" "}
              <span className="hd">des communautés.</span>
            </h2>
          </div>
          <p>
            L&apos;ONG VPFA -{" "}
            <strong>Vision Positive pour les Femmes en Afrique</strong> (également
            désignée PVWA, <em>Positive Vision for Women in Africa</em>) - est une
            organisation centrafricaine basée à Bangui. Elle œuvre pour
            l&apos;autonomisation des femmes et des jeunes filles, la protection des
            personnes vulnérables et l&apos;inclusion des communautés.
          </p>
          <p>
            Notre approche part du terrain. Nous écoutons les besoins, nous
            construisons avec les communautés et nous privilégions les solutions
            concrètes : une formation qui devient une activité, une jeune fille qui
            reprend confiance, une communauté qui fait entendre sa voix.
          </p>
          <p className="lead">
            « Protection, inclusion, développement : trois mots qui guident chacune
            de nos actions. »
          </p>
          <p>
            De Bangui à la préfecture de la Lobaye, nous travaillons aux côtés des
            femmes rurales, des jeunes, des peuples autochtones Aka et de leurs
            communautés. Nos projets sont menés en partenariat avec des acteurs
            institutionnels, des organisations internationales, la société civile et
            le secteur privé.
          </p>
        </div>
        <Image
          src="/images/femmes-paoua.webp"
          alt="Femmes réunies lors d'une rencontre communautaire en Centrafrique"
          width={1024}
          height={683}
          sizes="(max-width: 980px) 92vw, 46vw"
          className="rounded r-br"
        />
      </section>

      <section className="section tint" id="presidente">
        <div className="wrap president">
          <figure className="president-photo">
            <Image
              src="/images/presidente.webp"
              alt={`${site.president}, présidente de l'ONG VPFA`}
              width={420}
              height={632}
              sizes="(max-width: 980px) 70vw, 360px"
            />
          </figure>
          <div>
            <SectionHeading
              kicker="Mot de la présidente"
              title={
                <>
                  <span className="lt">Une conviction</span>{" "}
                  <span className="hd">qui nous rassemble.</span>
                </>
              }
            />
            <blockquote className="president-text">
              {presidentMessage.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </blockquote>
            <p className="president-sign">
              <strong>{site.president}</strong>
              <span>{site.presidentRole}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <SectionHeading
          kicker="Nos valeurs"
            title={
              <>
                <span className="lt">Ce qui nous</span>{" "}
                <span className="hd">fait avancer.</span>
              </>
            }
          intro="Nos valeurs se lisent dans notre façon d'écouter, de former et d'accompagner, à Bangui comme en province."
        />
        <div className="values">
          {values.map((value) => (
            <div key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section tint" id="nous-trouver">
        <div className="wrap two align-start">
          <div>
            <SectionHeading
              kicker="Nous trouver"
              title={
                <>
                  <span className="lt">Notre siège</span>{" "}
                  <span className="hd">à Bangui.</span>
                </>
              }
            />
            <ul className="visit-list">
              <li>
                <Icon name="pin" size={20} />
                <span>{site.location}</span>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <span>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a> ·{" "}
                  <a href={`tel:${site.phone2Href}`}>{site.phone2}</a>
                </span>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Icon name="calendar" size={20} />
                <span>Visites sur rendez-vous, du lundi au samedi.</span>
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand"
            >
              Ouvrir dans Google Maps
              <Icon name="external" size={16} />
            </a>
          </div>
          <div className="map-frame">
            <iframe
              title={`Carte : ${site.mapQuery}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Écrivons la suite ensemble"
        title="Une idée, un projet, une envie de vous engager ?"
        text="Nous croyons aux rencontres qui font naître de grandes choses. Partenaires, bénévoles, formateurs ou bénéficiaires : la porte est ouverte."
        primaryLabel="Nous soutenir"
        primaryHref="/soutenir"
        secondaryLabel="Nous contacter"
        secondaryHref="/#contact"
      />
    </>
  );
}
