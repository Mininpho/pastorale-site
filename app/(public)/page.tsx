// app/(public)/page.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";   

export const dynamic = "force-dynamic";

export default function HomePage() {
  // --- Charger les actualités ---
  const actuFile = path.join(process.cwd(), "lib", "actualites.json");
  const actualites = fs.existsSync(actuFile)
    ? JSON.parse(fs.readFileSync(actuFile, "utf8"))
    : [];

  const last3 = actualites.slice(0, 3);

  // --- Charger les horaires ---
  const horairesFile = path.join(process.cwd(), "lib", "horaires.json");
  const eglises = fs.existsSync(horairesFile)
    ? JSON.parse(fs.readFileSync(horairesFile, "utf8"))
    : [];

  function trouverProchaineMesse() {
    let toutesMesses = [];
    eglises.forEach((e) =>
      e.messes?.forEach((m) =>
        toutesMesses.push({
          ...m,
          eglise: e.nom,
        })
      )
    );

    toutesMesses.sort((a, b) => (a.heure > b.heure ? 1 : -1));
    return toutesMesses[0] || null;
  }

  const prochaine = trouverProchaineMesse();

  // --- Verset du jour ---
  const versets = [
    { ref: "Jean 14,6", texte: "Je suis le Chemin, la Vérité et la Vie." },
    { ref: "Matthieu 5,16", texte: "Que votre lumière brille devant les hommes." },
    { ref: "Psaume 27,1", texte: "Le Seigneur est ma lumière et mon salut." },
    { ref: "Romains 12,21", texte: "Sois vainqueur du mal par le bien." },
    { ref: "Jean 8,12", texte: "Je suis la lumière du monde." },
    { ref: "Philippiens 4,13", texte: "Je peux tout en Celui qui me fortifie." }
  ];

  const indexDuJour = new Date().getDate() % versets.length;
  const versetDuJour = versets[indexDuJour];

  return (
    <div className="min-h-screen bg-marial-light/40">

      {/* HERO */}
<section
  className="relative border-b border-marial/10 bg-white h-[260px] md:h-[300px] flex items-center"
  style={{
    backgroundImage: "url('/images/hero/pastorale-header.png')",
    backgroundSize: "cover",          // remplit toute la zone
    backgroundPosition: "center",     // garde le centre visible
    backgroundRepeat: "no-repeat",
    opacity: 0.9,
  }}
>
  <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
    <p className="text-[11px] uppercase tracking-[0.3em] text-marial mb-3">
      Unité pastorale
    </p>

    <h1 className="text-3xl md:text-4xl font-bold text-nuit mb-4">
      Unité pastorale Gilly – Ransart
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

      {/* PROCHAINE MESSE */}
      {prochaine && (
        <section className="max-w-5xl mx-auto px-4 pb-14">
          <div className="bg-[#fdfbf7] border border-marial/20 rounded-2xl p-8 shadow-lg shadow-marial/10">
            <h2 className="text-xl font-semibold text-nuit mb-4 text-center md:text-left">
              Prochaine messe
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              {prochaine.categorie === "Dominicale"
                ? "Messe dominicale"
                : "Messe en semaine"}
            </p>

            <p className="text-2xl font-semibold text-nuit">
              {prochaine.jour} – {prochaine.heure}
            </p>

            <p className="text-gray-600 mb-4">{prochaine.eglise}</p>

            <a
              href="/horaires"
              className="text-marial text-sm font-semibold hover:underline"
            >
              Voir tous les horaires →
            </a>
          </div>
        </section>
      )}

      {/* ACTUALITÉS */}
<section className="max-w-5xl mx-auto px-4 pb-16">
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl font-semibold text-nuit">Dernières actualités</h2>
    <a href="/actualites" className="text-marial text-sm hover:underline">
      Tout voir →
    </a>
  </div>

  {/* Styles badge (mêmes que /actualites) */}
  {/*
    annonce    → bleu
    evenement  → vert
    liturgie   → rouge
  */}
  {(() => {
    return null; // juste pour pouvoir ajouter du code JS proprement
  })()}

  <div className="grid md:grid-cols-3 gap-6">
    {last3.length === 0 && (
      <p className="text-gray-500">Aucune actualité pour le moment.</p>
    )}

    {last3.map((actu) => {
      const badgeStyles: Record<string, string> = {
        annonce: "bg-blue-100 text-blue-800 border-blue-200",
        evenement: "bg-green-100 text-green-800 border-green-200",
        liturgie: "bg-red-100 text-red-800 border-red-200",
      };

      const categories = [
        { value: "annonce", label: "Annonce" },
        { value: "evenement", label: "Événement" },
        { value: "liturgie", label: "Liturgie" },
      ];

      const badgeLabel =
        categories.find((c) => c.value === actu.categorie)?.label ||
        actu.categorie;

      return (
        <article
          key={actu.id}
          className="bg-white rounded-2xl border border-marial/20 shadow-md 
                     shadow-marial/10 overflow-hidden hover:shadow-marial/30 
                     hover:scale-[1.01] transition-all"
        >
          {/* IMAGE */}
          {actu.image && (
            <img
              src={actu.image}
              className="w-full h-40 object-cover"
              alt={actu.titre}
            />
          )}

          <div className="p-5 flex flex-col">

            {/* 🌟 BADGE CATÉGORIE */}
            {actu.categorie && (
              <span
                className={`
                  inline-block px-3 py-1 text-xs font-semibold border rounded-full mb-3
                  ${badgeStyles[actu.categorie] || "bg-gray-200 text-gray-700"}
                `}
              >
                {badgeLabel}
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

      {/* CONTACT / DÉCOUVERTE */}
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
