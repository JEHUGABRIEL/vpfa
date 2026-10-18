import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { getImageOptions } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/session";
import { PostForm } from "../../../_components/PostForm";

export const metadata: Metadata = { title: "Modifier un article" };

export default async function EditPostPage({ params }: PageProps<"/admin/actualites/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();

  const [[post], imageOptions] = await Promise.all([
    db.select().from(posts).where(eq(posts.id, id)).limit(1),
    getImageOptions(),
  ]);
  if (!post) notFound();

  return (
    <>
      <div className="adm-head">
        <div>
          <p className="adm-crumb">
            <Link href="/admin/actualites">Actualités</Link>
          </p>
          <h1>{post.title}</h1>
        </div>
        {post.published ? (
          <Link href={`/actualites/${post.slug}`} target="_blank" className="adm-btn adm-btn-ghost">
            <Icon name="external" size={16} />
            Voir sur le site
          </Link>
        ) : null}
      </div>
      <PostForm post={post} imageOptions={imageOptions} today={post.publishedAt} />
    </>
  );
}
