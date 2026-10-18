"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { formations, site } from "@/lib/site";

export function RegistrationForm() {
  const [status, setStatus] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const phone = site.phoneHref.replace("+", "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const telephone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const formation = String(data.get("formation") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !telephone || !formation) {
      setStatus(
        "Merci de renseigner votre nom, votre téléphone et la formation choisie.",
      );
      return;
    }

    const text = [
      "Bonjour l'ONG VPFA,",
      "",
      "Je souhaite m'inscrire à une formation.",
      `Nom : ${name}`,
      `Téléphone : ${telephone}`,
      email ? `E-mail : ${email}` : "",
      `Formation : ${formation}`,
      message ? `Message : ${message}` : "",
      "",
      "Merci de me communiquer les prochaines modalités d'inscription.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    setStatus(
      "Votre demande est prête. WhatsApp va s'ouvrir pour l'envoyer à l'équipe VPFA.",
    );
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        Demander une <span className="lt">inscription</span>
      </h3>
      <p className="note">
        Les champs marqués d&apos;un astérisque (*) sont obligatoires.
      </p>
      <div className="row2">
        <label>
          Nom complet *
          <input
            name="name"
            type="text"
            placeholder="Votre nom et prénom"
            autoComplete="name"
            required
          />
        </label>
        <label>
          Téléphone *
          <input
            name="phone"
            type="tel"
            placeholder="+236 ..."
            autoComplete="tel"
            required
          />
        </label>
      </div>
      <div className="row2">
        <label>
          E-mail (facultatif)
          <input
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            autoComplete="email"
          />
        </label>
        <label>
          Formation choisie *
          <select name="formation" required defaultValue="">
            <option value="" disabled>
              Sélectionner une formation
            </option>
            {formations.map((formation) => (
              <option
                value={`${formation.title} — ${formation.price}`}
                key={formation.slug}
              >
                {formation.title} · {formation.price}
              </option>
            ))}
            <option value="Je souhaite être informé·e des prochaines sessions">
              Je souhaite être informé·e des prochaines sessions
            </option>
          </select>
        </label>
      </div>
      <label>
        Votre message (facultatif)
        <textarea
          name="message"
          rows={4}
          placeholder="Votre disponibilité, une question…"
        />
      </label>
      <button type="submit" className="btn btn-brand">
        Préparer ma demande
        <Icon name="whatsapp" size={17} />
      </button>
      <p className="note form-privacy">
        Vos informations servent uniquement à traiter votre demande et ne sont pas
        enregistrées sur ce site.{" "}
        <Link href="/mentions-legales#confidentialite">En savoir plus</Link>
      </p>
      {status ? (
        <p className="ok" role="status" aria-live="polite">
          {status}{" "}
          {waUrl ? (
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              Ouvrir WhatsApp
            </a>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
