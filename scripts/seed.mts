import { count } from "drizzle-orm";
import { db, schema } from "./db.mts";
import { featuredPartners, formations, otherPartners, posts } from "./seed-data.mts";

async function isEmpty(table: typeof schema.formations | typeof schema.posts | typeof schema.partners) {
  const [row] = await db.select({ value: count() }).from(table);
  return row.value === 0;
}

if (await isEmpty(schema.formations)) {
  await db.insert(schema.formations).values(
    formations.map((formation, index) => ({
      slug: formation.slug,
      title: formation.title,
      kicker: formation.kicker,
      price: formation.price,
      description: formation.description,
      image: formation.image,
      imageAlt: formation.alt,
      program: [...formation.program],
      benefits: [...formation.benefits],
      note: formation.note,
      sortOrder: index,
    })),
  );
  console.log(`Formations : ${formations.length} ajoutées.`);
} else {
  console.log("Formations : déjà présentes, rien à faire.");
}

if (await isEmpty(schema.posts)) {
  await db.insert(schema.posts).values(
    posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      imageAlt: post.alt,
      quote: post.quote ?? "",
      body: post.body.join("\n\n"),
      meta: post.meta ?? [],
      publishedAt: post.isoDate,
    })),
  );
  console.log(`Actualités : ${posts.length} ajoutées.`);
} else {
  console.log("Actualités : déjà présentes, rien à faire.");
}

if (await isEmpty(schema.partners)) {
  await db.insert(schema.partners).values([
    ...featuredPartners.map((partner, index) => ({
      short: partner.short,
      name: partner.name,
      type: partner.type,
      featured: true,
      sortOrder: index,
    })),
    ...otherPartners.map((name, index) => ({
      name,
      sortOrder: featuredPartners.length + index,
    })),
  ]);
  console.log(`Partenaires : ${featuredPartners.length + otherPartners.length} ajoutés.`);
} else {
  console.log("Partenaires : déjà présents, rien à faire.");
}
