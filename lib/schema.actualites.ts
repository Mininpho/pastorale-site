import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const actualites = pgTable("actualites", {
  id: varchar("id", { length: 50 }).primaryKey(),
  titre: text("titre").notNull(),
  extrait: text("extrait").notNull(),
  contenu: text("contenu").notNull(),
  categorie: varchar("categorie", { length: 30 }), // annonce / evenement / liturgie
  date: timestamp("date", { withTimezone: true }).notNull(),
  image: text("image")
});
