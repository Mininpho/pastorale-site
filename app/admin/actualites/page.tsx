// app/admin/actualites/page.tsx
import { db } from "@/lib/db";
import { actualites } from "@/lib/schema.actualites";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminActualitesList() {
  // Lecture depuis PostgreSQL AVEC TRI DESC
  const data = await db
    .select()
    .from(actualites)
    .orderBy(desc(sql`CAST(${actualites.date} AS TIMESTAMPTZ)`));

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold">Actualités</h1>

      <div className="space-y-4">
        {data.length === 0 && (
          <p className="text-gray-400">Aucune actualité pour le moment.</p>
        )}

        {data.map((actu) => (
          <div
            key={actu.id}
            className="border border-orlit/30 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{actu.titre}</h2>
              <p className="text-xs text-gray-400">
                {new Date(actu.date).toLocaleString("fr-BE")}
              </p>
            </div>

            <form action="/api/actualites/delete" method="POST">
              <input type="hidden" name="id" value={actu.id} />
              <button
                type="submit"
                className="text-red-500 hover:underline text-sm"
              >
                Supprimer
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
