import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const sacrements = pgTable("sacrements", {
  id: varchar("id", { length: 50 }).primaryKey(), // ex: "bapteme"
  personne: text("personne"),
  telephone: text("telephone"),
  email: text("email"),
});
