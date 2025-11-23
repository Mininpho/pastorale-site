CREATE TABLE "animatrice" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"telephone" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "contact_general" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"responsable" text,
	"adresse" text,
	"telephone" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "funerailles" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"telephone" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pretres" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"nom" text NOT NULL,
	"telephone" text,
	"email" text,
	"adresse" text
);
--> statement-breakpoint
CREATE TABLE "secretariat" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"adresse" text,
	"telephone" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE "secretariat_horaires" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"ligne" text NOT NULL
);
