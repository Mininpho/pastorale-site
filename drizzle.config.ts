import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./lib/schema.actualites.ts",
    "./lib/schema.messes.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-shiny-mode-adycczb8-pooler.c-2.us-east-1.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_ptXQjo0Cq1GB",
    database: "neondb",
    ssl: "require",
  },
});
