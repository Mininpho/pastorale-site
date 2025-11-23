import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// On utilise la variable DATABASE_URL de Vercel / local
const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  ssl: "require",
});

export const db = drizzle(client);
