import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { HeroSlider } from "@/components/HeroSlider";
import { FormationCatalog } from "@/components/FormationCatalog";
import { Icon } from "@/components/Icon";
import { TestimonialForm } from "@/components/TestimonialForm";
import { getFormations, getPartners, getPosts, getTestimonials } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const shortMonth = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" });

/** "2026-10-16" -> { day: "16", month: "OCT" } */
function dateParts(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return {
    day: String(date.getUTCDate()),
    month: shortMonth.format(date).replace(".", "").toUpperCase(),
  };
}

export default async function HomePage() {
  const [formations, posts, partners, testimonials] = await Promise.all([
    getFormations(),
    getPosts(),
    getPartners(),
    getTestimonials(),
  ]);
  const [featured, ...rest] = posts.slice(0, 3);

  return (
    <>
      <HeroSlider />

      <section className="section wrap two">
        <div>
          <div className="st">
            <p className="kicker">ONG VPFA</p>
            <h2>
              <span className="lt">Qui</span> <span className="hd">sommes-nous ?</span>
            </h2>
          </div>
          <p>
            L&apos;ONG VPFA - Vision Positive pour les Femmes en Afrique - est née
            d&apos;un constat simple : les femmes et les jeunes filles de
            République centrafricaine disposent d&apos;un potentiel immense, mais
            rencontrent encore trop d&apos;obstacles pour le réaliser.
          </p>
          <p>
            Nous agissons à Bangui et en province pour l&apos;autonomisation
            économique, l&apos;éducation, la protection et l&apos;inclusion. Nos
            formations, nos rencontres et nos plaidoyers sont construits avec les
            communautés, pour des résultats concrets et durables.
          </p>
          <Link href="/a-propos" className="btn btn-brand">
            En savoir plus
          </Link>
        </div>
        <Image
          src="/images/femmes-paoua.webp"
          alt="Femmes réunies lors d'une rencontre communautaire en Centrafrique"
          width={1024}
          height={683}
          sizes="(max-width: 980px) 92vw, 48vw"
          className="rounded r-br"
        />
      </section>

      <section className="section wrap">
        <div className="icon-row">
          <article>
            <div className="irow-head">
              <span className="icircle">
                <Icon name="shield" size={28} />
              </span>
              <h3>Protection</h3>
            </div>
            <p>
              Sensibiliser aux droits, soutenir les personnes vulnérables et porter
              la voix des femmes et des filles auprès des autorités.
            </p>
          </article>
          <article>
            <div className="irow-head">
              <span className="icircle">
                <Icon name="users" size={28} />
              </span>
              <h3>Inclusion</h3>
            </div>
            <p>
              Faire une place à chacune : femmes rurales, jeunes filles, peuples
              autochtones Aka et communautés locales.
            </p>
          </article>
          <article>
            <div className="irow-head">
              <span className="icircle">
                <Icon name="sprout" size={28} />
              </span>
              <h3>Développement</h3>
            </div>
            <p>
              Transmettre des compétences, soutenir l&apos;entrepreneuriat et
              valoriser les ressources locales pour des revenus durables.
            </p>
          </article>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="st">
            <p className="kicker">Nos domaines d&apos;action</p>
            <h2>
              <span className="lt">Ce que nous</span>{" "}
              <span className="hd">faisons.</span>
            </h2>
          </div>
          <div className="svc-grid">
            <article className="svc">
              <Image
                src="/images/protection.webp"
                alt="Enfants et communautés accompagnés en République centrafricaine"
                width={2161}
                height={1621}
                sizes="(max-width: 1024px) 46vw, 33vw"
                className="svc-img"
              />
              <h3>Protection & droits</h3>
              <p>
                Des actions de sensibilisation et de plaidoyer pour les droits des
                femmes, des filles et des communautés les plus vulnérables.
              </p>
              <Link href="/nos-actions" className="line-more">
                En savoir plus
              </Link>
            </article>
            <article className="svc">
              <Image
                src="/images/savonnerie.webp"
                alt="Atelier de fabrication de savon"
                width={4864}
                height={2736}
                sizes="(max-width: 1024px) 46vw, 33vw"
                className="svc-img"
              />
              <h3>Formation & autonomie</h3>
              <p>
                Saponification, perlage, gestion et leadership : des formations
                pratiques pour créer une activité et gagner en indépendance.
              </p>
              <Link href="/formations" className="line-more">
                Voir les formations
              </Link>
            </article>
            <article className="svc">
              <Image
                src="/images/ecole-fille.webp"
                alt="Jeune fille en uniforme scolaire"
                width={1558}
                height={1653}
                sizes="(max-width: 1024px) 46vw, 33vw"
                className="svc-img"
              />
              <h3>Éducation & inclusion</h3>
              <p>
                Encourager les jeunes filles à poursuivre leurs études et favoriser
                l&apos;inclusion des peuples autochtones dans la vie publique.
              </p>
              <Link href="/nos-actions#education-leadership-filles" className="line-more">
                En savoir plus
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="st">
          <p className="kicker">Nos formations</p>
          <h2>
            <span className="lt">Des formations</span>{" "}
            <span className="hd">qui transforment.</span>
          </h2>
        </div>
        <FormationCatalog formations={formations} />
      </section>

      <section className="why">
        <div className="why-img">
          <Image
            src="/images/marche-bangui.webp"
            alt="Femmes échangeant sur un marché de Bangui"
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            className="cover"
          />
        </div>
        <div className="why-txt">
          <div className="st light">
            <p className="kicker light">Pourquoi l&apos;ONG VPFA</p>
            <h2>
              <span className="lt">Pourquoi agir</span>{" "}
              <span className="hd">avec nous ?</span>
            </h2>
          </div>
          <div className="why-list">
            <p>
              <strong>Un ancrage local.</strong> Nos équipes sont à Bangui et en
              Lobaye, au plus près des réalités et des réseaux communautaires.
            </p>
            <p>
              <strong>Des formations concrètes.</strong> Nous transmettons des
              savoir-faire immédiatement utilisables, avec un accompagnement après
              l&apos;atelier.
            </p>
            <p>
              <strong>Une approche inclusive.</strong> Femmes, jeunes filles et
              peuples autochtones Aka sont au cœur de nos priorités, sans
              discrimination.
            </p>
            <p>
              <strong>Des partenariats solides.</strong> Institutions, ONG
              internationales, société civile et entreprises marchent à nos côtés
              pour un impact durable.
            </p>
          </div>
          <Link href="/#contact" className="btn btn-sky">
            Contactez-nous
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="st center">
          <p className="kicker">Nos actualités</p>
          <h2>
            <span className="lt">Nos dernières</span>{" "}
            <span className="hd">actualités</span>
          </h2>
        </div>
        <div className="news-grid">
          {featured ? (
            <article className="ncard feature">
              <span className="date">
                <b>{dateParts(featured.publishedAt).day}</b>
                <span>{dateParts(featured.publishedAt).month}</span>
              </span>
              <div className="ncard-in">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="cover"
                />
                <span className="shade" />
                <div className="nc-body">
                  <span className="chip">{featured.category}</span>
                  <h3>
                    <Link href={`/actualites/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <p>{featured.excerpt}</p>
                  <Link href={`/actualites/${featured.slug}`} className="more">
                    Lire la suite
                    <Icon name="arrow-up-right" size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {rest.map((post) => (
            <article className="ncard" key={post.slug}>
              <span className="date">
                <b>{dateParts(post.publishedAt).day}</b>
                <span>{dateParts(post.publishedAt).month}</span>
              </span>
              <div className="ncard-in">
                <p className="nc-kick">{post.category}</p>
                <h3>
                  <Link href={`/actualites/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link href={`/actualites/${post.slug}`} className="more">
                  Lire la suite
                  <Icon name="arrow-up-right" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="center-cta">
          <Link href="/actualites" className="btn btn-brand">
            Toutes les actualités
          </Link>
        </div>
      </section>

      <section className="section reviews">
        <div className="wrap">
          <div className="st">
            <p className="kicker">Nos engagements</p>
            <h2>
              <span className="lt">Ce que nous</span>{" "}
              <span className="hd">portons.</span>
            </h2>
          </div>
          <div className="rev-grid">
            <article className="rev">
              <span className="g">
                <Icon name="quote" size={28} />
              </span>
              <h3>Filles d&apos;aujourd&apos;hui, leaders de demain</h3>
              <p>
                Chaque fille a le droit d&apos;aller à l&apos;école, de se former,
                de s&apos;exprimer et de choisir son avenir.
              </p>
              <p className="who">- ONG VPFA</p>
            </article>
            <article className="rev">
              <span className="g">
                <Icon name="quote" size={28} />
              </span>
              <h3>Un métier, une autonomie</h3>
              <p>
                La formation est un levier puissant : elle transforme les
                compétences en revenus et la confiance en projets.
              </p>
              <p className="who">- Nos formatrices</p>
            </article>
            <article className="rev">
              <span className="g">
                <Icon name="quote" size={28} />
              </span>
              <h3>Ensemble, nous pouvons</h3>
              <p>
                Protection, inclusion, développement : trois piliers pour un avenir
                plus juste et plus prospère pour toutes et tous.
              </p>
              <p className="who">- Notre conviction</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section wrap" id="temoignages">
        <div className="st">
          <p className="kicker">Témoignages</p>
          <h2>
            <span className="lt">Elles et ils</span> <span className="hd">en parlent.</span>
          </h2>
        </div>
        {testimonials.length > 0 ? (
          <ul className="testi-list">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id}>
                <figure>
                  <blockquote>« {testimonial.message} »</blockquote>
                  <figcaption>
                    <strong>{testimonial.name}</strong>
                    {testimonial.role ? `, ${testimonial.role}` : ""}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="testi-empty">
            Les premiers témoignages de nos participantes et partenaires seront
            publiés ici.
          </p>
        )}
        <div className="two align-start">
          <div>
            <p>
              Vous avez suivi une formation, participé à une de nos journées ou
              travaillé avec l&apos;ONG VPFA ? Racontez-nous ce que cela a changé pour
              vous. Votre témoignage est relu par l&apos;équipe avant d&apos;être
              publié.
            </p>
          </div>
          <TestimonialForm />
        </div>
      </section>

      <section className="partners-band">
        <div className="wrap">
          <div className="st light center">
            <p className="kicker light">Nos partenaires</p>
            <h2>
              <span className="lt">Ils nous</span>{" "}
              <span className="hd">font confiance</span>
            </h2>
          </div>
        </div>
        <div className="p-marquee">
          <div className="p-track">
            {[false, true].map((duplicate) =>
              partners.map((partner) =>
                partner.logo ? (
                  <span
                    className="p-chip p-chip-logo"
                    key={`${duplicate ? "dup-" : ""}${partner.id}`}
                    aria-hidden={duplicate || undefined}
                    title={partner.name}
                  >
                    <Image
                      src={partner.logo}
                      alt={duplicate ? "" : partner.name}
                      width={180}
                      height={90}
                      sizes="180px"
                    />
                  </span>
                ) : (
                  <span
                    className="p-chip"
                    key={`${duplicate ? "dup-" : ""}${partner.id}`}
                    aria-hidden={duplicate || undefined}
                  >
                    {partner.name}
                  </span>
                ),
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section tint" id="contact">
        <div className="wrap two align-start">
          <div>
            <div className="st">
              <p className="kicker">Formulaire</p>
              <h2>
                <span className="lt">Nous</span>{" "}
                <span className="hd">contacter</span>
              </h2>
            </div>
            <p>
              Décrivez-nous votre projet, votre demande de formation ou votre envie
              de vous engager. Nous revenons vers vous sous <strong>24 à 48 h</strong>.
            </p>
            <div className="info-grid">
              <div className="info">
                <span className="icircle soft">
                  <Icon name="phone" size={28} />
                </span>
                <div>
                  <h4>Téléphone</h4>
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                  <p>{site.phone2}</p>
                </div>
              </div>
              <div className="info">
                <span className="icircle soft">
                  <Icon name="mail" size={28} />
                </span>
                <div>
                  <h4>E-mail</h4>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                  <p>Réponse sous 48 h ouvrées.</p>
                </div>
              </div>
              <div className="info">
                <span className="icircle soft">
                  <Icon name="pin" size={28} />
                </span>
                <div>
                  <h4>Nous trouver</h4>
                  <p>{site.location}</p>
                  <p>Bangui & préfecture de la Lobaye.</p>
                </div>
              </div>
              <div className="info">
                <span className="icircle soft">
                  <Icon name="whatsapp" size={28} />
                </span>
                <div>
                  <h4>WhatsApp</h4>
                  <a
                    href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discuter avec l&apos;équipe
                  </a>
                  <p>Du lundi au samedi.</p>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <CtaBand
        eyebrow="Un projet à construire ?"
        title="Parlons de ce que nous pouvons faire ensemble."
        text="Que vous soyez une communauté, une entreprise, une institution ou une personne engagée, votre énergie peut ouvrir de nouvelles portes."
        primaryLabel="Nous contacter"
        primaryHref="/#contact"
        secondaryLabel="Soutenir nos actions"
        secondaryHref="/soutenir"
      />
    </>
  );
}
