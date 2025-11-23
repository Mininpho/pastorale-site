CREATE TABLE "eglises" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"lieu" text
);
--> statement-breakpoint
CREATE TABLE "messes" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"eglise_id" varchar(50) NOT NULL,
	"jour" text NOT NULL,
	"heure" text NOT NULL,
	"categorie" text NOT NULL,
	"remarque" text
);
--> statement-breakpoint
ALTER TABLE "messes" ADD CONSTRAINT "messes_eglise_id_eglises_id_fk" FOREIGN KEY ("eglise_id") REFERENCES "public"."eglises"("id") ON DELETE no action ON UPDATE no action;