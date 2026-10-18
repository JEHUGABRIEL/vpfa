import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { formatDate, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualités",
  alternates: { canonical: "/actualites" },
  description:
    "Suivez les actualités de l'ONG VPFA : journées internationales, formations, actions communautaires et engagements pour les femmes en Centrafrique.",
};

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        current="Actualités"
        title={
          <>
            Nos rendez-vous <em>avec les communautés.</em>
          </>
        }
        intro="Journées internationales, formations, rencontres de terrain : retrouvez les temps forts de la vie de l'ONG VPFA."
        image="/images/ecole-fille.webp"
        imageAlt="Jeune fille en uniforme scolaire en Afrique"
      />

      <section className="section wrap">
        <div className="news-layout">
          <div>
            <SectionHeading
              kicker="Actualités"
              title={
                <>
                  <span className="lt">Nos dernières</span>{" "}
                  <span className="hd">nouvelles.</span>
                </>
              }
            />

            <div className="post-list">
              {posts.map((post) => (
                <article className="post-row" key={post.id}>
                  <Link
                    href={`/actualites/${post.slug}`}
                    className="post-media"
                    aria-label={`Lire l'article : ${post.title}`}
                  >
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      width={1024}
                      height={704}
                      sizes="(max-width: 980px) 92vw, 46vw"
                    />
                  </Link>
                  <div className="post-body">
                    <p className="kicker">{post.category}</p>
                    <p className="post-date">
                      <Icon name="calendar" size={16} />
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </p>
                    <h2>
                      <Link href={`/actualites/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    <Link href={`/actualites/${post.slug}`} className="line-more">
                      Lire la suite
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside>
            <div className="aside-box">
              <h4>Le journal de l&apos;ONG</h4>
              <p>
                Les temps forts de nos actions auprès des femmes, des jeunes filles
                et des communautés de Bangui et de la Lobaye.
              </p>
            </div>
            <h3 className="side-h">À découvrir</h3>
            <div className="aside-box">
              <ul>
                <li>
                  <Link href="/formations">Nos formations professionnelles</Link>
                </li>
                <li>
                  <Link href="/nos-actions">Nos programmes sur le terrain</Link>
                </li>
              </ul>
            </div>
            <div className="aside-box brand">
              <h4>Faire vivre nos actions</h4>
              <p>
                Partagez nos publications, invitez une amie à se former ou soutenez
                un programme : votre voix compte.
              </p>
              <Link href="/soutenir" className="btn">
                Nous soutenir
                <Icon name="heart" size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Faire vivre nos actions"
        title="Une actualité peut changer une trajectoire."
        text="Partagez nos publications autour de vous, invitez une amie à se former ou soutenez un programme : votre voix compte."
        primaryLabel="Soutenir nos actions"
        primaryHref="/soutenir"
        secondaryLabel="Nous contacter"
        secondaryHref="/#contact"
      />
    </>
  );
}
