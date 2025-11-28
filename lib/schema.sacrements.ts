import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const sacrements = pgTable("sacrements", {
  id: varchar("id", { length: 50 }).primaryKey(), // ex: "bapteme"

  // 🔹 Infos du sacrement
  titre: text("titre"),
  description: text("description"),
  texteBiblique: text("texte_biblique"),
  referenceCEC: text("reference_cec"),

  // 🔹 Contacts
  personne: text("personne"),
  telephone: text("telephone"),
  email: text("email"),
});
