// app/(public)/documents/page.tsx
import { db } from "@/lib/db";
import { documents } from "@/lib/schema.documents";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  // 📌 Charger les documents depuis PostgreSQL
  const docs = await db
    .select()
    .from(documents)
    .orderBy(desc(documents.date));

  // Catégories d'affichage
  const categories = [
    { value: "informations", label: "Informations générales" },
    { value: "horaires", label: "Horaires & célébrations" },
    { value: "sacrements", label: "Sacrements" },
    { value: "jeunesse", label: "Jeunesse / Catéchèse" },
    { value: "administratif", label: "Documents administratifs" },
  ];

  return (
    <div className="min-h-screen py-12 bg-marialLight/50">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <header className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
            Documents utiles
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-nuit mb-3">
            Téléchargements & formulaires
          </h1>

          <p className="text-sm text-nuit/70 max-w-2xl mx-auto">
            Retrouvez ici les documents imprimables, formulaires, horaires et fichiers
            mis à disposition par l’unité pastorale.
          </p>
        </header>

        {/* SI AUCUN DOC */}
        {docs.length === 0 && (
          <p className="text-gray-600 text-center text-sm">
            Aucun document n’a encore été ajouté.
          </p>
        )}

        {/* LISTE DES CATÉGORIES */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const filtered = docs.filter((d) => d.categorie === cat.value);

            if (filtered.length === 0) return null;

            return (
              <section key={cat.value}>
                <h2 className="text-xl font-semibold text-nuit mb-4">{cat.label}</h2>

                <div className="bg-white border border-marial/20 rounded-2xl p-6 shadow-lg shadow-marial/10">
                  <ul className="space-y-4">
                    {filtered.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex justify-between items-center p-3 bg-[#fdfbf7] border border-marial/20 rounded-xl"
                      >
                        <div>
                          <p className="font-semibold text-nuit">{doc.titre}</p>
                          {doc.description && (
                            <p className="text-xs text-gray-600">{doc.description}</p>
                          )}
                        </div>

                        <div className="flex gap-2">

                          {/* VOIR */}
                          <a
                            href={doc.url}
                            target="_blank"
                            className="px-4 py-1.5 rounded-lg bg-marial text-white text-sm font-semibold shadow hover:bg-marialDark transition"
                          >
                            Voir
                          </a>

                          {/* TÉLÉCHARGER (via API) */}
                          <a
                            href={`/api/download?url=${encodeURIComponent(doc.url)}&filename=${encodeURIComponent(doc.titre + ".pdf")}`}
                            className="px-4 py-1.5 rounded-lg bg-marial/10 border border-marial/40 text-marial text-sm font-semibold hover:bg-marial/20 transition"
                          >
                            Télécharger
                          </a>

                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
