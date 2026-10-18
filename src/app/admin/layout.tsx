import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: {
    default: "Back-office",
    template: "%s | Back-office VPFA",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
