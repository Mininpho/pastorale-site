ALTER TABLE "documents" ALTER COLUMN "date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "sacrements" ADD COLUMN "titre" text;--> statement-breakpoint
ALTER TABLE "sacrements" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "sacrements" ADD COLUMN "texte_biblique" text;--> statement-breakpoint
ALTER TABLE "sacrements" ADD COLUMN "reference_cec" text;