import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConfirmDialog } from "../../_components/ConfirmDialog";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { formatDate } from "@/lib/content";
import { deletePost, togglePost } from "../../_actions/posts";
import { Flash, PublishedBadge } from "../../_components/Alerts";
import { SubmitButton } from "../../_components/buttons";

export const metadata: Metadata = { title: "Actualités" };

export default async function PostsAdminPage({ searchParams }: PageProps<"/admin/actualites">) {
  await requireAdmin();
  const { ok } = await searchParams;
  const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt), desc(posts.id));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Actualités</h1>
          <p>Les trois articles les plus récents sont mis en avant sur l&apos;accueil.</p>
        </div>
        <Link href="/admin/actualites/nouveau" className="adm-btn adm-btn-primary">
          <Icon name="plus" size={16} />
          Nouvel article
        </Link>
      </div>
      <Flash ok={ok} />

      <section className="adm-card">
        {rows.length === 0 ? (
          <p className="adm-empty">
            <strong>Aucun article</strong>
            Rédigez le premier pour alimenter la page Actualités.
          </p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="adm-sr">Image</span>
                  </th>
                  <th scope="col">Article</th>
                  <th scope="col">Date</th>
                  <th scope="col">Statut</th>
                  <th scope="col">
                    <span className="adm-sr">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Image src={row.image} alt="" width={64} height={44} className="adm-thumb" />
                    </td>
                    <td>
                      <Link href={`/admin/actualites/${row.id}`} className="adm-row-title">
                        {row.title}
                      </Link>
                      <span className="adm-row-sub">{row.category}</span>
                    </td>
                    <td>{formatDate(row.publishedAt)}</td>
                    <td>
                      <PublishedBadge published={row.published} />
                    </td>
                    <td>
                      <div className="adm-actions">
                        <Link href={`/admin/actualites/${row.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          <Icon name="edit" size={16} />
                          Modifier
                        </Link>
                        <form action={togglePost}>
                          <input type="hidden" name="id" value={row.id} />
                          <input type="hidden" name="published" value={String(!row.published)} />
                          <SubmitButton className="adm-btn adm-btn-ghost adm-btn-sm" pendingLabel="…">
                            <Icon name={row.published ? "eye-off" : "eye"} size={16} />
                            {row.published ? "Masquer" : "Publier"}
                          </SubmitButton>
                        </form>
                        <ConfirmDialog
                          action={deletePost}
                          fields={{ id: row.id }}
                          title="Supprimer définitivement ?"
                          description="Cette action est définitive et ne peut pas être annulée."
                          confirmLabel="Supprimer"
                          trigger={
                            <>
                              <Icon name="trash" size={16} />
                            <span className="adm-sr">Supprimer {row.title}</span>
                            </>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
