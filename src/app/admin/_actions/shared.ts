import { z } from "zod";

export const imageField = z
  .string()
  .trim()
  .regex(
    /^\/(images\/[\w.-]+|media\/[0-9a-f-]{36})$/i,
    "Choisissez une image dans la médiathèque.",
  );

export const requiredText = (max: number, label: string) =>
  z.string().trim().min(1, `${label} est obligatoire.`).max(max, `${label} est trop long.`);

export const optionalText = (max: number) => z.string().trim().max(max, "Texte trop long.");

export const idField = z.coerce.number().int().positive();

export const checkbox = z.preprocess((value) => value === "on" || value === "true", z.boolean());
