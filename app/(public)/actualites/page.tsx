import { db } from "@/lib/db";
import { actualites } from "@/lib/schema.actualites";

export const dynamic = "force-dynamic";

// Catégories affichées
const categories = [
  { value: "Toutes", label: "Toutes" },
  { value: "annonce", label: "Annonces" },
  { value: "evenement", label: "Événements" },
  { value: "liturgie", label: "Liturgie" },
];

// Couleurs des badges
const badgeStyles: Record<string, string> = {
  annonce: "bg-blue-100 text-blue-800 border-blue-200",
  evenement: "bg-green-100 text-green-800 border-green-200",
  liturgie: "bg-red-100 text-red-800 border-red-200",
};

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const activeCat = searchParams.cat || "Toutes";

  // Lecture BDD
  let data = await db.select().from(actualites);

  // Filtrage si catégorie
  const filtresActu =
    activeCat === "Toutes"
      ? data
      : data.filter((a) => a.categorie === activeCat);

  return (
    <div className="min-h-screen py-12 bg-marialLight/50">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <header className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
            Actualités
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-nuit mb-3">
            Dernières nouvelles de l’unité pastorale
          </h1>

          <p className="text-sm text-nuit/70 max-w-2xl mx-auto">
            Consultez les annonces, événements et informations importantes de la communauté.
          </p>
        </header>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => {
            const isActive = activeCat === cat.value;

            return (
              <a
                key={cat.value}
                href={
                  cat.value === "Toutes"
                    ? "/actualites"
                    : `/actualites?cat=${cat.value}`
                }
                className={`px-4 py-1.5 text-sm rounded-full border transition ${
                  isActive
                    ? "bg-marial text-white border-marial shadow"
                    : "bg-white border-marial/30 text-nuit hover:bg-marial/10"
                }`}
              >
                {cat.label}
              </a>
            );
          })}
        </div>

        {/* Aucune actu */}
        {filtresActu.length === 0 && (
          <p className="text-gray-600 text-center text-sm">
            Aucune actualité trouvée dans cette catégorie.
          </p>
        )}

        {/* GRID */}
        <section className="grid md:grid-cols-2 gap-8">
          {filtresActu.map((actu: any) => (
            <article
              key={actu.id}
              className="bg-[#fdfbf7] rounded-2xl border border-marial/20 shadow-lg 
                         shadow-marial/10 overflow-hidden hover:shadow-marial/30 
                         hover:scale-[1.01] transition-all"
            >
              {actu.image && (
                <div className="aspect-video bg-white/40 overflow-hidden">
                  <img
                    src={actu.image}
                    alt={actu.titre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col">

                {/* Badge de catégorie */}
                {actu.categorie && (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold border rounded-full mb-3
                      ${badgeStyles[actu.categorie] || "bg-gray-200 text-gray-700"}`}
                  >
                    {
                      categories.find((c) => c.value === actu.categorie)
                        ?.label
                    }
                  </span>
                )}

                <div className="text-xs text-gray-500 mb-1">
                  {new Date(actu.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <h2 className="text-lg font-semibold text-nuit mb-2">
                  {actu.titre}
                </h2>

                <p className="text-sm text-nuit/70 mb-4">
                  {actu.extrait}
                </p>

                <a
                  href={`/actualites/${actu.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold 
                             text-marial hover:text-marialDark transition-colors mt-auto"
                >
                  Lire la suite →
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
