# Site officiel de l'ONG VPFA

Site vitrine professionnel de l'ONG **VPFA — Vision Positive pour les Femmes en Afrique** (PVWA), basée à Bangui, en République centrafricaine.

Le site présente l'organisation, ses actions, ses deux formations professionnelles (saponification et perlage), ses partenaires, ses actualités et ses moyens de contact. La structure et le langage visuel s'inspirent du site de référence indiqué par le client, adaptés à la palette verte de l'ONG.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19**
- **Tailwind CSS 4** (utilitaires + design system CSS personnalisé)
- **TypeScript**
- **next/font** avec la police Poppins auto-hébergée
- **next/image** pour l'optimisation des images

Aucun service externe n'est requis : les formulaires préparent un message WhatsApp (ou un e-mail) que l'utilisateur envoie lui-même.

## Démarrage

```bash
npm install
npm run dev
```

Le site est disponible sur <http://localhost:3000>.

```bash
npm run build   # build de production
npm start       # serveur de production
npm run lint    # ESLint
```

## Structure

```
src/app/               pages (App Router)
  page.tsx             accueil
  a-propos/            présentation, valeurs, gouvernance
  nos-actions/         programmes et bénéficiaires
  formations/          programmes, tarifs, inscription
  partenaires/         partenaires et réseau
  actualites/          journal + pages d'article dynamiques
  contact/             coordonnées, formulaire, carte, FAQ
  soutenir/            don, mécénat, bénévolat
  credits/             crédits photo et licences
src/components/        header, footer, hero, formulaires, UI
src/lib/site.ts        coordonnées et contenu éditorial
src/lib/credits.ts     crédits des photos d'illustration
public/images/         logo et visuels optimisés (WebP)
```

## Personnaliser le contenu

- **Coordonnées, liens et textes** : `src/lib/site.ts`
- **Logo** : `public/images/logo.jpg` (également utilisé pour l'icône du site)
- **Photos** : `public/images/*.webp` — pensez à mettre à jour `src/lib/credits.ts` et la page `/credits` si vous remplacez une image
- **URL publique** (SEO, sitemap) : variable d'environnement `NEXT_PUBLIC_SITE_URL`
- **Réseaux sociaux** : lien Facebook dans `src/lib/site.ts`

## Crédits

Les photographies d'illustration proviennent de Wikimedia Commons et sont utilisées sous licence Creative Commons (CC BY 2.0 et CC BY-SA 4.0). Le détail des attributions est disponible sur la page `/credits`. Ces images ne représentent pas nécessairement des activités conduites par l'ONG VPFA.
