import { pgTable, text, varchar } from "drizzle-orm/pg-core";

// TABLE ÉGLISES
export const eglises = pgTable("eglises", {
  id: varchar("id", { length: 50 }).primaryKey(),
  nom: text("nom").notNull(),
  lieu: text("lieu"),
  image: text("image"),
  map: text("map"),
});

// TABLE MESSES
export const messes = pgTable("messes", {
  id: varchar("id", { length: 50 }).primaryKey(),
  egliseId: varchar("eglise_id", { length: 50 })
    .notNull()
    .references(() => eglises.id),
  jour: text("jour").notNull(),
  heure: text("heure").notNull(),
  categorie: text("categorie").notNull(),
  remarque: text("remarque"),
});
