// Données de départ, insérées une seule fois par `npm run db:seed`.
// Ensuite, le contenu se gère dans le backoffice (/admin).

export const formations = [
  {
    slug: "saponification",
    title: "Saponification & détergent liquide",
    kicker: "Artisanat & autonomie",
    price: "15 000 FCFA",
    description:
      "Apprenez un métier concret et durable : fabriquez vos savons et détergents, puis construisez votre activité.",
    image: "/images/savonnerie.webp",
    alt: "Atelier de saponification",
    program: [
      "Savon de toilette",
      "Savon de lessive",
      "Savon liquide et détergent",
      "Entrepreneuriat féminin",
      "Marketing et commerce",
      "Leadership féminin",
    ],
    benefits: [
      "Acquérir un savoir-faire pratique",
      "Lancer une activité génératrice de revenus",
      "Renforcer votre autonomie financière",
    ],
    note: "Places limitées - inscrivez-vous dès maintenant.",
  },
  {
    slug: "perlage",
    title: "Perlage & création d'accessoires",
    kicker: "Créativité & entrepreneuriat",
    price: "20 000 FCFA",
    description:
      "Transformez votre créativité en source de revenus grâce à la fabrication de sacs, boîtes et accessoires faits main.",
    image: "/images/artisanat.webp",
    alt: "Femme confectionnant des accessoires artisanaux",
    program: [
      "Fabrication de sacs à main",
      "Confection de boîtes à mouchoirs",
      "Création d'accessoires décoratifs",
      "Positionnement de vos produits",
      "Gestion d'une petite activité",
      "Confiance et leadership",
    ],
    benefits: [
      "Maîtriser un savoir-faire artisanal",
      "Créer des produits prêts à être vendus",
      "Développer votre réseau de clientes",
    ],
    note: "Inscriptions ouvertes - contactez-nous pour la prochaine session.",
  },
] as const;

export type Post = {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  quote?: string;
  body: string[];
  meta?: { label: string; value: string }[];
};

