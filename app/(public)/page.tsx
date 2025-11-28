// app/(public)/page.tsx
import Image from "next/image";
import { db } from "@/lib/db";
import { eglises, messes } from "@/lib/schema.messes";
import { actualites } from "@/lib/schema.actualites";
import { asc, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  // --------------------------------------------
  // 📌 SQL : Récupération Actualités
  // --------------------------------------------
  const news = await db
    .select()
    .from(actualites)
    .orderBy(desc(actualites.date))
    .limit(3);

  // --------------------------------------------
  // 📌 SQL : Récupération Églises + Messes
  // --------------------------------------------
  const eglisesData = await db.select().from(eglises).orderBy(asc(eglises.id));
  const messesData = await db.select().from(messes);

  // Construire messes dominicales (fusion SQL)
  const messesDominicales = eglisesData
    .flatMap((e) =>
      messesData
        .filter((m) => m.egliseId === e.id)
        .map((m) => ({ ...m, eglise: e.nom }))
    )
    .filter((m) => m.categorie === "Dominicale")
    .sort((a, b) => (a.heure > b.heure ? 1 : -1));

  // --------------------------------------------
  // 📌 Verset du jour
  // --------------------------------------------
  const versets = [
    { ref: "Jean 14,6", texte: "Je suis le Chemin, la Vérité et la Vie." },
    { ref: "Matthieu 5,16", texte: "Que votre lumière brille devant les hommes." },
    { ref: "Psaume 27,1", texte: "Le Seigneur est ma lumière et mon salut." },
    { ref: "Romains 12,21", texte: "Sois vainqueur du mal par le bien." },
    { ref: "Jean 8,12", texte: "Je suis la lumière du monde." },
    { ref: "Philippiens 4,13", texte: "Je peux tout en Celui qui me fortifie." },
  ];

  const versetDuJour = versets[new Date().getDate() % versets.length];

  return (
    <div className="min-h-screen bg-marial-light/40">

      {/* HERO */}
      <section
        className="relative border-b border-marial/10 bg-white h-[260px] md:h-[300px] flex items-center"
        style={{
          backgroundImage: "url('/images/hero/pastorale-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-marial mb-3">
            Unité pastorale
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-nuit mb-4">
            Unité pastorale Gilly – Ransart – Hamendes
          </h1>

          <p className="text-gray-700 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Ensemble, grandir dans la foi, vivre les sacrements et annoncer l’Évangile dans la joie.
          </p>

          <div className="flex justify-center gap-3">
            <a
              href="/horaires"
              className="bg-marial text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-marialDark transition"
            >
              Horaires des messes
            </a>
            <a
              href="/actualites"
              className="px-5 py-2 rounded-lg border border-marial/40 font-semibold text-marial bg-white/50 shadow-sm hover:bg-white transition"
            >
              Actualités
            </a>
          </div>
        </div>
      </section>

      {/* VERSET DU JOUR */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="bg-[#fdfbf7] border border-marial/20 rounded-2xl p-10 shadow-lg shadow-marial/10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-3">
            Verset du jour
          </p>
          <p className="text-xl italic mb-2 text-nuit leading-relaxed">
            “{versetDuJour.texte}”
          </p>
          <p className="text-sm text-gray-600">— {versetDuJour.ref}</p>
        </div>
      </section>

      {/* 🟦 MESSES DOMINICALES – PREMIUM COMPACT */}
      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="bg-[#fdfbf7] border border-marial/20 rounded-2xl p-8 shadow-lg shadow-marial/10">

          <h2 className="text-xl font-semibold text-nuit mb-6 text-center md:text-left">
            Messes dominicales
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {messesDominicales.length === 0 && (
              <p className="text-gray-500 text-sm col-span-2 text-center">
                Aucune messe dominicale encodée.
              </p>
            )}

            {messesDominicales.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-white/80 border border-marial/20 rounded-xl
                           shadow-sm hover:shadow-md transition-all flex flex-col gap-1"
              >
                {/* Jour */}
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {m.jour}
                </div>

                {/* Heure + Église */}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-nuit flex items-center gap-2">
                    {/* Horloge */}
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-marial">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />
                      <path d="M12 7v5l3 2" stroke="currentColor" />
                    </svg>
                    {m.heure}
                  </p>

                  <p className="text-sm font-medium text-marial flex items-center gap-1">
                    {/* Église */}
                    <svg width="18" height="18" viewBox="0 0 24 24" className="text-marial">
                      <path d="M12 2l7 5v13h-4v-6h-6v6H5V7l7-5z" fill="currentColor" />
                    </svg>
                    {m.eglise}
                  </p>
                </div>

                {/* Remarque */}
                {m.remarque && (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    {m.remarque}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center md:text-left">
            <a
              href="/horaires"
              className="text-marial text-sm font-semibold hover:underline"
            >
              Voir tous les horaires →
            </a>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-nuit">Dernières actualités</h2>
          <a href="/actualites" className="text-marial text-sm hover:underline">
            Tout voir →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.length === 0 && (
            <p className="text-gray-500">Aucune actualité pour le moment.</p>
          )}

          {news.map((actu) => {
            const badgeStyles: Record<string, string> = {
              annonce: "bg-blue-100 text-blue-800 border-blue-200",
              evenement: "bg-green-100 text-green-800 border-green-200",
              liturgie: "bg-red-100 text-red-800 border-red-200",
            };

            return (
              <article
                key={actu.id}
                className="bg-white rounded-2xl border border-marial/20 shadow-md 
                           shadow-marial/10 overflow-hidden hover:shadow-marial/30 
                           hover:scale-[1.01] transition-all"
              >
                {actu.image && (
                  <img
                    src={actu.image}
                    className="w-full h-40 object-cover"
                    alt={actu.titre}
                  />
                )}

                <div className="p-5 flex flex-col">
                  {actu.categorie && (
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold border rounded-full mb-3
                                  ${badgeStyles[actu.categorie] || "bg-gray-200 text-gray-700"}`}
                    >
                      {actu.categorie}
                    </span>
                  )}

                  <div className="text-xs text-gray-500 mb-1">
                    {new Date(actu.date).toLocaleDateString("fr-FR")}
                  </div>

                  <h3 className="font-semibold text-nuit mb-2">{actu.titre}</h3>

                  <p className="text-sm text-gray-600 mb-4">{actu.extrait}</p>

                  <a
                    href={`/actualites/${actu.id}`}
                    className="text-marial text-sm font-semibold hover:underline mt-auto"
                  >
                    Lire →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-[#fdfbf7] rounded-2xl border border-marial/20 shadow-lg shadow-marial/10 p-10 text-center">
          <h2 className="text-xl font-semibold text-nuit mb-3">
            Découvrir nos paroisses
          </h2>
          <p className="text-gray-700 mb-6">
            Horaires, actualités, sacrements, contacts… tout est accessible facilement.
          </p>
          <a
            href="/contact"
            className="bg-marial text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-marialDark transition"
          >
            Nous contacter
          </a>
        </div>
      </section>

    </div>
  );
}
