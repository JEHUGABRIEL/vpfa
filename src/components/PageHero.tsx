import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href: string };

type PageHeroProps = {
  current: string;
  parents?: Crumb[];
  title: ReactNode;
  intro?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
};

export function PageHero({
  current,
  parents = [],
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: PageHeroProps) {
  return (
    <section className="hero page-hero">
      <div className="hero-dots" aria-hidden="true" />
      <div className="hero-left">
        <div className="hero-card">
          <nav className="kicker light crumbs" aria-label="Fil d'Ariane">
            {[{ label: "Accueil", href: "/" }, ...parents].map((crumb) => (
              <span key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
                <span className="sep" aria-hidden="true">
                  /
                </span>
              </span>
            ))}
            <span aria-current="page">{current}</span>
          </nav>
          <h1>{title}</h1>
          {intro ? <p className="hero-txt">{intro}</p> : null}
          {children}
        </div>
      </div>
      {image ? (
        <div className="hero-right">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 54vw"
            className="cover"
          />
        </div>
      ) : null}
    </section>
  );
}
