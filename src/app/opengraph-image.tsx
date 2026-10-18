import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} - ${site.fullName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/images/logo.jpg"));
const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          background: "linear-gradient(135deg, #0d4732 0%, #1f7a54 100%)",
          color: "#fff",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={260}
          height={260}
          style={{ borderRadius: 32, border: "8px solid rgba(255,255,255,0.9)" }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 24, color: "#b7e3ca", letterSpacing: 1.5 }}>
            {site.tagline.toUpperCase()}
          </div>
          <div style={{ fontSize: 88, fontWeight: 700, marginTop: 12 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 42, lineHeight: 1.25, marginTop: 8 }}>
            {site.fullName}
          </div>
          <div style={{ fontSize: 28, marginTop: 28, color: "#d8efe2" }}>
            {site.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
