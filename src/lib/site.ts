export const site = {
  name: "ONG VPFA",
  shortName: "VPFA",
  fullName: "Vision Positive pour les Femmes en Afrique",
  englishName: "Positive Vision for Women in Africa",
  acronym: "PVWA",
  tagline: "Protection • Inclusion • Développement",
  description:
    "L'ONG VPFA est une organisation centrafricaine basée à Bangui, engagée pour l'autonomisation des femmes et des jeunes filles, l'inclusion des communautés et un développement durable.",
  phone: "+236 72 94 93 43",
  phone2: "+236 75 01 01 30",
  phoneHref: "+23672949343",
  phone2Href: "+23675010130",
  email: "ovpfa2024@gmail.com",
  location: "Bangui, République centrafricaine",
  facebook: "https://www.facebook.com/profile.php?id=61573179157855",
  orangeMoney: "+236 72 94 93 43",
  founded: "2024",
  president: "Élodie Francine Moussa",
  presidentRole:
    "Présidente du Conseil d'administration, conseillère municipale de Bangui",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ong-vpfa.vercel.app",
  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
} as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Nos actions", href: "/nos-actions" },
  { label: "Formations", href: "/formations" },
  { label: "Actualités", href: "/actualites" },
] as const;

export const stats = [
  { value: "2024", label: "Année de création", detail: "à Bangui" },
  { value: "20+", label: "Partenaires mobilisés", detail: "institutions & société civile" },
  { value: "2", label: "Formations professionnelles", detail: "saponification & perlage" },
  { value: "3", label: "Piliers d'action", detail: "protection, inclusion, développement" },
] as const;

export const pillars = [
  {
    number: "01",
    title: "Protection",
    subtitle: "Droits, dignité et sécurité",
    description:
      "Nous sensibilisons les communautés, soutenons les personnes vulnérables et portons leur voix auprès des autorités.",
    points: ["Droits des femmes et des filles", "Protection de l'enfance", "Plaidoyer communautaire"],
    icon: "shield" as const,
  },
  {
    number: "02",
    title: "Inclusion",
    subtitle: "Une place pour chacune",
    description:
      "Nous travaillons pour que chaque femme, chaque jeune fille et chaque communauté trouve sa place dans la société.",
    points: ["Peuples autochtones Aka", "Égalité et non-discrimination", "Femmes rurales"],
    icon: "users" as const,
  },
  {
    number: "03",
    title: "Développement",
    subtitle: "Des compétences, des revenus",
    description:
      "Nous renforçons les capacités des femmes par la formation, l'entrepreneuriat et la valorisation des ressources locales.",
    points: ["Formations professionnelles", "Entrepreneuriat féminin", "Sécurité alimentaire"],
    icon: "sprout" as const,
  },
] as const;

export const actions = [
  {
    slug: "autonomisation-economique",
    title: "Autonomisation économique des femmes",
    kicker: "Savoir-faire & revenus",
    description:
      "Des formations pratiques et un accompagnement à l'entrepreneuriat pour permettre aux femmes de créer leur propre activité et de gagner en indépendance financière.",
    details: [
      "Formation en saponification et détergent liquide",
      "Formation en perlage et création d'accessoires",
      "Conseils en marketing et gestion d'activité",
    ],
    image: "/images/savonnerie.webp",
    alt: "Atelier de fabrication de savon",
  },
  {
    slug: "education-leadership-filles",
    title: "Éducation & leadership des filles",
    kicker: "Filles d'aujourd'hui, leaders de demain",
    description:
      "Nous encourageons les jeunes filles à croire en leur avenir, à poursuivre leurs études et à prendre la parole dans l'espace public.",
    details: [
      "Journée internationale de la jeune fille",
      "Actions de sensibilisation dans les communautés",
      "Espaces d'expression et de mentorat",
    ],
    image: "/images/ecole-fille.webp",
    alt: "Jeune fille en uniforme scolaire",
  },
  {
    slug: "inclusion-peuples-autochtones",
    title: "Inclusion & droits des peuples autochtones",
    kicker: "Cultures, dignité, inclusion",
    description:
      "Nous célébrons et défendons la culture Aka, tout en favorisant l'accès des communautés autochtones aux services et à la vie publique.",
    details: [
      "Journée internationale des peuples autochtones",
      "Valorisation des danses, chants et savoir-faire",
      "Initiation à la digitalisation des jeunes et des femmes",
    ],
    image: "/images/femmes-paoua.webp",
    alt: "Femmes d'une communauté centrafricaine",
  },
  {
    slug: "securite-alimentaire",
    title: "Sécurité alimentaire & produits locaux",
    kicker: "Nourrir nos communautés",
    description:
      "Nous soutenons les femmes agricultrices et transformatrices, et nous encourageons la consommation des richesses de notre terre.",
    details: [
      "Valorisation du manioc, de l'igname, du maïs et du riz",
      "Appui aux productrices et transformatrices",
      "Sensibilisation à une alimentation saine",
    ],
    image: "/images/agriculture.webp",
    alt: "Femmes préparant des produits agricoles",
  },
] as const;

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
    note: "Places limitées — inscrivez-vous dès maintenant.",
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
    note: "Inscriptions ouvertes — contactez-nous pour la prochaine session.",
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

const allPosts: Post[] = [
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

/** Articles du plus récent au plus ancien. */
export const posts: Post[] = [...allPosts].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate),
);

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
    name: "ADORA — Égalité et Inclusion",
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

export const values = [
  {
    title: "Dignité",
    text: "Chaque personne est unique et mérite respect, écoute et considération, quels que soient son origine, son genre ou sa situation.",
    icon: "heart" as const,
  },
  {
    title: "Solidarité",
    text: "Nous croyons à la force du collectif : familles, communautés, autorités et partenaires, ensemble pour un impact durable.",
    icon: "users" as const,
  },
  {
    title: "Autonomie",
    text: "Nous transmettons des compétences et des outils pour que chacun puisse agir par lui-même et devenir acteur de son avenir.",
    icon: "sprout" as const,
  },
  {
    title: "Inclusion",
    text: "Nous créons des espaces où les voix des femmes, des jeunes et des peuples autochtones sont entendues et valorisées.",
    icon: "shield" as const,
  },
] as const;

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
