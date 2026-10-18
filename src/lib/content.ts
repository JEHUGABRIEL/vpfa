import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { formations, partners, posts, testimonials } from "@/db/schema";

/** Cache tags invalidated by the back office after each change. */
export const tags = {
  formations: "formations",
  posts: "posts",
  partners: "partners",
  testimonials: "testimonials",
} as const;

export async function getFormations() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.formations);
  return db
    .select()
    .from(formations)
    .where(eq(formations.published, true))
    .orderBy(asc(formations.sortOrder), asc(formations.id));
}

export async function getPosts() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.posts);
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt), desc(posts.id));
}

export async function getPost(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(tags.posts);
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .limit(1);
  return post ?? null;
}

export async function getPartners() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.partners);
  return db
    .select()
    .from(partners)
    .where(eq(partners.published, true))
    .orderBy(asc(partners.sortOrder), asc(partners.id));
}

export async function getTestimonials() {
  "use cache";
  cacheLife("days");
  cacheTag(tags.testimonials);
  return db
    .select({ id: testimonials.id, name: testimonials.name, role: testimonials.role, message: testimonials.message })
    .from(testimonials)
    .where(eq(testimonials.approved, true))
    .orderBy(desc(testimonials.createdAt))
    .limit(6);
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-16" -> "16 octobre 2026" */
export function formatDate(isoDate: string) {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Splits the stored body into paragraphs (blank-line separated). */
export function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
