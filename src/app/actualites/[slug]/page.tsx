import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { getPost, posts, site } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Actualité introuvable" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/actualites/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.isoDate,
      images: [{ url: post.image, alt: post.alt }],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previous = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const shareUrl = `${site.url}/actualites/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    image: `${site.url}${post.image}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.jpg` },
    },
    mainEntityOfPage: shareUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
      { "@type": "ListItem", position: 2, name: "Actualités", item: `${site.url}/actualites` },
      { "@type": "ListItem", position: 3, name: post.title, item: shareUrl },
    ],
  };

  return (
    <>
      <PageHero
        current={post.category}
        parents={[{ label: "Actualités", href: "/actualites" }]}
        title={post.title}
        intro={post.excerpt}
        image={post.image}
        imageAlt={post.alt}
      />

      <article className="section wrap article">
        <div className="art-meta">
          <span className="post-date">
            <Icon name="calendar" size={15} />
            <time dateTime={post.isoDate}>{post.date}</time>
          </span>
          <div className="share">
            <a
              className="fb"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur Facebook"
            >
              <Icon name="facebook" size={16} />
            </a>
            <a
              className="wa"
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Partager sur WhatsApp"
            >
              <Icon name="whatsapp" size={16} />
            </a>
          </div>
        </div>

        {post.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {post.quote ? (
          <div className="aside-box brand">
            <p>« {post.quote} »</p>
          </div>
        ) : null}

        {post.meta?.map((item) => (
          <p key={item.label}>
            <strong>{item.label} :</strong> {item.value}
          </p>
        ))}

        <p>
          Vous souhaitez participer à nos prochaines actions ou soutenir un
          programme ? Écrivez-nous à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> ou appelez le{" "}
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
        </p>

        <p className="kicker">Étiquettes</p>
        <div className="tags">
          <span className="tagpill">{post.category}</span>
          <span className="tagpill">ONG VPFA</span>
          <span className="tagpill">Bangui</span>
        </div>

        <div className="art-nav">
          {previous ? (
            <Link href={`/actualites/${previous.slug}`}>
              <Icon name="arrow-right" size={16} style={{ transform: "rotate(180deg)" }} />
              {previous.title}
            </Link>
          ) : (
            <Link href="/actualites">
              <Icon name="arrow-right" size={16} style={{ transform: "rotate(180deg)" }} />
              Toutes les actualités
            </Link>
          )}
          {next ? (
            <Link href={`/actualites/${next.slug}`}>
              {next.title}
              <Icon name="arrow-right" size={16} />
            </Link>
          ) : (
            <Link href="/actualites">
              Toutes les actualités
              <Icon name="arrow-right" size={16} />
            </Link>
          )}
        </div>

        <p>
          <Link href="/#contact" className="btn btn-brand">
            Parler de votre projet
            <Icon name="arrow-right" size={16} />
          </Link>
        </p>
      </article>

      <CtaBand
        eyebrow="Agir avec nous"
        title="Chaque geste compte pour aller plus loin."
        text="Soutenez nos formations, nos actions communautaires et nos programmes d'inclusion."
        primaryLabel="Soutenir nos actions"
        primaryHref="/soutenir"
        secondaryLabel="Nous contacter"
        secondaryHref="/#contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]),
        }}
      />
    </>
  );
}
