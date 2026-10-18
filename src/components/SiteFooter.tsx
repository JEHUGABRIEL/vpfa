import Link from "next/link";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

const actionLinks = [
  { label: "Autonomisation économique", href: "/nos-actions#autonomisation-economique" },
  { label: "Éducation & leadership", href: "/nos-actions#education-leadership-filles" },
  { label: "Inclusion des peuples Aka", href: "/nos-actions#inclusion-peuples-autochtones" },
  { label: "Sécurité alimentaire", href: "/nos-actions#securite-alimentaire" },
  { label: "Nos formations", href: "/formations" },
];

const siteLinks = [
  { label: "Qui sommes-nous", href: "/a-propos" },
  { label: "Nos actions", href: "/nos-actions" },
  { label: "Actualités", href: "/actualites" },
  { label: "Nous soutenir", href: "/soutenir" },
];

export function SiteFooter() {
  return (
    <>
      <footer className="footer">
        <div className="wrap foot-grid">
          <div>
            <p className="f-kick">ONG VPFA</p>
            <h4>À propos de nous</h4>
            <p>
              Organisation centrafricaine engagée pour l&apos;autonomisation des
              femmes, l&apos;inclusion des communautés et un développement durable,
              à Bangui et en République centrafricaine.
            </p>
            <Link href="/a-propos" className="f-more">
              En savoir plus
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div>
            <p className="f-kick">Nos actions</p>
            <h4>Ce que nous faisons</h4>
            <ul>
              {actionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="f-kick">Navigation</p>
            <h4>Le site</h4>
            <ul>
              {siteLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="f-kick">Contact</p>
            <h4>Nous joindre</h4>
            <ul className="foot-contact">
              <li>
                <Icon name="pin" size={16} />
                <span>{site.location}</span>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${site.phone2Href}`}>{site.phone2}</a>
              </li>
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
            <div className="foot-om">
              <span>Orange Money</span>
              <strong>{site.orangeMoney}</strong>
            </div>
            <div className="f-social">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook — ONG VPFA"
              >
                <Icon name="facebook" size={18} />
              </a>
              <a
                href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp — ONG VPFA"
              >
                <Icon name="whatsapp" size={18} />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Envoyer un e-mail à l'ONG VPFA">
                <Icon name="mail" size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="wrap foot-bottom-in">
            <span>
              © {site.founded} {site.name} — {site.fullName}. Tous droits réservés.
            </span>
            <span className="foot-links">
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/mentions-legales#confidentialite">Confidentialité</Link>
              <Link href="/credits">Crédits photo</Link>
              <a href="#top" className="to-top">
                Retour en haut de page
                <Icon name="arrow-up-right" size={14} />
              </a>
            </span>
          </div>
        </div>
      </footer>

      <a
        className="fab"
        href={`https://wa.me/${site.phoneHref.replace("+", "")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="whatsapp" size={22} />
        <span className="fab-txt">Nous contacter</span>
      </a>
    </>
  );
}
