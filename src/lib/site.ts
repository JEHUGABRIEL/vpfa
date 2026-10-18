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
  /** Search used by the Google Maps embed on the "À propos" page. Replace with the exact office address. */
  mapQuery: "Bangui, République centrafricaine",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vpfa.vercel.app",
  hosting: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
} as const;

/**
 * "Mot de la présidente" on the À propos page.
 * Draft written for the site: to be read and validated by the president before publication.
 */
export const presidentMessage = [
  "Quand nous avons créé l'ONG VPFA en 2024, nous partions d'une conviction simple : une femme qui a un métier, des revenus et confiance en elle change sa famille, et souvent tout son quartier.",
  "À Bangui comme dans la Lobaye, j'ai rencontré des femmes pleines de talent à qui il manquait seulement une occasion de le montrer. Nos formations en saponification et en perlage, nos journées avec les jeunes filles et avec les communautés Aka sont nées de ces rencontres.",
  "Rien de cela ne serait possible sans nos partenaires, nos bénévoles et toutes celles qui osent pousser notre porte. Je les remercie sincèrement. Si vous partagez notre vision, rejoignez-nous : il y a une place pour chacune et pour chacun.",
];

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
