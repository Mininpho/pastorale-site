CREATE TABLE "actualites" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"extrait" text NOT NULL,
	"contenu" text NOT NULL,
	"categorie" varchar(30),
	"date" timestamp with time zone NOT NULL,
	"image" text
);
