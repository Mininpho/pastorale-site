// app/(public)/sacrements/page.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function SacrementsPage() {

  // Charger contacts dynamiques
  const filePath = path.join(process.cwd(), "lib", "sacrements-contacts.json");
  const contacts = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Informations statiques + images (ne changent pas)
  const sacrements = [
    {
      id: "bapteme",
      titre: "Baptême",
      description:
        "Le baptême est la première étape de la vie chrétienne. Il ouvre la porte à la vie nouvelle dans le Christ et fait entrer l’enfant ou l’adulte dans la grande famille de l’Église.",
      image: "/images/sacrements/bapteme.png",
    },
    {
      id: "premiere-communion",
      titre: "Première Communion",
      description:
        "La première Eucharistie est célébrée après un parcours de catéchèse. Les familles sont invitées à inscrire leur enfant en début d’année pastorale.",
      image: "/images/sacrements/premiere-communion.png",
    },
    {
      id: "confirmation",
      titre: "Confirmation",
      description:
        "La confirmation complète l’initiation chrétienne. Par la force de l’Esprit Saint, le jeune ou l’adulte devient témoin du Christ dans sa vie quotidienne.",
      image: "/images/sacrements/confirmation.png",
    },
    {
      id: "mariage",
      titre: "Mariage",
      description:
        "Les couples sont invités à contacter l’Unité Pastorale au moins six mois avant la date souhaitée. Une préparation est organisée avec un prêtre et une équipe de couples.",
      image: "/images/sacrements/mariage.png",
    },
    {
      id: "reconciliation",
      titre: "Réconciliation",
      description:
        "Le sacrement du pardon permet de recevoir la miséricorde du Seigneur et de repartir dans la paix. Il est proposé avant les grandes fêtes ou sur rendez-vous.",
      image: "/images/sacrements/reconciliation.png",
    },
    {
      id: "malades",
      titre: "Onction des malades",
      description:
        "L’onction des malades apporte réconfort, paix et force aux personnes éprouvées par la maladie, la fragilité de l’âge ou une épreuve difficile.",
      image: "/images/sacrements/onction-malades.png",
    },
    {
      id: "funerailles",
      titre: "Funérailles",
      description:
        "L’Église accompagne les familles dans l’espérance chrétienne lors du départ d’un proche.",
      image: "/images/sacrements/funerailles.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
          Les sacrements
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold text-nuit mb-3">
          Vivre et célébrer la foi
        </h1>

        <p className="text-sm text-nuit/70 max-w-2xl mx-auto">
          Retrouvez ici les informations essentielles concernant les sept sacrements
          et les personnes à contacter pour toute demande ou préparation.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sacrements.map((s) => (
          <article
            key={s.id}
            className="bg-[#fdfbf7] rounded-2xl border border-marial/20 shadow-lg shadow-marial/10 p-5 flex flex-col transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="rounded-2xl overflow-hidden mb-4 h-36 relative bg-white shadow-sm">
              <Image
                src={s.image}
                alt={s.titre}
                fill
                className="object-contain p-3"
              />
            </div>

            <h2 className="text-lg font-semibold text-nuit mb-1">
              {s.titre}
            </h2>

            <p className="text-sm text-nuit/70 mb-3">{s.description}</p>

            {/* CONTACT DYNAMIQUE */}
            <div className="mt-auto text-sm space-y-1">
              {contacts[s.id] ? (
                <>
                  {contacts[s.id].personne && (
                    <p className="text-nuit/80">
                      <strong>Contact :</strong> {contacts[s.id].personne}
                    </p>
                  )}
                  {contacts[s.id].telephone && (
                    <p className="text-nuit/80">
                      {contacts[s.id].telephone}
                    </p>
                  )}
                  {contacts[s.id].email && (
                    <p className="text-nuit/80">
                      {contacts[s.id].email}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-nuit/60 text-sm">
                  Aucun contact renseigné.
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
