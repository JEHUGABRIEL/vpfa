import { photoCredits } from "@/lib/credits";

export type ImageOption = { src: string; label: string };

/** Photos shipped with the site (public/images), always available. */
export const builtInImages: ImageOption[] = photoCredits.map((photo) => ({
  src: photo.file,
  label: photo.alt,
}));

export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;

const signatures: { mime: string; test: (bytes: Uint8Array) => boolean }[] = [
  { mime: "image/jpeg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    mime: "image/png",
    test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    mime: "image/webp",
    test: (b) =>
      String.fromCharCode(...b.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...b.slice(8, 12)) === "WEBP",
  },
];

/** Trusts the file bytes, not the browser-provided type. */
export function detectImageType(bytes: Uint8Array) {
  return signatures.find((signature) => signature.test(bytes))?.mime ?? null;
}
