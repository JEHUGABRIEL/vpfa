import Link from "next/link";
import { Icon } from "@/components/Icon";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBand({
  eyebrow = "Ensemble, nous pouvons",
  title = "Votre soutien ouvre de nouvelles portes.",
  text = "Devenez partenaire, bénévole ou soutenez une formation. Chaque geste compte pour construire un avenir plus juste et plus inclusif.",
  primaryLabel = "Soutenir nos actions",
  primaryHref = "/soutenir",
  secondaryLabel = "Nous écrire",
  secondaryHref = "/#contact",
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div className="cta-copy">
          <p className="f-kick">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link href={primaryHref} className="btn btn-light">
            {primaryLabel}
            <Icon name="arrow-right" size={20} />
          </Link>
          <Link href={secondaryHref} className="btn btn-ghost">
            {secondaryLabel}
            <Icon name="mail" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
