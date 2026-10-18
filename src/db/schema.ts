import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// The Neon HTTP driver exchanges bytea as "\x<hex>" text.
const bytea = customType<{ data: Buffer; driverData: string | Buffer }>({
  dataType: () => "bytea",
  toDriver: (value) => `\\x${value.toString("hex")}`,
  fromDriver: (value) =>
    Buffer.isBuffer(value) ? value : Buffer.from(String(value).replace(/^\\x/, ""), "hex"),
});

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  /** Notifications created after this date are unread for this admin. */
  notificationsSeenAt: timestamp("notifications_seen_at", { withTimezone: true }),
  ...timestamps,
});

export const formations = pgTable("formations", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  kicker: text("kicker").notNull().default(""),
  price: text("price").notNull().default(""),
  duration: text("duration").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull(),
  imageAlt: text("image_alt").notNull().default(""),
  program: text("program").array().notNull().default(sql`'{}'::text[]`),
  benefits: text("benefits").array().notNull().default(sql`'{}'::text[]`),
  note: text("note").notNull().default(""),
  badge: text("badge").notNull().default("Inscriptions ouvertes"),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export type PostMeta = { label: string; value: string };

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    excerpt: text("excerpt").notNull(),
    image: text("image").notNull(),
    imageAlt: text("image_alt").notNull().default(""),
    quote: text("quote").notNull().default(""),
    body: text("body").notNull(),
    meta: jsonb("meta").$type<PostMeta[]>().notNull().default([]),
    published: boolean("published").notNull().default(true),
    publishedAt: date("published_at").notNull(),
    ...timestamps,
  },
  (table) => [index("posts_published_at_idx").on(table.publishedAt)],
);

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  short: text("short").notNull().default(""),
  name: text("name").notNull(),
  type: text("type").notNull().default(""),
  website: text("website").notNull().default(""),
  logo: text("logo").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const requestStatus = pgEnum("request_status", [
  "nouveau",
  "en_cours",
  "traite",
  "archive",
]);

export const paymentMethod = pgEnum("payment_method", ["orange_money", "especes"]);

export const paymentStatus = pgEnum("payment_status", [
  "en_attente",
  "declare",
  "confirme",
  "annule",
]);

export const registrations = pgTable(
  "registrations",
  {
    id: serial("id").primaryKey(),
    /** Human-readable file number, e.g. VPFA-26-0012. Set right after insert. */
    reference: text("reference").unique(),
    /** Random secret in the participant's tracking URL. */
    token: text("token").unique(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull().default(""),
    formation: text("formation").notNull(),
    amount: text("amount").notNull().default(""),
    message: text("message").notNull().default(""),
    paymentMethod: paymentMethod("payment_method").notNull().default("orange_money"),
    paymentStatus: paymentStatus("payment_status").notNull().default("en_attente"),
    transactionId: text("transaction_id").notNull().default(""),
    payerPhone: text("payer_phone").notNull().default(""),
    paymentDeclaredAt: timestamp("payment_declared_at", { withTimezone: true }),
    paymentConfirmedAt: timestamp("payment_confirmed_at", { withTimezone: true }),
    status: requestStatus("status").notNull().default("nouveau"),
    adminNote: text("admin_note").notNull().default(""),
    ...timestamps,
  },
  (table) => [
    index("registrations_status_idx").on(table.status, table.createdAt),
    index("registrations_payment_idx").on(table.paymentStatus, table.createdAt),
  ],
);

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  message: text("message").notNull(),
  approved: boolean("approved").notNull().default(false),
  ...timestamps,
});

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    status: requestStatus("status").notNull().default("nouveau"),
    adminNote: text("admin_note").notNull().default(""),
    ...timestamps,
  },
  (table) => [index("messages_status_idx").on(table.status, table.createdAt)],
);

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  data: bytea("data").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Everything that happens on the site and in the back office. */
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    /** Null for visitors and for failed logins. */
    adminId: integer("admin_id"),
    actor: text("actor").notNull(),
    action: text("action").notNull(),
    entity: text("entity").notNull().default(""),
    entityId: text("entity_id").notNull().default(""),
    summary: text("summary").notNull(),
    ip: text("ip").notNull().default(""),
    userAgent: text("user_agent").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("audit_logs_created_idx").on(table.createdAt),
    index("audit_logs_action_idx").on(table.action, table.createdAt),
  ],
);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    href: text("href").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("notifications_created_idx").on(table.createdAt)],
);

export type Formation = typeof formations.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Registration = typeof registrations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type RequestStatus = (typeof requestStatus.enumValues)[number];
export type PaymentStatus = (typeof paymentStatus.enumValues)[number];
export type PaymentMethod = (typeof paymentMethod.enumValues)[number];
export type Testimonial = typeof testimonials.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
