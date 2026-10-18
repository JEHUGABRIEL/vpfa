CREATE TYPE "public"."payment_method" AS ENUM('orange_money', 'especes');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('en_attente', 'declare', 'confirme', 'annule');--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "reference" text;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "amount" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "payment_method" "payment_method" DEFAULT 'orange_money' NOT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "payment_status" "payment_status" DEFAULT 'en_attente' NOT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "transaction_id" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "payer_phone" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "payment_declared_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "registrations" ADD COLUMN "payment_confirmed_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "registrations_payment_idx" ON "registrations" USING btree ("payment_status","created_at");--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_reference_unique" UNIQUE("reference");--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_token_unique" UNIQUE("token");