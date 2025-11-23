import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: varchar("id", { length: 50 }).primaryKey(),
  titre: text("titre").notNull(),
  description: text("description"),
  categorie: varchar("categorie", { length: 50 }).notNull(),
  url: text("url").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
});
