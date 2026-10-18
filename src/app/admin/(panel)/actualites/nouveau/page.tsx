import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { getImageOptions } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/session";
import { PostForm } from "../../../_components/PostForm";

export const metadata: Metadata = { title: "Nouvel article" };

export default async function NewPostPage() {
  await requireAdmin();
  await connection();
  const imageOptions = await getImageOptions();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="adm-head">
        <div>
          <p className="adm-crumb">
            <Link href="/admin/actualites">Actualités</Link>
          </p>
          <h1>Nouvel article</h1>
        </div>
      </div>
      <PostForm imageOptions={imageOptions} today={today} />
    </>
  );
}
