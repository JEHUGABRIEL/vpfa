"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

const subjects = [
  "Demande d'information",
  "Inscription à une formation",
  "Proposition de partenariat",
  "Bénévolat",
  "Presse & communication",
  "Autre demande",
];

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [waUrl, setWaUrl] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Merci de renseigner votre nom, votre e-mail et votre message.");
      return;
    }

    const text = [
      "Bonjour l'ONG VPFA,",
      "",
      `Objet : ${subject}`,
      `Nom : ${name}`,
      `E-mail : ${email}`,
      phone ? `Téléphone : ${phone}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${site.phoneHref.replace("+", "")}?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    setStatus("Votre message est prêt. WhatsApp va s'ouvrir pour l'envoyer à l'équipe.");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        Écrivez-nous <span className="lt">directement</span>
      </h3>
      <p className="note">
        Les champs marqués d&apos;un astérisque (*) sont obligatoires.
      </p>
      <div className="row2">
        <label>
          Nom complet *
          <input name="name" type="text" placeholder="Votre nom" autoComplete="name" required />
        </label>
        <label>
          Adresse e-mail *
          <input name="email" type="email" placeholder="vous@exemple.com" autoComplete="email" required />
        </label>
      </div>
      <div className="row2">
        <label>
          Téléphone
          <input name="phone" type="tel" placeholder="+236 ..." autoComplete="tel" />
        </label>
        <label>
          Votre demande
          <select name="subject" defaultValue={subjects[0]}>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Votre message *
        <textarea
          name="message"
          rows={5}
          placeholder="Décrivez votre demande en quelques lignes…"
          required
        />
      </label>
      <button type="submit" className="btn btn-brand">
        Envoyer le message
        <Icon name="arrow-right" size={17} />
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