export const posts: Post[] = [
  {
    slug: "journee-internationale-de-la-jeune-fille-2026",
    title: "Filles d'aujourd'hui, leaders de demain",
    date: "12 octobre 2026",
    isoDate: "2026-10-12",
    category: "Éducation & leadership",
    excerpt:
      "À l'occasion de la Journée internationale de la jeune fille, l'ONG VPFA réaffirme son engagement pour l'éducation, la formation et l'autonomisation des jeunes filles.",
    image: "/images/ecole-fille.webp",
    alt: "Jeune fille en uniforme scolaire en Afrique",
    quote: "Croyez en vous ! Votre voix compte !",
    body: [
      "En cette journée spéciale, l'ONG VPFA rend hommage à toutes les jeunes filles qui rêvent, qui se battent, qui osent et qui construisent déjà un meilleur avenir.",
      "Chaque fille a le droit d'aller à l'école, de se former, de s'exprimer, de choisir son avenir et de réaliser ses ambitions. Ces droits ne sont pas des privilèges : ils sont la base d'une société plus juste.",
      "Étudiez, formez-vous, entreprenez et osez prendre votre place. Ne laissez ni les difficultés ni les préjugés briser vos rêves.",
      "Votre avenir commence aujourd'hui : préparez-vous et passez à l'action !",
    ],
  },
  {
    slug: "journee-mondiale-de-l-alimentation-2026",
    title: "Une alimentation saine, une meilleure nutrition pour tous",
    date: "16 octobre 2026",
    isoDate: "2026-10-16",
    category: "Sécurité alimentaire",
    excerpt:
      "Droit à l'alimentation pour une vie meilleure et un avenir durable : l'ONG VPFA célèbre les richesses agricoles centrafricaines et les femmes qui les font vivre.",
    image: "/images/agriculture.webp",
    alt: "Femmes travaillant des produits agricoles",
    quote: "Ensemble pour une sécurité alimentaire et un développement durable en RCA !",
    body: [
      "À l'occasion de la Journée mondiale de l'alimentation, célébrons nos richesses agricoles et encourageons la consommation des produits locaux.",
      "Le manioc, l'igname, le maïs et le riz sont des richesses de notre terre, source de vie et de développement pour nos communautés.",
      "L'ONG VPFA adresse ses encouragements à toutes les femmes agricultrices et transformatrices de produits agricoles qui travaillent chaque jour pour nourrir leurs familles et contribuer au développement de la République centrafricaine.",
      "Soutenons nos producteurs locaux, valorisons nos ressources et agissons pour une sécurité alimentaire durable en RCA !",
    ],
    meta: [
      { label: "Thème 2026", value: "Droit à l'alimentation pour une vie meilleure et un avenir durable" },
      { label: "Produits valorisés", value: "Manioc, igname, maïs, riz" },
    ],
  },
  {
    slug: "journee-internationale-des-peuples-autochtones-2026",
    title: "Célébrer les peuples autochtones Aka",
    date: "9 août 2026",
    isoDate: "2026-08-09",
    category: "Inclusion & droits",
    excerpt:
      "L'ONG VPFA a célébré la Journée internationale des peuples autochtones à Kpékéto, dans la commune de Pissa, préfecture de la Lobaye.",
    image: "/images/femmes-paoua.webp",
    alt: "Rencontre communautaire en République centrafricaine",
    quote: "Protégeons nos cultures, valorisons nos traditions !",
    body: [
      "Ensemble, bâtissons un avenir inclusif et durable pour les peuples autochtones Aka !",
      "À l'occasion de cette journée mondiale, l'ONG VPFA a organisé une grande journée de célébration, de partage et de plaidoyer autour du thème : « Promouvoir les droits, la dignité, la culture et l'inclusion des peuples autochtones Aka pour un développement durable ».",
      "Au programme : sensibilisation aux droits des peuples autochtones, prestations culturelles Aka (danses, chants, contes, savoir-faire traditionnel), initiation à la digitalisation pour renforcer les capacités des jeunes et des femmes Aka, échanges sur la culture et l'inclusion, engagements des autorités et adoption des recommandations.",
      "Protégeons nos cultures, valorisons nos traditions !",
    ],
    meta: [
      { label: "Date", value: "9 août 2026" },
      { label: "Lieu", value: "Village de Kpékéto, commune de Pissa, préfecture de la Lobaye" },
      { label: "Bénéficiaires", value: "Peuples autochtones Aka et communautés locales" },
      { label: "Contacts", value: "+236 72 94 93 43 / +236 75 01 01 30" },
    ],
  },
];

export const featuredPartners = [
  {
    short: "MINUSCA",
    name: "Mission multidimensionnelle intégrée des Nations Unies pour la stabilisation en RCA",
    type: "Institution internationale",
  },
  {
    short: "ONU Femmes",
    name: "Entité des Nations Unies pour l'égalité des sexes et l'autonomisation des femmes",
    type: "Institution internationale",
  },
  {
    short: "WHF",
    name: "Women Humanitarian Fund",
    type: "Fonds humanitaire",
  },
  {
    short: "France",
    name: "Ambassade de France en République centrafricaine",
    type: "Coopération diplomatique",
  },
  {
    short: "MIN ENUM",
    name: "Ministère de l'Économie Numérique, des Postes et Télécommunications",
    type: "Institution nationale",
  },
  {
    short: "MIN ACT",
    name: "Ministère des Arts, de la Culture et du Tourisme",
    type: "Institution nationale",
  },
  {
    short: "LDCAJ",
    name: "Ligue Dynamique Centrafricaine des Jeunes",
    type: "Société civile",
  },
  {
    short: "ADORA",
    name: "ADORA - Égalité et Inclusion",
    type: "Société civile",
  },
] as const;

export const otherPartners = [
  "Backson Shooting Studio",
  "Zaras Global Business",
  "Koussala Technologies",
  "Élégance Invest",
  "POLAGLOS",
  "Femme Action Le mag",
  "Skaly & Partners",
  "Invest in Bangui",
  "P.C.S - BTP",
  "LBTP-AGI-CG",
  "Mine Du Proprio",
  "L'Étoile Du Drapeau",
] as const;
