import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

// Rendered inside the (site) layout, which already provides header and footer.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
