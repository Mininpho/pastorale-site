// app/(public)/horaires/page.tsx
import { db } from "@/lib/db";
import { eglises, messes } from "@/lib/schema.messes";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HorairesPage() {
  // 1. Récupérer toutes les églises dans l'ordre original
  const eglisesList = await db
    .select()
    .from(eglises)
    .orderBy(eglises.id);

  // 2. Récupérer toutes les messes
  const messesList = await db.select().from(messes);

  // 3. Reconstituer la structure église → messes[]
  const eglisesCompletes = eglisesList.map((e) => ({
    ...e,
    messes: messesList.filter((m) => m.egliseId === e.id),
  }));

  function formatCategorie(categorie: string) {
    switch (categorie) {
      case "Dominicale":
        return "Messe dominicale";
      case "Semaine":
        return "Messe en semaine";
      case "Bapteme":
        return "Baptême";
      case "Funerailles":
        return "Funérailles";
      case "Fete liturgique":
      case "Fête liturgique":
        return "Fête liturgique";
      default:
        return categorie;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* HEADER */}
      <header className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
          Horaires des messes
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold text-nuit mb-3">
          Messes dans l’unité pastorale
        </h1>

        <p className="text-sm text-nuit/70 max-w-2xl mx-auto">
          Retrouvez ici les horaires réguliers des célébrations dans nos églises.
          Les changements exceptionnels seront indiqués dans les actualités.
        </p>
      </header>

      {/* GRID DES ÉGLISES */}
      <section className="grid md:grid-cols-2 gap-8">
        {eglisesCompletes.map((eglise) => (
          <article
            key={eglise.id}
            className="bg-[#fdfbf7] rounded-2xl border border-marial/20 shadow-lg shadow-marial/10 p-6 flex flex-col"
          >
            {/* HEADER CARD */}
            <header className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-nuit">
                  {eglise.nom}
                </h2>

                {eglise.lieu && (
                  <p className="text-xs text-nuit/60">{eglise.lieu}</p>
                )}
              </div>

              {/* IMAGE RONDE */}
              {eglise.image && (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-marial/30 shadow-sm ml-3">
                  <img
                    src={eglise.image}
                    alt={eglise.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* MESSES */}
            {eglise.messes.length === 0 ? (
              <p className="text-xs text-nuit/60">
                Aucun horaire régulier n’est renseigné pour le moment.
              </p>
            ) : (
              <ul className="space-y-3 text-sm mb-4">
                {eglise.messes.map((messe: any) => (
                  <li key={messe.id} className="flex flex-col text-nuit">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{messe.jour}</span>
                      <span>– {messe.heure}</span>

                      {/* BADGE CATEGORIE */}
                      <span className="px-2 py-[2px] text-[10px] rounded-full bg-marial/10 text-marial uppercase tracking-wide">
                        {formatCategorie(messe.categorie)}
                      </span>
                    </div>

                    {messe.remarque && (
                      <span className="text-xs text-nuit/60">
                        {messe.remarque}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* BOUTON MAPS */}
            {eglise.map && (
              <a
                href={eglise.map}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm bg-marial text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-marialDark transition w-fit"
              >
                Voir sur Google Maps
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
