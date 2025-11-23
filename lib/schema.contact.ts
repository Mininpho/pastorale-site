// lib/schema.contact.ts
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

// 🟦 TABLE CONTACT GÉNÉRAL
export const contactGeneral = pgTable("contact_general", {
  id: varchar("id", { length: 50 }).primaryKey(), // toujours "general"
  responsable: text("responsable"),
  adresse: text("adresse"),
  telephone: text("telephone"),
  email: text("email"),
});

// 🟩 TABLE PRÊTRES
export const pretres = pgTable("pretres", {
  id: varchar("id", { length: 50 }).primaryKey(),
  nom: text("nom").notNull(),
  telephone: text("telephone"),
  email: text("email"),
  adresse: text("adresse"),
});

// 🟧 TABLE ANIMATRICE EN PASTORALE
export const animatrice = pgTable("animatrice", {
  id: varchar("id", { length: 50 }).primaryKey(), // "unique"
  nom: text("nom").notNull(),
  telephone: text("telephone"),
  email: text("email"),
});

// 🟨 TABLE SECRÉTARIAT (infos générales)
export const secretariat = pgTable("secretariat", {
  id: varchar("id", { length: 50 }).primaryKey(), // "unique"
  adresse: text("adresse"),
  telephone: text("telephone"),
  email: text("email"),
});

// 🟫 TABLE SECRÉTARIAT — LISTE DES HORAIRES
export const secretariatHoraires = pgTable("secretariat_horaires", {
  id: varchar("id", { length: 50 }).primaryKey(),
  ligne: text("ligne").notNull(),
});

// 🟥 TABLE FUNÉRAILLES
export const funerailles = pgTable("funerailles", {
  id: varchar("id", { length: 50 }).primaryKey(), // "unique"
  telephone: text("telephone").notNull(),
});
