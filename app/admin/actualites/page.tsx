// app/admin/actualites/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminActualitesList() {
  const filePath = path.join(process.cwd(), "lib", "actualites.json");
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold">Actualités</h1>

      <div className="space-y-4">
        {data.length === 0 && (
          <p className="text-gray-400">Aucune actualité pour le moment.</p>
        )}

        {data.map((actu: any) => (
          <div
            key={actu.id}
            className="border border-orlit/30 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{actu.titre}</h2>
              <p className="text-xs text-gray-400">{actu.date}</p>
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
