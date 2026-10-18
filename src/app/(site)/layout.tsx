import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";

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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
