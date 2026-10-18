import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <main className="adm-login">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          <span>
            <Image src="/images/logo.jpg" alt="" width={44} height={44} />
            <span>
              <strong>{site.name}</strong>
              <small>Espace d&apos;administration</small>
            </span>
          </span>
          <Link href="/" className="adm-login-back">
            Retour au site
          </Link>
        </div>
        <h1>Back-office</h1>
        <p className="adm-login-intro">
          Connectez-vous pour gérer les formations, les actualités et les demandes
          reçues.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
