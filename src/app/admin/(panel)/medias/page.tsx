import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { formations, media, posts } from "@/db/schema";
import { builtInImages } from "@/lib/admin/images";
import { requireAdmin } from "@/lib/auth/session";
import { deleteMedia } from "../../_actions/media";
import { ConfirmSubmit } from "../../_components/buttons";
import { MediaUpload } from "../../_components/MediaUpload";

export const metadata: Metadata = { title: "Médiathèque" };

function formatSize(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} Mo`
    : `${Math.round(bytes / 1024)} Ko`;
}

export default async function MediaPage() {
  await requireAdmin();
  const [uploads, formationImages, postImages] = await Promise.all([
    db
      .select({ id: media.id, filename: media.filename, size: media.size, createdAt: media.createdAt })
      .from(media)
      .orderBy(desc(media.createdAt)),
    db.select({ image: formations.image }).from(formations),
    db.select({ image: posts.image }).from(posts),
  ]);
  const used = new Set([...formationImages, ...postImages].map((row) => row.image));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Médiathèque</h1>
          <p>Les images téléversées ici sont disponibles dans les formulaires Formations et Actualités.</p>
        </div>
      </div>

      <section className="adm-card">
        <h2>Ajouter une image</h2>
        <MediaUpload />
        <p className="adm-hint" style={{ marginTop: "0.6rem" }}>
          JPEG, PNG ou WebP, 3 Mo maximum. Privilégiez des photos de vos propres activités.
        </p>
      </section>

      <section className="adm-card">
        <h2>Images téléversées ({uploads.length})</h2>
        {uploads.length === 0 ? (
          <p className="adm-empty">
            <strong>Aucune image pour l&apos;instant</strong>
            Les photos de vos ateliers et événements apparaîtront ici.
          </p>
        ) : (
          <div className="adm-media-grid">
            {uploads.map((upload) => {
              const src = `/media/${upload.id}`;
              const inUse = used.has(src);
              return (
                <figure className="adm-media" key={upload.id}>
                  <Image src={src} alt={upload.filename} width={360} height={270} />
                  <figcaption className="adm-media-body">
                    <strong>{upload.filename}</strong>
                    <span>{formatSize(upload.size)}</span>
                    {inUse ? (
                      <span className="adm-badge adm-badge-on">Utilisée sur le site</span>
                    ) : (
                      <form action={deleteMedia}>
                        <input type="hidden" name="id" value={upload.id} />
                        <ConfirmSubmit>
                          <Icon name="trash" size={16} />
                          Supprimer
                        </ConfirmSubmit>
                      </form>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>

      <section className="adm-card">
        <h2>Photos d&apos;illustration du site ({builtInImages.length})</h2>
        <p className="adm-hint" style={{ marginBottom: "1rem" }}>
          Photos Wikimedia Commons livrées avec le site (crédits sur la page Crédits photo).
        </p>
        <div className="adm-media-grid">
          {builtInImages.map((image) => (
            <figure className="adm-media" key={image.src}>
              <Image src={image.src} alt={image.label} width={360} height={270} />
              <figcaption className="adm-media-body">
                <span>{image.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
