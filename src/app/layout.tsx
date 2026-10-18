import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "ONG VPFA",
    "PVWA",
    "femmes Centrafrique",
    "autonomisation des femmes",
    "Bangui",
    "République centrafricaine",
    "formation saponification",
    "formation perlage",
    "entrepreneuriat féminin",
    "peuples autochtones Aka",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.fullName}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.fullName}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b3b2b",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: [site.fullName, site.englishName, site.acronym],
  url: site.url,
  logo: `${site.url}/images/logo.jpg`,
  description: site.description,
  foundingDate: site.founded,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangui",
    addressCountry: "CF",
  },
  sameAs: [site.facebook],
  areaServed: "République centrafricaine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body id="top">
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
