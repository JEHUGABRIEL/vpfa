"use client";

import Link from "next/link";
import type { Post } from "@/db/schema";
import { idleState } from "@/lib/admin/form";
import { useActionForm } from "@/lib/use-action-form";
import type { ImageOption } from "@/lib/admin/images";
import { savePost } from "../_actions/posts";
import { FormAlert } from "./Alerts";
import { SubmitButton } from "./buttons";
import { describedBy, Field } from "./Field";
import { ImagePicker } from "./ImagePicker";

export function PostForm({
  post,
  imageOptions,
  today,
}: {
  post?: Post;
  imageOptions: ImageOption[];
  today: string;
}) {
  const { state, onSubmit, pending } = useActionForm(savePost, idleState);
  const errors = state.fieldErrors ?? {};

  const text = (
    name: "title" | "category" | "slug" | "quote" | "imageAlt",
    label: string,
    options: { hint?: string; required?: boolean; maxLength?: number; placeholder?: string } = {},
  ) => (
    <Field id={name} label={label} hint={options.hint} error={errors[name]}>
      <input
        id={name}
        name={name}
        className="adm-input"
        defaultValue={post?.[name] ?? ""}
        required={options.required}
        maxLength={options.maxLength}
        placeholder={options.placeholder}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={describedBy(name, options.hint, errors[name])}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} className="adm-form">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <FormAlert state={state} />

      <div className="adm-form-grid">
        <div>
          <section className="adm-card">
            <h2>Article</h2>
            <div className="adm-form">
              {text("title", "Titre", { required: true, maxLength: 200 })}
              <Field
                id="excerpt"
                label="Résumé"
                hint="Deux phrases maximum. Affiché dans les listes et sur les réseaux sociaux."
                error={errors.excerpt}
              >
                <textarea
                  id="excerpt"
                  name="excerpt"
                  className="adm-input"
                  rows={3}
                  maxLength={400}
                  required
                  defaultValue={post?.excerpt}
                  aria-invalid={errors.excerpt ? true : undefined}
                  aria-describedby={describedBy("excerpt", true, errors.excerpt)}
                />
              </Field>
              <Field
                id="body"
                label="Texte"
                hint="Laissez une ligne vide entre deux paragraphes."
                error={errors.body}
              >
                <textarea
                  id="body"
                  name="body"
                  className="adm-input"
                  rows={14}
                  required
                  defaultValue={post?.body}
                  aria-invalid={errors.body ? true : undefined}
                  aria-describedby={describedBy("body", true, errors.body)}
                />
              </Field>
              {text("quote", "Citation mise en avant", { maxLength: 300 })}
              <Field
                id="meta"
                label="Informations pratiques"
                hint="Une information par ligne, au format « Libellé : valeur ». Exemple : Lieu : Bangui"
              >
                <textarea
                  id="meta"
                  name="meta"
                  className="adm-input"
                  rows={4}
                  defaultValue={post?.meta.map((item) => `${item.label} : ${item.value}`).join("\n")}
                  aria-describedby="meta-hint"
                />
              </Field>
            </div>
          </section>
        </div>

        <div>
          <section className="adm-card">
            <h2>Publication</h2>
            <div className="adm-form">
              <label className="adm-check">
                <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
                <span>
                  En ligne
                  <small>Décochez pour garder l&apos;article en brouillon.</small>
                </span>
              </label>
              <Field id="publishedAt" label="Date de publication" error={errors.publishedAt}>
                <input
                  id="publishedAt"
                  name="publishedAt"
                  type="date"
                  className="adm-input"
                  required
                  defaultValue={post?.publishedAt ?? today}
                />
              </Field>
              {text("category", "Catégorie", {
                required: true,
                maxLength: 80,
                placeholder: "Éducation & leadership",
              })}
              {text("slug", "Adresse (slug)", {
                maxLength: 80,
                hint: "Générée depuis le titre si vide. La changer casse les liens déjà partagés.",
              })}
              <div className="adm-form-foot">
                <SubmitButton pending={pending}>{post ? "Enregistrer" : "Publier l'article"}</SubmitButton>
                <Link href="/admin/actualites" className="adm-btn adm-btn-ghost">
                  Annuler
                </Link>
              </div>
            </div>
          </section>

          <section className="adm-card">
            <div className="adm-form">
              <ImagePicker
                name="image"
                defaultValue={post?.image}
                options={imageOptions}
                error={errors.image}
              />
              {text("imageAlt", "Description de l'image", {
                required: true,
                maxLength: 200,
                hint: "Lue par les lecteurs d'écran et les moteurs de recherche.",
              })}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
