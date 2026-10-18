"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

const slides = [
  {
    kicker: "Autonomisation des femmes",
    light: "Donner aux femmes",
    strong: "les moyens d'agir.",
    text: "À Bangui et en République centrafricaine, l'ONG VPFA forme, accompagne et fait entendre la voix des femmes et des jeunes filles.",
    cta: "Découvrir nos actions",
    href: "/nos-actions",
    image: "/images/hero.webp",
    alt: "Portrait d'une femme centrafricaine",
    position: "center 26%",
  },
  {
    kicker: "Formations professionnelles",
    light: "Apprendre un métier,",
    strong: "créer son activité.",
    text: "Saponification, perlage, gestion et leadership : des formations pratiques pour transformer un savoir-faire en source de revenus.",
    cta: "Voir les formations",
    href: "/formations",
    image: "/images/savonnerie.webp",
    alt: "Atelier de fabrication de savon",
    position: "center",
  },
  {
    kicker: "Inclusion & dignité",
    light: "Filles d'aujourd'hui,",
    strong: "leaders de demain.",
    text: "Éducation, protection et inclusion des communautés : nous construisons avec les femmes, les jeunes et les peuples autochtones Aka.",
    cta: "Découvrir notre mission",
    href: "/a-propos",
    image: "/images/femmes-paoua.webp",
    alt: "Femmes réunies lors d'une rencontre communautaire",
    position: "center",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (paused || stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, stopped]);

  return (
    <section
      className="hero"
      aria-roledescription="carrousel"
      aria-label="Présentation de l'ONG VPFA"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-dots" aria-hidden="true" />

      {slides.map((slide, slideIndex) => {
        const active = slideIndex === index;
        return (
          <div
            className={`hslide${active ? " on" : ""}`}
            key={slide.href}
            aria-hidden={!active}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${slideIndex + 1} sur ${slides.length}`}
          >
            <div className="hero-left">
              <div className="hero-card">
                <p className="kicker light">{slide.kicker}</p>
                <h1>
                  <span className="lt">{slide.light}</span>{" "}
                  <span className="hd">{slide.strong}</span>
                </h1>
                <p className="hero-txt">{slide.text}</p>
                <Link href={slide.href} className="btn btn-sky" tabIndex={active ? 0 : -1}>
                  {slide.cta}
                  <Icon name="arrow-right" size={17} />
                </Link>
              </div>
            </div>
            <div className="hero-right">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="(max-width: 980px) 100vw, 54vw"
                style={{ objectPosition: slide.position }}
                className="cover"
              />
            </div>
          </div>
        );
      })}

      <div className="dots" role="group" aria-label="Choisir une diapositive">
        <button
          type="button"
          className="dots-toggle"
          aria-label={stopped ? "Reprendre le défilement" : "Mettre en pause le défilement"}
          onClick={() => setStopped((value) => !value)}
        >
          <Icon name={stopped ? "play" : "pause"} size={12} />
        </button>
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.href}
            type="button"
            className={slideIndex === index ? "on" : undefined}
            aria-label={`Afficher : ${slide.kicker}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
