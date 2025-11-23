// app/admin/messes/page.tsx
import { db } from "@/lib/db";
import { eglises, messes } from "@/lib/schema.messes";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminMessesPage() {
  // Récupération des églises dans l'ordre original
  const eglisesList = await db.select().from(eglises).orderBy(eglises.id);

  // Récupération de toutes les messes
  const messesList = await db.select().from(messes);

  // Reconstruction : église → messes[]
  const eglisesCompletes = eglisesList.map((e) => ({
    ...e,
    messes: messesList.filter((m) => m.egliseId === e.id),
  }));

  const inputClass =
    "w-full p-1 border border-orlit/30 rounded bg-black/20 text-fond text-xs";

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Mettre à jour les messes</h1>
      <p className="text-sm text-gray-400">
        Ajoutez ou supprimez des horaires de messe pour chaque église.
      </p>

      <div className="space-y-6">
        {eglisesCompletes.map((eglise: any) => (
          <div
            key={eglise.id}
            className="border border-orlit/30 rounded-xl p-4 space-y-3"
          >
            <h2 className="font-semibold mb-1">
              {eglise.nom}
              {eglise.lieu && (
                <span className="text-xs text-gray-400">
                  {" "}
                  – {eglise.lieu}
                </span>
              )}
            </h2>

            {/* Liste des messes existantes */}
            <div className="space-y-2">
              {eglise.messes.length === 0 && (
                <p className="text-xs text-gray-500">
                  Aucune messe renseignée.
                </p>
              )}

              {eglise.messes.map((messe: any) => (
                <div
                  key={messe.id}
                  className="flex justify-between items-center text-sm bg-black/20 rounded-lg px-3 py-2"
                >
                  <div>
                    <div>
                      <span className="font-medium">{messe.jour}</span> –{" "}
                      {messe.heure}{" "}
                      <span className="text-[10px] uppercase tracking-wide text-orlit ml-1">
                        {messe.categorie}
                      </span>
                    </div>

                    {messe.remarque && (
                      <div className="text-xs text-gray-400">
                        {messe.remarque}
                      </div>
                    )}
                  </div>

                  <form action="/api/messes/delete" method="POST">
                    <input type="hidden" name="messeId" value={messe.id} />
                    <button
                      type="submit"
                      className="text-red-400 hover:underline text-xs"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>
              ))}
            </div>

            {/* Ajouter une messe */}
            <form
              action="/api/messes/add"
              method="POST"
              className="mt-3 grid md:grid-cols-5 gap-2 items-end"
            >
              <input type="hidden" name="egliseId" value={eglise.id} />

              <div>
                <label className="block text-[11px] mb-1">Jour</label>
                <input
                  name="jour"
                  placeholder="Dimanche"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] mb-1">Heure</label>
                <input
                  name="heure"
                  placeholder="10h30"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] mb-1">Catégorie</label>
                <select
                  name="categorie"
                  className={inputClass}
                  defaultValue="Dominicale"
                >
                  <option value="Dominicale">Dominicale</option>
                  <option value="Semaine">Semaine</option>
                  <option value="Fête liturgique">Fête liturgique</option>
                  <option value="Baptême">Baptême</option>
                  <option value="Funérailles">Funérailles</option>
                  <option value="Messe spéciale">Messe spéciale</option>
                  <option value="Adoration">Adoration</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] mb-1">Remarque</label>
                <input
                  name="remarque"
                  placeholder="(optionnel)"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-5">
                <button
                  type="submit"
                  className="bg-orlit text-nuit text-xs font-semibold px-3 py-2 rounded mt-1"
                >
                  + Ajouter une messe
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
