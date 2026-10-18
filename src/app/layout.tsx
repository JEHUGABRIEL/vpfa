import type { Metadata, Viewport } from "next";
import { Fraunces, Poppins } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.fullName}`,
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
    title: `${site.name} - ${site.fullName}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.fullName}`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${fraunces.variable}`}>
      <body id="top">{children}</body>
    </html>
  );
}
