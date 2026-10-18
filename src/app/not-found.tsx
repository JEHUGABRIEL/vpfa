import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

// Unknown URLs render here, under the root layout only: the (site) header and
// footer are not present, so this page adds them. notFound() calls from site
// pages use (site)/not-found.tsx instead, which must not add them again.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenu">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </>
  );
}
