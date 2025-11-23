CREATE TABLE "documents" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"description" text,
	"categorie" varchar(50) NOT NULL,
	"url" text NOT NULL,
	"date" timestamp with time zone NOT NULL
);
