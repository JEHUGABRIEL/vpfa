"use server";

import { randomBytes } from "node:crypto";
import { and, eq, inArray } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { formations, messages, registrations, testimonials } from "@/db/schema";
import { NEXT_SESSIONS } from "@/lib/registration";
import { site } from "@/lib/site";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  whatsappUrl?: string;
};

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, label: string) =>
  text(max).min(1, `${label} est obligatoire.`);
const email = z.string().trim().toLowerCase().email("Adresse e-mail invalide.").max(200);
const optionalEmail = z.union([z.literal(""), email]);

function whatsappLink(lines: string[]) {
  const phone = site.phoneHref.replace("+", "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
}

/** Bots fill every field; humans never see this one. */
function isSpam(formData: FormData) {
  return String(formData.get("website") ?? "") !== "";
}

function firstError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Merci de vérifier le formulaire.";
}

const registrationSchema = z.object({
  name: required(120, "Le nom"),
  phone: required(40, "Le téléphone"),
  email: optionalEmail,
  formation: required(100, "La formation"),
  paymentMethod: z.enum(["orange_money", "especes"], {
    message: "Choisissez un mode de paiement.",
  }),
  message: text(2000),
});

export async function submitRegistration(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Merci, votre demande est enregistrée." };

  const parsed = registrationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: firstError(parsed.error) };
  const { formation: slug, ...data } = parsed.data;

  // Title and price come from the database, never from the browser.
  let title = "Information sur les prochaines sessions";
  let amount = "";
  if (slug !== NEXT_SESSIONS) {
    const [formation] = await db
      .select({ title: formations.title, price: formations.price })
      .from(formations)
      .where(and(eq(formations.slug, slug), eq(formations.published, true)))
      .limit(1);
    if (!formation) return { status: "error", message: "Cette formation n'est plus proposée." };
    title = formation.title;
    amount = formation.price;
  }

  const token = randomBytes(18).toString("base64url");
  try {
    const [row] = await db
      .insert(registrations)
      .values({ ...data, formation: title, amount, token })
      .returning({ id: registrations.id, createdAt: registrations.createdAt });
    const year = String(row.createdAt.getUTCFullYear()).slice(2);
    await db
      .update(registrations)
      .set({ reference: `VPFA-${year}-${String(row.id).padStart(4, "0")}` })
      .where(eq(registrations.id, row.id));
  } catch (error) {
    console.error("submitRegistration", error);
    return {
      status: "error",
      message: "L'envoi a échoué. Réessayez ou contactez-nous par WhatsApp.",
      whatsappUrl: whatsappLink([`Inscription : ${title}`, `Nom : ${data.name}`]),
    };
  }

  redirect(`/inscription/${token}`);
}

const declarationSchema = z.object({
  token: z.string().regex(/^[\w-]{20,40}$/),
  transactionId: z
    .string()
    .trim()
    .min(4, "Saisissez l'identifiant de transaction reçu par SMS.")
    .max(60, "Identifiant trop long."),
  payerPhone: required(40, "Le numéro utilisé pour payer"),
});

export async function declarePayment(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = declarationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: firstError(parsed.error) };

  const updated = await db
    .update(registrations)
    .set({
      transactionId: parsed.data.transactionId,
      payerPhone: parsed.data.payerPhone,
      paymentStatus: "declare",
      paymentDeclaredAt: new Date(),
    })
    .where(
      and(
        eq(registrations.token, parsed.data.token),
        inArray(registrations.paymentStatus, ["en_attente", "declare"]),
      ),
    )
    .returning({ id: registrations.id });

  if (updated.length === 0) {
    return { status: "error", message: "Ce dossier ne peut plus être modifié. Contactez l'équipe." };
  }
  refresh();
  return {
    status: "success",
    message: "Merci, votre paiement est déclaré. L'équipe le vérifie et confirme votre place.",
  };
}

const messageSchema = z.object({
  name: required(120, "Le nom"),
  email,
  phone: text(40),
  subject: required(120, "L'objet"),
  message: required(4000, "Le message"),
});

export async function submitMessage(_previous: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Merci, votre message est bien envoyé." };

  const parsed = messageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: firstError(parsed.error) };

  const data = parsed.data;
  try {
    await db.insert(messages).values(data);
  } catch (error) {
    console.error("submitMessage", error);
    return {
      status: "error",
      message: "L'envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.",
      whatsappUrl: whatsappLink([`Objet : ${data.subject}`, data.message]),
    };
  }

  return {
    status: "success",
    message: "Merci, votre message est bien envoyé. Nous vous répondons sous 48 h ouvrées.",
    whatsappUrl: whatsappLink([
      "Bonjour l'ONG VPFA,",
      `Je vous ai écrit depuis le site (${data.subject}).`,
      `Nom : ${data.name}`,
    ]),
  };
}

const testimonialSchema = z.object({
  name: required(80, "Le nom"),
  role: text(120),
  message: z
    .string()
    .trim()
    .min(20, "Votre témoignage est un peu court (20 caractères minimum).")
    .max(800, "Votre témoignage est trop long (800 caractères maximum)."),
  consent: z.literal("on", { message: "Merci d'accepter la publication de votre témoignage." }),
});

export async function submitTestimonial(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Merci pour votre témoignage." };

  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", message: firstError(parsed.error) };

  const { name, role, message } = parsed.data;
  try {
    await db.insert(testimonials).values({ name, role, message });
  } catch (error) {
    console.error("submitTestimonial", error);
    return { status: "error", message: "L'envoi a échoué. Réessayez dans un instant." };
  }
  return {
    status: "success",
    message: "Merci pour votre témoignage. Il sera publié après relecture par l'équipe.",
  };
}
